import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';

import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {StructuredFormats} from '../../../shared/models/structured-formats';
import {OriginFormats} from '../../models/formats';
import {InsertMetaData} from '../../models/insert-meta-data';
import {Origin} from '../../models/origin';
import {OriginCharacteristicsSettings} from '../../models/origin-characteristics-settings';
import {OriginGroup} from '../../models/origin-group';
import {OriginGroupCharacteristicsSettings} from '../../models/origin-group-characteristics-settings';
import {UpdateMetaData} from '../../models/update-meta-data';
import {OriginGroupService} from '../../services/origin-group.service';
import {OriginService} from '../../services/origin.service';

@Component({
  selector: 'app-origin-core-data-home',
  templateUrl: './origin-core-data-home.component.html',
  styleUrls: ['./origin-core-data-home.component.css']
})
export class OriginCoreDataHomeComponent implements OnInit {
  originPath = 'origin-core-data/origin';
  originGroupPath = 'origin-core-data/originGroup';
  origins: Origin[] = [];
  originGroups: OriginGroup[] = [];
  menus: string[] = ['Origins', 'Origin Groups'];
  infoVisible = false;
  // tslint:disable-next-line:no-any
  infoObject: any;
  structuredFormats = StructuredFormats.list;
  customizeColumns = DataGridUtil.customizeColumns;

  constructor(
      private originService: OriginService,
      private originGroupService: OriginGroupService,
      private route: ActivatedRoute, private router: Router) {
    this.infoObject = new Origin({
      insertMetadata: new InsertMetaData(),
      updateMetadata: new UpdateMetaData()
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.has('refresh') && params.get('refresh') === 'true') {
        this.readAll();
      } else {
        if (isNullOrUndefined(this.origins) || this.origins.length <= 0) {
          this.readAllOrigins();
        }

        if (isNullOrUndefined(this.originGroups) ||
            this.originGroups.length <= 0) {
          this.readAllOriginGroups();
        }
      }
    });
  }

  readAll() {
    this.readAllOrigins();
    this.readAllOriginGroups();
  }

  readAllOrigins() {
    this.originService.readAllOrigins().subscribe(
        res => (this.origins = res), error => {
          if (error.status === 404) {
            this.origins = [];
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  readAllOriginGroups() {
    this.originGroupService.readAllOriginGroups().subscribe(
        res => (this.originGroups = res), error => {
          if (error.status === 404) {
            this.originGroups = [];
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  // tslint:disable-next-line:no-any
  onOriginToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift(
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Refresh',
            icon: 'refresh',
            onClick: this.readAllOrigins.bind(this)
          }
        },
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Add new Origin',
            icon: 'add',
            onClick: this.addOrigin.bind(this)
          }
        });
  }

  // tslint:disable-next-line:no-any
  onOriginGroupToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift(
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Refresh',
            icon: 'refresh',
            onClick: this.readAllOriginGroups.bind(this)
          }
        },
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Add new Origin Group',
            icon: 'add',
            onClick: this.addOriginGroup.bind(this)
          }
        });
  }

  addOrigin() {
    this.router.navigate([this.originPath, 'add']);
  }

  // tslint:disable-next-line:no-any
  editOrigin(name: string, event: any) {
    event.stopImmediatePropagation();

    this.router.navigate([this.originPath, 'edit', name]);
  }

  // tslint:disable-next-line:no-any
  removeOrigin(name: string, event: any) {
    event.stopImmediatePropagation();

    const confirmResult =
        confirm('Are you sure you want to delete this Origin?', 'Delete');
    confirmResult.then(res => {
      if (res) {
        const removeIdx =
            this.origins.findIndex(origin => origin.id!.id === name);
        const originToRemove =
            this.origins.find(origin => origin.id!.id === name);

        if (originToRemove) {
          this.originService.deleteOrigin(originToRemove.id!)
              .subscribe(
                  result => this.origins.splice(removeIdx, 1),
                  error => MessageToast.showError(error.message));
        }
      }
    });
  }

  addOriginGroup() {
    this.router.navigate([this.originGroupPath, 'add']);
  }

  // tslint:disable-next-line:no-any
  editOriginGroup(name: string, event: any) {
    event.stopImmediatePropagation();

    this.router.navigate([this.originGroupPath, 'edit', name]);
  }

  // tslint:disable-next-line:no-any
  removeOriginGroup(name: string, event: any) {
    event.stopImmediatePropagation();

    if (this.hasOrigins(name)) {
      MessageToast.showError('Origin Group is still in use');
      return;
    }

    const confirmResult =
        confirm('Are you sure you want to delete this Origin Group?', 'Delete');
    confirmResult.then(res => {
      if (res) {
        const removeIdx = this.originGroups.findIndex(
            originGroup => originGroup.id!.id === name);
        const originGroupToRemove =
            this.originGroups.find(originGroup => originGroup.id!.id === name);

        if (originGroupToRemove) {
          this.originGroupService.deleteOriginGroup(originGroupToRemove.id!)
              .subscribe(result => {
                this.originGroups.splice(removeIdx, 1);
              }, error => MessageToast.showError(error.message));
        }
      }
    });
  }

  hasOrigins(originGroupId: string): boolean {
    return !isNullOrUndefined(
        this.origins.find(origin => origin.originGroupId === originGroupId));
  }

  // tslint:disable-next-line:no-any
  showInfo(name: string, event: any, isOrigin: boolean) {
    event.stopImmediatePropagation();

    if (isOrigin) {
      this.infoObject = this.origins.find(origin => origin.id!.id === name);
    } else {
      this.infoObject =
          this.originGroups.find(originGroup => originGroup.id!.id === name);
    }

    if (isNullOrUndefined(this.infoObject.insertMetadata)) {
      this.infoObject.insertMetadata = new InsertMetaData();
    }

    if (isNullOrUndefined(this.infoObject.updateMetadata)) {
      this.infoObject.updateMetadata = new UpdateMetaData();
    }

    this.infoVisible = true;
  }

  // tslint:disable-next-line:no-any
  getFormatDisplayName(technicalName: any): string {
    if (isNullOrUndefined(technicalName.value)) {
      return 'n/a';
    }

    const formatObj = OriginFormats.list.find(
        format => format.technicalName === technicalName.value);

    if (!formatObj) {
      return 'n/a';
    }

    return formatObj.displayName;
  }

  // tslint:disable-next-line:no-any
  getFormatTypeDisplayName(technicalName: any): string {
    if (!technicalName) {
      return 'n/a';
    }

    return this.structuredFormats.includes(technicalName) ? 'Structured' :
                                                            'Unstructured';
  }

  // tslint:disable-next-line:no-any
  getOriginCharacteristicDisplayName(technicalName: any): string {
    if (!technicalName || isNullOrUndefined(technicalName.value)) {
      return 'n/a';
    }

    const originCharacteristicObj = OriginCharacteristicsSettings.list.find(
        originCharacteristic =>
            originCharacteristic.technicalName === technicalName.value);

    if (!originCharacteristicObj) {
      return 'n/a';
    }

    return originCharacteristicObj.displayName;
  }

  // tslint:disable-next-line:no-any
  getOriginGroupCharacteristicDisplayName(technicalName: any): string {
    if (!technicalName || isNullOrUndefined(technicalName.value)) {
      return 'n/a';
    }

    const originGroupCharacteristicObj =
        OriginGroupCharacteristicsSettings.list.find(
            originGroupCharacteristic =>
                originGroupCharacteristic.technicalName ===
                technicalName.value);

    if (!originGroupCharacteristicObj) {
      return 'n/a';
    }

    return originGroupCharacteristicObj.displayName;
  }

  // tslint:disable-next-line:no-any
  onExporting(e: any) {
    e.component.beginUpdate();
    e.component.columnOption(' ', 'visible', false);
    e.component.columnOption('', 'visible', false);
  }

  // tslint:disable-next-line:no-any
  onExported(e: any) {
    e.component.columnOption(' ', 'visible', true);
    e.component.columnOption('', 'visible', true);
    e.component.endUpdate();
  }
}

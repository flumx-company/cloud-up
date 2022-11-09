import {Location} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {Restriction} from '../../models/restriction';
import {RestrictionService} from '../../services/restriction.service';

@Component({
  selector: 'app-usage-info',
  templateUrl: './fine-filter-usage-info.component.html',
  styleUrls: ['./fine-filter-usage-info.component.css']
})
export class FineFilterUsageInfoComponent implements OnInit {
  @ViewChild(InfoPopupComponent) infoPopup: InfoPopupComponent|undefined;

  name: string|undefined|null;
  restrictions: Restriction[] = [];
  customizeColumns = DataGridUtil.customizeColumns;

  constructor(
      private location: Location, private route: ActivatedRoute,
      private restrictionService: RestrictionService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['name']) {
        this.name = params['name'];

        this.restrictionService.getByFilter(params['name'])
            .subscribe(
                res => {
                  this.restrictions = res;
                },
                error => {
                  if (error.status !== 404) {
                    MessageToast.showError(error.message);
                  }
                });
      }
    });
  }

  navBack() {
    this.location.back();
  }

  editRestriction(name: string) {
    window.open(
        `${location.protocol}//${location.host}$/restrictions?mode=Edit&name=${
            name}`,
        '_blank');
  }

  // tslint:disable-next-line:no-any
  showInfo(name: string, event: any) {
    event.stopImmediatePropagation();

    if (this.infoPopup) {
      const restriction = this.restrictions.find(restriction => {
        if (restriction.entityId && restriction.entityId.name === name) {
          return true;
        }
        return false;
      });

      if (restriction) {
        this.infoPopup.showInfoForObject(restriction);
      }
    }
  }

  // tslint:disable-next-line:no-any
  selectionChanged(event: any) {
    event.component.collapseAll(-1);
    event.component.expandRow(event.currentSelectedRowKeys[0]);
  }

  // tslint:disable-next-line:no-any
  onFileSaving(event: any) {
    event.fileName = `usage_info_${this.name}`;
  }

  bracesAsString(bracesCount: number, start: boolean) {
    if (start) {
      return '['.repeat(bracesCount);
    } else {
      return ']'.repeat(bracesCount);
    }
  }
}

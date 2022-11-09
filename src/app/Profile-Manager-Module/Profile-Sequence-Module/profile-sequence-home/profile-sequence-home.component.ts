import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DxAccordionComponent, DxDataGridComponent} from 'devextreme-angular';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {FormatTypeList} from '../../../shared/models/format-type-list';
import {ListObject} from '../../../shared/models/list-object';
import {EntityId, Origin, OriginGroup, ProcessingProfile, ProcessingProfileSequence} from '../../models';
import {OriginGroupService, OriginService, ProfileSequenceService, ProfileService} from '../../services';

@Component({
  selector: 'app-profile-sequence-home',
  templateUrl: './profile-sequence-home.component.html',
  styleUrls: ['./profile-sequence-home.component.css']
})
export class ProfileSequenceHomeComponent implements OnInit {
  @ViewChild('filterMenu') filterMenu: DxAccordionComponent|undefined;
  @ViewChild(InfoPopupComponent) infoPopup: InfoPopupComponent|undefined;
  @ViewChild('sequenceGrid') sequenceGrid?: DxDataGridComponent;

  used = ['USED', 'NOT USED'];
  searchMenu = ['Filter'];
  filteredSequenceList: ProcessingProfileSequence[] = [];
  profileList: ProcessingProfile[] = [];
  originList: Origin[] = [];
  originGroupList: OriginGroup[] = [];
  usageStatusFilter = '';
  profileFilter = '';
  originFilter = '';
  originGroupFilter = '';
  private sequenceList: ProcessingProfileSequence[] = [];
  private sequencePath = 'Profile-Manager-Module/profile-sequence';
  private profilePath = 'Profile-Manager-Module/profile';
  customizeColumns = DataGridUtil.customizeColumns;

  constructor(
      private route: ActivatedRoute, private router: Router,
      private profileService: ProfileService,
      private sequenceService: ProfileSequenceService,
      private originService: OriginService,
      private originGroupService: OriginGroupService) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.has('refresh') && params.get('refresh') === 'true') {
        this.readAll();
      } else {
        if (isNullOrUndefined(this.sequenceList) ||
            this.sequenceList.length <= 0) {
          this.readAllSequences();
        }

        if (isNullOrUndefined(this.profileList) ||
            this.profileList.length <= 0) {
          this.readAllProfiles();
        }

        if (isNullOrUndefined(this.originList) || this.originList.length <= 0) {
          this.readAllOrigins();
        }

        if (isNullOrUndefined(this.originGroupList) ||
            this.originGroupList.length <= 0) {
          this.readAllOriginGroups();
        }
      }
    });
  }

  private readAll() {
    this.readAllSequences();
    this.readAllProfiles();
    this.readAllOrigins();
    this.readAllOriginGroups();
  }

  private readAllSequences() {
    this.sequenceService.readAllSequences().subscribe(
        res => {
          this.sequenceList =
              res.map(sequence => new ProcessingProfileSequence(sequence));
          this.sequenceList.forEach(sequence => sequence.prepareProfileList());
          this.filterSequences();
          setTimeout(() => {
            if (this.sequenceGrid && this.sequenceGrid.instance) {
              DataGridUtil.customizeColumns(this.sequenceGrid.columns);
            }
          });
        },
        error => {
          if (error.status !== 404) {
            MessageToast.showError(error.message);
          }
          this.sequenceList = [];
          this.filteredSequenceList = [];
        });
  }

  private readAllProfiles() {
    this.profileService.readAllProfiles().subscribe(
        res => (this.profileList = res), error => {
          if (error.status !== 404) {
            MessageToast.showError(error.message);
          }
          this.profileList = [];
        });
  }

  private readAllOrigins() {
    this.originService.readAllOrigins().subscribe(
        res => {
          this.originList = res;
        },
        error => {
          if (error.status !== 404) {
            MessageToast.showError(error.message);
          }
          this.originList = [];
        });
  }

  private readAllOriginGroups() {
    this.originGroupService.readAllOriginGroups().subscribe(
        res => {
          this.originGroupList = res;
        },
        error => {
          if (error.status !== 404) {
            MessageToast.showError(error.message);
          }
          this.originGroupList = [];
        });
  }

  addSequence() {
    this.router.navigate([this.sequencePath, 'add']);
  }

  // tslint:disable-next-line:no-any
  editSequence(sequenceId: EntityId, event: any) {
    event.stopImmediatePropagation();

    this.router.navigate(
        [this.sequencePath, 'edit', encodeURIComponent(sequenceId.name)]);
  }

  // tslint:disable-next-line:no-any
  editProfile(entityId: EntityId, event: any) {
    event.stopImmediatePropagation();

    window.open(
        `${location.protocol}//${location.host}${this.profilePath}/edit/${
            encodeURIComponent(entityId.name)}`,
        '_blank');
  }

  // tslint:disable-next-line:no-any
  removeSequence(entityId: EntityId, event: any) {
    event.stopImmediatePropagation();

    const result = confirm('Do you want to delete this Profile Sequence?', '');
    result.then(res => {
      if (res) {
        this.originGroupService.determineUsageOfSequences([entityId.name])
            .subscribe(res => {
              if (res.length < 1) {
                this.originService.determineUsageOfSequences([entityId.name])
                    .subscribe(res => {
                      if (res.length < 1) {
                        const sequence = this.sequenceList.find(
                            sequence =>
                                sequence.sequenceId.name === entityId.name);
                        if (sequence) {
                          this.sequenceService.deleteSequence(sequence)
                              .subscribe(
                                  res => {
                                    const index = this.sequenceList.findIndex(
                                        sequence => sequence.sequenceId.name ===
                                            entityId.name);
                                    this.sequenceList.splice(index, 1);
                                  },
                                  error =>
                                      MessageToast.showError(error.message));
                        }
                      } else {
                        MessageToast.showError(
                            'Sequence is still used by an Origin! Please remove any references to this Sequence before deleting.');
                      }
                    });
              } else {
                MessageToast.showError(
                    'Sequence is still used by an Origin Group! Please remove any references to this Sequence before deleting.');
              }
            });
      }
    });
  }

  // tslint:disable-next-line:no-any
  showInfo(entityId: EntityId, event: any, isProfile: boolean) {
    event.stopImmediatePropagation();

    if (this.infoPopup) {
      let infoObject: ProcessingProfile|ProcessingProfileSequence|undefined;

      if (isProfile) {
        infoObject = this.profileList.find(
            profile => profile.profileId.name === entityId.name);
      } else {
        infoObject = this.sequenceList.find(
            sequence => sequence.sequenceId.name === entityId.name);
      }

      this.infoPopup.showInfoForObject(infoObject);
    }
  }

  // tslint:disable-next-line:no-any
  showUsageInfo(entityId: EntityId, event: any, isProfile: boolean) {
    event.stopImmediatePropagation();

    if (isProfile) {
      this.router.navigate(
          [this.profilePath, 'usageInfo', encodeURIComponent(entityId.name)]);
    } else {
      this.router.navigate(
          [this.sequencePath, 'usageInfo', encodeURIComponent(entityId.name)]);
    }
  }

  // tslint:disable-next-line:no-any
  setOriginGroupFilter(event: any) {
    this.originGroupFilter = event.value;
  }

  // tslint:disable-next-line:no-any
  setOriginFilter(event: any) {
    this.originFilter = event.value;
  }

  // tslint:disable-next-line:no-any
  setProfileFilter(event: any) {
    this.profileFilter = event.value;
  }

  // tslint:disable-next-line:no-any
  setUsageStatusFilter(event: any) {
    this.usageStatusFilter = event.value;
  }

  filterSequences() {
    if (this.filterMenu) {
      this.filterMenu.instance.collapseItem(0);
      if ((!this.originFilter || this.originFilter.length <= 0) &&
          (!this.originGroupFilter || this.originGroupFilter.length <= 0) &&
          (!this.profileFilter || this.profileFilter.length <= 0) &&
          (!this.usageStatusFilter || this.usageStatusFilter.length <= 0)) {
        this.filteredSequenceList = this.sequenceList;
      } else {
        this.filteredSequenceList = [];
        let sequences: ProcessingProfileSequence[] = [];
        sequences.push(...this.sequenceList);

        if (!isNullOrUndefined(this.profileFilter) &&
            this.profileFilter.length > 0) {
          this.filteredSequenceList.push(...sequences.filter(
              sequence =>
                  !isNullOrUndefined(sequence.processingProfileList.find(
                      profile =>
                          profile.profileId.name === this.profileFilter))));
        }

        if (!isNullOrUndefined(this.originFilter) &&
            this.originFilter.length > 0) {
          if (this.filteredSequenceList.length > 0) {
            sequences = [];
            sequences.push(...this.filteredSequenceList);
          }

          const origin = this.originList.find(
              origin => origin.id.id === this.originFilter);

          if (origin) {
            const sequence = sequences.find(
                sequence =>
                    sequence.sequenceId.name === origin.sequenceClatchProcess);

            if (sequence) {
              this.filteredSequenceList.push(sequence);
            }
          }
        }

        if (!isNullOrUndefined(this.originGroupFilter) &&
            this.originGroupFilter.length > 0) {
          if (this.filteredSequenceList.length > 0) {
            sequences = [];
            sequences.push(...this.filteredSequenceList);
          }

          const originGroup = this.originGroupList.find(
              originGroup => originGroup.id.id === this.originGroupFilter);

          if (originGroup) {
            const sequence = sequences.find(
                sequence => sequence.sequenceId.name ===
                    originGroup.sequenceClatchProcess);

            if (sequence) {
              this.filteredSequenceList.push(sequence);
            }
          }
        }

        if (!isNullOrUndefined(this.usageStatusFilter) &&
            this.usageStatusFilter.length > 0) {
          if (this.filteredSequenceList.length > 0) {
            sequences = [];
            sequences.push(...this.filteredSequenceList);
          }

          const statusBackground =
              this.usageStatusFilter === 'USED' ? 'bg-success' : 'bg-warning';

          this.filteredSequenceList.push(...sequences.filter(
              sequence => this.getButtonBackground(sequence.sequenceId) ===
                  statusBackground));
        }
      }
    }
  }

  getButtonBackground(entityId: EntityId): string {
    let filteredOrigins: Origin[] = [];
    let filteredOriginGroups: OriginGroup[] = [];

    if (this.originList && this.originList.length > 0) {
      filteredOrigins = this.originList.filter(
          origin => origin.sequenceClatchProcess === entityId.name);
    }
    if (this.originGroupList && this.originGroupList.length > 0) {
      filteredOriginGroups = this.originGroupList.filter(
          originGroup => originGroup.sequenceClatchProcess === entityId.name);
    }

    if ((!filteredOrigins || filteredOrigins.length <= 0) &&
        (!filteredOriginGroups || filteredOriginGroups.length <= 0)) {
      return 'bg-warning';
    } else {
      return 'bg-success';
    }
  }

  // tslint:disable-next-line:no-any
  getFormatTypeDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(technicalName.value, FormatTypeList.list);
  }

  // tslint:disable-next-line:no-any
  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift(
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Refresh',
            icon: 'refresh',
            onClick: this.readAll.bind(this)
          }
        },
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Add new Sequence',
            icon: 'add',
            onClick: this.addSequence.bind(this)
          }
        });
  }

  // tslint:disable-next-line:no-any
  onExporting(e: any) {
    e.component.beginUpdate();
    e.component.columnOption('sequenceId', 'visible', false);
  }

  // tslint:disable-next-line:no-any
  onExported(e: any) {
    e.component.columnOption('sequenceId', 'visible', true);
    e.component.endUpdate();
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DxDataGridComponent} from 'devextreme-angular';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {DirtyCheck} from '../../../shared/helpers/dirty-check';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {FormatTypeList} from '../../../shared/models/format-type-list';
import {ISAS} from '../../../shared/models/isas';
import {ListObject} from '../../../shared/models/list-object';
import {OperatorList} from '../../../shared/models/operator-list';
import {Condition, EntityId, ProcessingProfile, ProcessingProfileSequence} from '../../models';
import {FunctionType} from '../../models/processing-functions/function-type';
import {FunctionTypeEnum} from '../../models/processing-functions/function-type-enum';
import {ConditionService, OriginGroupService, OriginService, ProfileSequenceService, ProfileService} from '../../services';

@Component({
  selector: 'app-profile-sequence-detail',
  templateUrl: './profile-sequence-detail.component.html',
  styleUrls: ['./profile-sequence-detail.component.css']
})
export class ProfileSequenceDetailComponent implements OnInit {
  @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;
  @ViewChild('assignProfileGrid') assignProfileGrid?: DxDataGridComponent;

  profileList: ProcessingProfile[] = [];
  sequenceList: ProcessingProfileSequence[] = [];
  usedProfiles: ProcessingProfile[] = [];
  currentSequence: ProcessingProfileSequence = new ProcessingProfileSequence();
  viewMode: string|null = '';
  isAssignProfileGridHidden = true;
  filteredProfileList: ProcessingProfile[] = [];
  selectedRows: ProcessingProfile[] = [];
  profilesUsedInASequence: EntityId[] = [];
  isSequenceUsed = 'bg-warning';
  private sequencePath = 'Profile-Manager-Module/profile-sequence';
  private profilePath = 'Profile-Manager-Module/profile';
  customizeColumns = DataGridUtil.customizeColumns;
  SELECT_OPEN_ITEMS = FunctionTypeEnum.SELECT_OPEN_ITEMS;
  MATCH_AMOUNT_ALL = FunctionTypeEnum.MATCH_AMOUNT_ALL;
  MATCH_AMOUNT_SUBSETTING = FunctionTypeEnum.MATCH_AMOUNT_SUBSETTING;
  backupSequence = '';

  constructor(
      private route: ActivatedRoute, private router: Router,
      private profileService: ProfileService,
      private sequenceService: ProfileSequenceService,
      private originService: OriginService,
      private originGroupService: OriginGroupService,
      private conditionService: ConditionService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!params['name']) {
        this.viewMode = 'Add';
        this.currentSequence =
            new ProcessingProfileSequence({sequenceId: new EntityId()});
        this.currentSequence.prepareProfileList();
        this.usedProfiles = this.currentSequence.processingProfileList;
      } else {
        this.viewMode = 'Edit';
        this.loadCurrentSequence(params['name']);
      }
      return this.route.paramMap;
    });

    if (isNullOrUndefined(this.profileList) || this.profileList.length <= 0) {
      this.readAllProfiles();
    }
  }

  navBack() {
    if (DirtyCheck.isDirty(this.currentSequence, this.backupSequence)) {
      const result = confirm('Continue without saving?', '');
      result.then(res => {
        if (res) {
          this.router.navigate([this.sequencePath]);
        }
      });
    } else {
      this.router.navigate([this.sequencePath]);
    }
  }

  // tslint:disable-next-line:no-any
  save(event: any) {
    event.preventDefault();

    this.currentSequence.processingProfileList = this.usedProfiles;
    this.currentSequence.prepareProfileMap();

    if (this.viewMode === 'Edit') {
      this.sequenceService.updateSequence(this.currentSequence)
          .subscribe(res => {
            const navigationExtras:
                NavigationExtras = {queryParams: {refresh: 'true'}};

            this.router.navigate([this.sequencePath], navigationExtras);
          }, error => MessageToast.showError(error.message));
    } else {
      this.sequenceService.saveSequence(this.currentSequence)
          .subscribe(
              res => {
                const navigationExtras:
                    NavigationExtras = {queryParams: {refresh: 'true'}};

                this.router.navigate([this.sequencePath], navigationExtras);
              },
              error => {
                if (error.status === 409) {
                  MessageToast.showError('Name already in use!');
                } else {
                  MessageToast.showError(error.message);
                }
              });
    }
  }

  private loadCurrentSequence(name: string) {
    this.sequenceService.readSequence(name).subscribe(res => {
      this.currentSequence = new ProcessingProfileSequence(res[0]);
      this.currentSequence.prepareProfileList();
      this.backupSequence =
          DirtyCheck.getStringFromStringOrObject(this.currentSequence);
      this.usedProfiles = this.currentSequence.processingProfileList;
      this.originService
          .determineUsageOfSequences([this.currentSequence.sequenceId.name])
          .subscribe(
              res => {
                if (res.findIndex(
                        sequenceName => this.currentSequence.sequenceId.name ===
                            sequenceName) > -1) {
                  this.isSequenceUsed = 'bg-success';
                }
              },
              error => {
                console.log(error);
              });
      this.originGroupService
          .determineUsageOfSequences([this.currentSequence.sequenceId.name])
          .subscribe(
              res => {
                if (res.findIndex(
                        sequenceName => this.currentSequence.sequenceId.name ===
                            sequenceName) > -1) {
                  this.isSequenceUsed = 'bg-success';
                }
              },
              error => {
                console.log(error);
              });
    }, error => MessageToast.showError(error.message));
  }

  private readAllProfiles() {
    this.profileService.readAllProfiles().subscribe(
        res => {
          this.profileList = res;
          this.profileList.forEach(
              profile => profile.condition = new Condition({parts: []}));
          this.determineUsageOfProfiles();
        },
        error => {
          if (error.status !== 404) {
            MessageToast.showError(error.message);
          }
          this.profileList = [];
        });
  }

  showInfo(name: string|null) {
    if (this.infoPopup) {
      let infoObject: ProcessingProfile|ProcessingProfileSequence|undefined;

      if (name) {
        infoObject = this.currentSequence;
      } else {
        infoObject =
            this.profileList.find(profile => profile.profileId.name === name);
      }

      this.infoPopup.showInfoForObject(infoObject);
    }
  }

  showUsageInfo(name: string|null) {
    if (!name) {
      name = this.currentSequence.sequenceId.name;
      this.router.navigate(
          [this.sequencePath, 'usageInfo', encodeURIComponent(name)]);
    } else {
      this.router.navigate(
          [this.profilePath, 'usageInfo', encodeURIComponent(name)]);
    }
  }

  private addProfile() {
    this.filteredProfileList = this.profileList.filter(
        profile => isNullOrUndefined(this.usedProfiles.find(
                       usedProfile => usedProfile.profileId.name ===
                           profile.profileId.name)) &&
            profile.active);

    setTimeout(() => {
      if (this.assignProfileGrid && this.assignProfileGrid.instance) {
        DataGridUtil.customizeColumns(this.assignProfileGrid.columns);
      }
    });

    this.isAssignProfileGridHidden = false;

    setTimeout(() => {
      const element = document.querySelector('#assignProfileGrid');
      if (element) {
        element.scrollIntoView(
            {behavior: 'smooth', block: 'start', inline: 'nearest'});
      }
    }, 100);
  }

  selectProfiles() {
    this.filteredProfileList
        .filter(
            profile => !isNullOrUndefined(this.selectedRows.find(
                key => key.profileId.name === profile.profileId.name)))
        .forEach(profile => {
          profile.index = this.usedProfiles.length;
          this.usedProfiles.push(profile);
        });

    this.filteredProfileList = this.profileList.filter(
        profile => isNullOrUndefined(this.usedProfiles.find(
                       usedProfile => usedProfile.profileId.name ===
                           profile.profileId.name)) &&
            profile.active);

    setTimeout(() => {
      if (this.assignProfileGrid && this.assignProfileGrid.instance) {
        DataGridUtil.customizeColumns(this.assignProfileGrid.columns);
      }
    });

    this.selectedRows = [];
    this.hideAssignProfileGrid();
  }

  hideAssignProfileGrid() {
    this.isAssignProfileGridHidden = true;
    window.location.hash = '';
  }

  editProfile(name: string) {
    window.open(
        `${location.protocol}//${location.host}/${this.profilePath}/edit/${
            encodeURIComponent(name)}`,
        '_blank');
  }

  removeProfileFromSequence(name: string) {
    const index =
        this.usedProfiles.findIndex(profile => profile.profileId.name === name);
    this.usedProfiles.splice(index, 1);
    this.usedProfiles.slice(index, this.usedProfiles.length)
        .forEach(profile => profile.index--);
  }

  switchProfiles(profileIndex1: number, profileIndex2: number) {
    const firstProfile = this.usedProfiles[profileIndex1];
    const secondProfile = this.usedProfiles[profileIndex2];
    firstProfile.index = profileIndex2;
    secondProfile.index = profileIndex1;
    this.usedProfiles.splice(firstProfile.index, 1, firstProfile);
    this.usedProfiles.splice(secondProfile.index, 1, secondProfile);
  }

  moveToStart(name: string) {
    const profile = this.usedProfiles.splice(
        this.usedProfiles.findIndex(profile => profile.profileId.name === name),
        1);
    this.usedProfiles.unshift(...profile);
    this.usedProfiles.forEach((profile, index) => {
      profile.index = index;
    });
  }

  moveToEnd(name: string) {
    const profile = this.usedProfiles.splice(
        this.usedProfiles.findIndex(profile => profile.profileId.name === name),
        1);
    this.usedProfiles.push(...profile);
    this.usedProfiles.forEach((profile, index) => {
      profile.index = index;
    });
  }

  moveOneUp(name: string) {
    const index =
        this.usedProfiles.findIndex(profile => profile.profileId.name === name);
    if (index > 0) {
      this.switchProfiles(index, index - 1);
    }
  }

  moveOneDown(name: string) {
    const index =
        this.usedProfiles.findIndex(profile => profile.profileId.name === name);
    if (index < this.usedProfiles.length - 1) {
      this.switchProfiles(index, index + 1);
    }
  }

  getButtonBackground(name: string): string {
    if (!isNullOrUndefined(name)) {
      if (!isNullOrUndefined(this.profilesUsedInASequence) &&
          !isNullOrUndefined(
              this.profilesUsedInASequence.find(id => id.name === name))) {
        return 'bg-success';
      }
    }

    return 'bg-warning';
  }

  private determineUsageOfProfiles() {
    this.profileService
        .determineUsageOfProfiles(
            this.profileList.map(profile => profile.profileId))
        .subscribe(res => (this.profilesUsedInASequence = res), error => {
          if (error.status !== 404) {
            MessageToast.showError(error.message);
          }
          this.profilesUsedInASequence = [];
        });
  }

  // tslint:disable-next-line:no-any
  getFormatTypeDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(technicalName.value, FormatTypeList.list);
  }

  // tslint:disable-next-line:no-any
  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        hint: 'Add Profile',
        icon: 'add',
        onClick: this.addProfile.bind(this)
      }
    });
  }

  // tslint:disable-next-line:no-any
  onContentReady(e: any) {
    e.component.option('loadPanel.enabled', false);
  }

  // tslint:disable-next-line:no-any
  onFieldDataChanged(event: any) {
    if (event.dataField === 'active' && this.isSequenceUsed === 'bg-success' &&
        event.value === false) {
      setTimeout(() => this.currentSequence.active = true);
      MessageToast.showError(
          'This sequence is still used by an origin or origin group! Remove any references before changing its status to inactive!');
    }
  }

  // tslint:disable-next-line:no-any
  customizePosition(position: any): string {
    return '' + (Number(position.value) + 1);
  }

  // tslint:disable-next-line:no-any
  onRowExpanding(event: any) {
    this.conditionService.readConditionForProfile(event.key.profileId)
        .subscribe(res => (event.key.condition = res[0]));
  }

  // tslint:disable-next-line:no-any
  getOperatorDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(technicalName.value, OperatorList.list);
  }

  // tslint:disable-next-line:no-any
  getTableDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(technicalName.value, ISAS.tables);
  }

  // tslint:disable-next-line:no-any
  getFieldDisplayName(technicalName: any): string {
    if (isNullOrUndefined(technicalName.value)) {
      return '';
    }

    let displayName = '';

    ISAS.tables.some(table => {
      const someField = table.isasFields.find(
          field => field.technicalName === technicalName.value);
      if (someField) {
        displayName = someField.displayName;
        return true;
      }
      return false;
    });
    return displayName;
  }

  bracesAsString(bracesCount: number, start: boolean): string {
    if (start) {
      return '['.repeat(bracesCount);
    } else {
      return ']'.repeat(bracesCount);
    }
  }

  // tslint:disable-next-line:no-any
  customizeIndex(index: any): string {
    return '' + (Number(index.value) + 1);
  }

  // tslint:disable-next-line:no-any
  getTypeDisplayName(technicalName: any): string {
    return ListObject.getDisplayName(technicalName.value, FunctionType.list);
  }
}

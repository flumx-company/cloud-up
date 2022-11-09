import {Location} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {isNullOrUndefined} from 'util';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {FormatTypeList} from '../../../shared/models/format-type-list';
import {ListObject} from '../../../shared/models/list-object';
import {ProcessingProfile, ProcessingProfileSequence} from '../../models';
import {OriginGroupService, OriginService, ProfileSequenceService, ProfileService} from '../../services';

@Component({
  selector: 'app-profile-usage-info',
  templateUrl: './profile-usage-info.component.html',
  styleUrls: ['./profile-usage-info.component.css']
})
export class ProfileUsageInfoComponent implements OnInit {
  @ViewChild(InfoPopupComponent) infoPopup: InfoPopupComponent|undefined;

  sequenceList: ProcessingProfileSequence[] = [];
  currentProfile: ProcessingProfile = new ProcessingProfile();
  private usedSequences: string[] = [];
  private sequencePath = 'Profile-Manager-Module/profile-sequence';
  private profilePath = 'Profile-Manager-Module/profile';
  customizeColumns = DataGridUtil.customizeColumns;

  constructor(
      private location: Location, private route: ActivatedRoute,
      private router: Router, private profileService: ProfileService,
      private sequenceService: ProfileSequenceService,
      private originService: OriginService,
      private originGroupService: OriginGroupService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.profileService.readProfile(params['name']).subscribe(res => {
        this.currentProfile = res[0];

        this.sequenceService
            .readSequencesWithProfile(this.currentProfile.profileId)
            .subscribe(
                resultList => {
                  this.sequenceList = resultList;
                  this.determineUsageInOrigins();
                  this.determineUsageInOriginGroups();
                },
                error => {
                  if (error.status !== 404) {
                    MessageToast.showError(error.message);
                  }
                  this.sequenceList = [];
                });
      }, error => MessageToast.showError(error.message));
    });
  }

  private determineUsageInOrigins() {
    this.originService
        .determineUsageOfSequences(
            this.sequenceList.map(sequence => sequence.sequenceId.name))
        .subscribe(
            resultOriginList => this.usedSequences.push(...resultOriginList),
            error => {
              if (error.status !== 404) {
                MessageToast.showError(error.message);
              }
            });
  }

  private determineUsageInOriginGroups() {
    this.originGroupService
        .determineUsageOfSequences(
            this.sequenceList.map(sequence => sequence.sequenceId.name))
        .subscribe(
            resultOriginGroupList =>
                this.usedSequences.push(...resultOriginGroupList),
            error => {
              if (error.status !== 404) {
                MessageToast.showError(error.message);
              }
            });
  }

  editSequence(name: string) {
    window.open(
        `${location.protocol}//${location.host}${this.sequencePath}/edit/${
            encodeURIComponent(name)}`,
        '_blank');
  }

  editProfile(name: string) {
    window.open(
        `${location.protocol}//${location.host}${this.profilePath}/edit/${
            encodeURIComponent(name)}`,
        '_blank');
  }

  // tslint:disable-next-line:no-any
  onFileSaving(event: any) {
    event.fileName =
        `usage_info_${this.currentProfile.profileId.name}_in_profile_sequences`;
  }

  navBack() {
    this.location.back();
  }

  // tslint:disable-next-line:no-any
  getFormatTypeDisplayName(technicalName: any) {
    return ListObject.getDisplayName(technicalName.value, FormatTypeList.list);
  }

  getButtonBackground(name: string): string {
    if (isNullOrUndefined(
            this.usedSequences.find(sequenceName => sequenceName === name))) {
      return 'bg-warning';
    } else {
      return 'bg-success';
    }
  }

  // tslint:disable-next-line:no-any
  showInfo(name: string|null, sequenceName: string|null, event: any) {
    event.stopImmediatePropagation();

    if (this.infoPopup) {
      let infoObject: ProcessingProfile|ProcessingProfileSequence|undefined;

      if (isNullOrUndefined(name)) {
        infoObject = this.currentProfile;
      } else if (!isNullOrUndefined(sequenceName)) {
        if (this.sequenceList) {
          const sequence = this.sequenceList.find(
              sequence => sequence.sequenceId.name === sequenceName);
          if (sequence) {
            infoObject = sequence.processingProfileList.find(
                profile => profile.profileId.name === name);
          }
        }
      } else {
        infoObject = this.sequenceList.find(
            sequence => sequence.sequenceId.name === name);
      }

      this.infoPopup.showInfoForObject(infoObject);
    }
  }

  // tslint:disable-next-line:no-any
  showUsageInfo(name: string, event: any) {
    event.stopImmediatePropagation();

    const navigationExtras: NavigationExtras = {
      queryParams: {mode: 'usageInfo', name: encodeURIComponent(name)}
    };

    this.router.navigate([this.sequencePath], navigationExtras);
  }
}

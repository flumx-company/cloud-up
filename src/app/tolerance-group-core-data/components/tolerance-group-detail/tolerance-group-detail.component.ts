import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';
import {v4 as UUIDv4} from 'uuid';
import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DirtyCheck} from '../../../shared/helpers/dirty-check';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {ToleranceGroup} from '../../models/tolerance-group';
import {ToleranceGroupService} from '../../services/tolerance-group.service';

@Component({
  selector: 'app-tolerance-group-detail',
  templateUrl: './tolerance-group-detail.component.html',
  styleUrls: ['./tolerance-group-detail.component.css']
})

export class ToleranceGroupDetailComponent implements OnInit {
  @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;

  private basePath = 'tolerance-group-core-data';
  private waitForBackend = false;

  viewMode: string|undefined|null;
  name: string|undefined|null;
  currentToleranceGroup: ToleranceGroup = new ToleranceGroup();
  backupToleranceGroup = '';

  constructor(
      private route: ActivatedRoute, private router: Router,
      private toleranceGroupService: ToleranceGroupService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (isNullOrUndefined(params['name'])) {
        this.viewMode = 'Add';
        this.currentToleranceGroup = new ToleranceGroup();
      } else {
        this.viewMode = 'Edit';
        this.name = params['name'];
        this.loadCurrentToleranceGroup();
      }
    });
  }

  private loadCurrentToleranceGroup() {
    if (this.name) {
      this.toleranceGroupService.getToleranceGroupByName(this.name).subscribe(
          res => {
            this.currentToleranceGroup = res;
            this.setUUIDs();
            this.backupToleranceGroup = DirtyCheck.getStringFromStringOrObject(
                this.currentToleranceGroup);
          },
          error => MessageToast.showError(error.message));
    }
  }

  private setUUIDs() {
    if (isNullOrUndefined(this.currentToleranceGroup.paymentDifferences)) {
      this.currentToleranceGroup.paymentDifferences = [];
    }
    this.currentToleranceGroup.paymentDifferences.forEach(
        field => (field.uuid = UUIDv4()));
  }

  navBack() {
    if (!DirtyCheck.isDirty(
            this.currentToleranceGroup, this.backupToleranceGroup)) {
      this.router.navigate([this.basePath]);
      return;
    }
    const result = confirm('Continue without saving?', '');
    result.then(res => {
      if (res) {
        this.router.navigate([this.basePath]);
      }
    });
  }

  showInfo() {
    if (this.currentToleranceGroup && this.infoPopup) {
      this.infoPopup.showInfoForObject(this.currentToleranceGroup);
    }
  }

  // tslint:disable-next-line:no-any
  save(event: any) {
    event.preventDefault();

    if (!this.waitForBackend) {
      this.waitForBackend = true;

      if (this.validate()) {
        if (this.viewMode === 'Add') {
          this.createToleranceGroup();
        } else {
          this.updateToleranceGroup();
        }
      } else {
        this.waitForBackend = false;
      }
    }
  }

  private validate(): boolean {
    if (!this.currentToleranceGroup) {
      return false;
    }
    return true;
  }

  private isPaymentDifferencesEmpty(): boolean {
    if (!this.currentToleranceGroup.paymentDifferences ||
        this.currentToleranceGroup.paymentDifferences.length < 1) {
      return true;
    }
    return false;
  }

  private createToleranceGroup() {
    this.toleranceGroupService.createToleranceGroup(this.currentToleranceGroup)
        .subscribe(
            res => {
              this.waitForBackend = false;
              const navigationExtras:
                  NavigationExtras = {queryParams: {refresh: 'true'}};
              this.router.navigate([this.basePath], navigationExtras);
            },
            error => {
              this.waitForBackend = false;
              if (error.status === 409) {
                MessageToast.showError(error.message);
              }
            });
  }

  private updateToleranceGroup() {
    this.toleranceGroupService.updateToleranceGroup(this.currentToleranceGroup)
        .subscribe(
            res => {
              this.waitForBackend = false;
              const navigationExtras:
                  NavigationExtras = {queryParams: {refresh: 'true'}};
              this.router.navigate([this.basePath], navigationExtras);
            },
            error => {
              this.waitForBackend = false;
              if (error.status === 400) {
                MessageToast.showError('Tolerance Group is invalid!');
              } else {
                MessageToast.showError(error.message);
              }
            });
  }
}

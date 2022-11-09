import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {confirm} from 'devextreme/ui/dialog';
import {isNullOrUndefined} from 'util';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {PaymentDifference} from '../../models/payment-difference';
import {ToleranceGroup} from '../../models/tolerance-group';
import {ToleranceGroupService} from '../../services/tolerance-group.service';

@Component({
  selector: 'app-tolerance-group-home',
  templateUrl: './tolerance-group-home.component.html',
  styleUrls: ['./tolerance-group-home.component.css'],
})

export class ToleranceGroupHomeComponent implements OnInit {
  @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent|undefined;

  private basePath = 'tolerance-group-core-data';

  toleranceGroupList: ToleranceGroup[] = [];
  customizeColumns = DataGridUtil.customizeColumns;

  constructor(
      private route: ActivatedRoute, private router: Router,
      private toleranceGroupService: ToleranceGroupService) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params.has('refresh') && params.get('refresh') === 'true') {
        this.readAll();
      } else {
        if (isNullOrUndefined(this.toleranceGroupList) ||
            this.toleranceGroupList.length <= 0) {
          this.readAll();
        }
      }
    });
  }

  private readAll() {
    this.toleranceGroupService.readAll().subscribe(
        res => {
          this.toleranceGroupList = res;
        },
        error => {
          if (error.status === 404) {
            this.toleranceGroupList = [];
          } else {
            MessageToast.showError(error.message);
          }
        });
  }

  addToleranceGroup() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  // tslint:disable-next-line:no-any
  editToleranceGroup(toleranceGroupId: number, event: any) {
    event.stopImmediatePropagation();
    const toleranceGroup = this.toleranceGroupList.find(
        group => group.toleranceGroupId === toleranceGroupId);

    if (toleranceGroup) {
      this.router.navigate(
          ['edit', toleranceGroup.name], {relativeTo: this.route});
    }
  }

  // tslint:disable-next-line:no-any
  deleteToleranceGroup(toleranceGroupId: number, event: any) {
    event.stopImmediatePropagation();

    const confirmResult = confirm(
        'Do you really want to delete this Tolerance Group?',
        'Deletion Confirmation');
    confirmResult.then(res => {
      if (res) {
        const toleranceGroup = this.toleranceGroupList.find(
            group => group.toleranceGroupId === toleranceGroupId);
        if (toleranceGroup) {
          this.toleranceGroupService.deleteToleranceGroup(toleranceGroup)
              .subscribe(
                  () => {
                    this.toleranceGroupList.splice(
                        this.toleranceGroupList.findIndex(
                            group =>
                                group.toleranceGroupId === toleranceGroupId),
                        1);
                    MessageToast.showSuccess(
                        'Tolerance Group has been successfully deleted!');
                  },
                  error => {
                    MessageToast.showError(error.message);
                  });
        }
      }
    });
  }

  // tslint:disable-next-line:no-any
  showInfo(toleranceGroupId: number, event: any) {
    event.stopImmediatePropagation();
    if (this.infoPopup) {
      const toleranceGroup = this.toleranceGroupList.find(
          group => group.toleranceGroupId === toleranceGroupId);
      this.infoPopup.showInfoForObject(toleranceGroup);
    }
  }

  // tslint:disable-next-line:no-any
  showPaymentDifferenceInfo(paymentDifferenceId: number, event: any) {
    event.stopImmediatePropagation();

    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(
          ([] as PaymentDifference[])
              .concat(...this.toleranceGroupList.map(
                  (group: ToleranceGroup) => group.paymentDifferences))
              .find(
                  paymDiff =>
                      paymDiff.paymentDifferenceId === paymentDifferenceId));
    }
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
            hint: 'Add new Tolerance Group',
            icon: 'add',
            onClick: this.addToleranceGroup.bind(this)
          }
        });
  }

  // tslint:disable-next-line:no-any
  onExporting(e: any) {
    e.component.beginUpdate();
    e.component.columnOption('toleranceGroupId', 'visible', false);
  }

  // tslint:disable-next-line:no-any
  onExported(e: any) {
    e.component.columnOption('toleranceGroupId', 'visible', true);
    e.component.endUpdate();
  }
}

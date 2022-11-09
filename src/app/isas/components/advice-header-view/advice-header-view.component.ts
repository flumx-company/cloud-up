import {Location} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {IsasControl} from '../../models/isas-control';
import {RemittanceAdviceAmount} from '../../models/remittance-advice-amount';
import {RemittanceAdviceHeader} from '../../models/remittance-advice-header';
import {RemittanceAdvicePosition} from '../../models/remittance-advice-position';
import {IsasService} from '../../services/isas.service';

@Component({
  selector: 'app-advice-header-view',
  templateUrl: './advice-header-view.component.html',
  styleUrls: ['./advice-header-view.component.scss']
})
export class AdviceHeaderViewComponent implements OnInit {
  @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;

  amounts: RemittanceAdviceAmount[] = [];
  positions: RemittanceAdvicePosition[] = [];
  ID?: string;
  linkedBankStatements: IsasControl[] = [];
  linkedBankStatementsDataSource: DataSource;
  isasData?: IsasControl;
  private remittanceAdviceHeader?: RemittanceAdviceHeader;
  private remittanceAdviceEntityId?: number;
  customizeColumns = DataGridUtil.customizeColumns;

  constructor(
      private location: Location, private route: ActivatedRoute,
      private router: Router, private isasService: IsasService) {
    this.linkedBankStatementsDataSource = new DataSource({
      key: 'entityId',
      store: new CustomStore({
        load: (loadOptions) => {
          if (!this.remittanceAdviceEntityId) {
            return new Promise<{data: IsasControl[], totalCount: number}>(
                (resolve) => {
                  resolve({data: [], totalCount: 0});
                });
          } else {
            return this.isasService
                .getLinkedBankStatements(
                    this.remittanceAdviceEntityId, loadOptions.skip,
                    loadOptions.take)
                .toPromise()
                .then(isasData => {
                  return {
                    data: isasData.content,
                    totalCount: isasData.totalElements
                  };
                })
                .catch(error => {
                  return {data: [], totalCount: 0};
                });
          }
        }
      })
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.isasService.getISASByRemittanceAdviceEntityId(params['id'])
          .subscribe(
              res => {
                this.isasData = res;
                this.remittanceAdviceHeader =
                    res.bankStatementHeader!.BANKSTMT_POSITION![0]
                        .bankStatementPositionRemittanceAdviceHeaders![0]
                        .remittanceAdviceHeader!;
                this.remittanceAdviceEntityId =
                    this.remittanceAdviceHeader.entityId;
                this.ID = this.remittanceAdviceHeader.REMADV_ID;
                this.positions = this.remittanceAdviceHeader.REMADV_POSITION!;
                this.amounts = this.remittanceAdviceHeader.REMADV_AMOUNT!;
                this.linkedBankStatementsDataSource.reload();
              },
              error => {
                MessageToast.showError(error.message);
                this.positions = [];
                this.amounts = [];
              });
    });
  }

  navBack() {
    this.location.back();
  }

  showAdviceInfo() {
    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(this.remittanceAdviceHeader);
    }
  }

  // tslint:disable-next-line:no-any
  onSelectionChanged(event: any) {
    event.component.collapseAll(-1);
    event.component.expandRow(event.currentSelectedRowKeys[0]);
  }

  // tslint:disable-next-line:no-any
  showPositionInfo(entityId: number, event: any) {
    event.stopImmediatePropagation();
    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(
          this.positions.find(position => position.entityId === entityId));
    }
  }

  // tslint:disable-next-line:no-any
  showStatementInfo(entityId: number, event: any) {
    event.stopImmediatePropagation();
    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(this.linkedBankStatements.find(
          statement => statement.entityId === entityId));
    }
  }

  // tslint:disable-next-line:no-any
  showStatementView(entityId: number, event: any) {
    event.stopImmediatePropagation();

    window.open(
        `${location.protocol}//${location.host}/isas/statement/detail/${
            entityId}`,
        '_blank');
  }
}

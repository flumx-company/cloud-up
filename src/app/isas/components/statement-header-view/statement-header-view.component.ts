import {Location} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {BankStatementPosition} from '../../models/bank-statement-position';
import {IsasControl} from '../../models/isas-control';
import {RemittanceAdviceHeader} from '../../models/remittance-advice-header';
import {StmtToRemAdv} from '../../models/stmt-to-remadv';
import {IsasService} from '../../services/isas.service';

@Component({
  selector: 'app-statement-header-view',
  templateUrl: './statement-header-view.component.html',
  styleUrls: ['./statement-header-view.component.css']
})
export class StatementHeaderViewComponent implements OnInit {
  @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;

  positions: BankStatementPosition[] = [];
  linkedRemittanceAdvices: RemittanceAdviceHeader[] = [];
  isasData?: IsasControl;
  ID?: string;
  customizeColumns = DataGridUtil.customizeColumns;

  constructor(
      private location: Location, private route: ActivatedRoute,
      private router: Router, private isasService: IsasService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.isasService.getISASById(params['id'])
          .subscribe(
              res => {
                this.isasData = res;
                this.ID = res.bankStatementHeader!.ID;
                this.positions = res.bankStatementHeader!.BANKSTMT_POSITION!;
              },
              error => {
                MessageToast.showError(error.message);
                this.positions = [];
              });
    });
  }

  navBack() {
    this.location.back();
  }

  showStatementInfo() {
    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(this.isasData!.bankStatementHeader);
    }
  }

  // tslint:disable-next-line:no-any
  updateLinkedAdvices(event: any) {
    event.component.collapseAll(-1);
    event.component.expandRow(event.currentSelectedRowKeys[0]);

    this.linkedRemittanceAdvices =
        ([] as StmtToRemAdv[])
            .concat(
                ...this.positions
                    .filter(
                        position => position.entityId ===
                                event.currentSelectedRowKeys[0] &&
                            (position
                                 .bankStatementPositionRemittanceAdviceHeaders))
                    .map(
                        position =>
                            position
                                .bankStatementPositionRemittanceAdviceHeaders!))
            .map(stmtToRemAdv => stmtToRemAdv.remittanceAdviceHeader!);
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
  showAdviceInfo(entityId: number, event: any) {
    event.stopImmediatePropagation();
    if (this.infoPopup) {
      this.infoPopup.showInfoForObject(this.linkedRemittanceAdvices.find(
          advice => advice.entityId === entityId));
    }
  }

  // tslint:disable-next-line:no-any
  showAdviceView(entityId: number, event: any) {
    event.stopImmediatePropagation();

    window.open(
        `${location.protocol}//${location.host}/isas/advice/detail/${entityId}`,
        '_blank');
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';

import {InfoPopupComponent} from '../../../shared/components/info-popup/info-popup.component';
import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {MessageToast} from '../../../shared/helpers/message-toast';
import {IsasService} from '../../services/isas.service';

@Component({
    selector: 'app-isas-home',
    templateUrl: './isas-home.component.html',
    styleUrls: ['./isas-home.component.css']
})
export class IsasHomeComponent implements OnInit {
    @ViewChild(InfoPopupComponent) infoPopup?: InfoPopupComponent;

    menus = ['Bank Statements', 'Remittance Advices', 'Lockboxes'];
    objectKeys = Object.keys;
    ignoreProperties = [
        'entityId', 'formatType', 'linkedToBankStatement', 'REMADV_ID',
        'REMADV_SENDER', 'REMADV_RECEIVER', 'REMADV_POSITION', 'REMADV_AMOUNT',
        'insertMetadata', 'updateMetadata', 'version', 'FILENAME'
    ];
    dataSourceBankStatement: DataSource;
    dataSourceRemittanceAdvice: DataSource;
    dataSourceLockbox: DataSource;
    customizeColumns = DataGridUtil.customizeColumns;

    constructor(
        private isasService: IsasService, private router: Router,
        private route: ActivatedRoute) {
        this.dataSourceBankStatement = new DataSource({
            store: new CustomStore({
                key: 'entityId',
                load: (loadOptions) => {
                    return this.isasService
                        .getISASForTenant(
                            'BANK_STATEMENT', loadOptions.skip, loadOptions.take)
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
            })
        });

        this.dataSourceRemittanceAdvice = new DataSource({
            store: new CustomStore({
                key: 'entityId',
                load: (loadOptions) => {
                    return this.isasService
                        .getISASForTenant(
                            'REMITTANCE_ADVICE', loadOptions.skip, loadOptions.take)
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
            })
        });

        this.dataSourceLockbox = new DataSource({
            store: new CustomStore({
                key: 'entityId',
                load: (loadOptions) => {
                    return this.isasService
                        .getISASForTenant('LOCKBOX', loadOptions.skip, loadOptions.take)
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
            })
        });
    }

    ngOnInit() {}
    //
    // tslint:disable-next-line:no-any
    showInfo(entityId: number, event: any) {
        event.stopImmediatePropagation();

        this.isasService.getISASById(entityId).subscribe(
            res => {
                if (this.infoPopup) {
                    this.infoPopup.showInfoForObject(res);
                }
            },
            error => {
                MessageToast.showError(error.message);
            });
    }

    // tslint:disable-next-line:no-any
    showStatementView(entityId: number, event: any) {
        event.stopImmediatePropagation();

        this.router.navigate(
            ['statement/detail', entityId], {relativeTo: this.route});
    }

    // tslint:disable-next-line:no-any
    showAdviceView(entityId: number, event: any) {
        event.stopImmediatePropagation();

        const isasControl = this.dataSourceRemittanceAdvice.items().find(
            isasControl => isasControl.entityId === entityId);
        if (isasControl) {
            entityId = isasControl.bankStatementHeader!.BANKSTMT_POSITION![0]
                .bankStatementPositionRemittanceAdviceHeaders![0]
                .remittanceAdviceHeader!.entityId;
        }

        this.router.navigate(['advice/detail', entityId], {relativeTo: this.route});
    }

    // tslint:disable-next-line:no-any
    showLockboxView(entityId: number, event: any) {
        event.stopImmediatePropagation();

        // can reuse statement-view here
        this.router.navigate(
            ['statement/detail', entityId], {relativeTo: this.route});
    }

    getDisplayNameForProperty(property: string): string {
        switch (property) {
            case 'REMADV_IDEXT':
                return 'External Id';
            case 'PAYER':
                return 'Payer';
            case 'ALTERNATE_PAYER':
                return 'Alternate Payer';
            case 'REMADV_REF_1':
                return 'Reference 1';
            case 'REMADV_REF_2':
                return 'Reference 2';
            case 'REMADV_REF_3':
                return 'Reference 3';
            case 'REMADV_REF_4':
                return 'Reference 4';
            case 'REMADV_REF_5':
                return 'Reference 5';
            case 'REMADV_REF_6':
                return 'Reference 6';
            case 'REMADV_REF_7':
                return 'Reference 7';
            case 'PAYM_CURR':
                return 'Payment Currency';
            case 'CDTDBT_INDICATOR':
                return 'Credit/Debit';
            case 'PAYM_AMOUNT':
                return 'Payment Amount';
            case 'ARC_ID':
                return 'Archive Id';
            case 'EMAIL_SENDER':
                return 'Email Sender';
            case 'EMAIL_SENDER_AVS':
                return 'Email Sender in Advice';
            case 'EMAIL_RECEIVER':
                return 'Email Receiver';
            case 'EMAIL_SUBJECT':
                return 'Email Subject';
            case 'CUST_ACCOUNT':
                return 'Customer Account';
            case 'NAME1_SENDER':
                return 'Name1 Sender';
            case 'NAME2_SENDER':
                return 'Name2 Sender';
            case 'STREET_SENDER':
                return 'Street Sender';
            case 'CITY_SENDER':
                return 'City Sender';
            case 'POSTCODE_SENDER':
                return 'Postcode Sender';
            case 'POBOX_SENDER':
                return 'Postbox Sender';
            case 'TELNO_SENDER':
                return 'Telephone Number Sender';
            case 'FAX_SENDER':
                return 'Fax Number Sender';
            case 'TAXNO_SENDER':
                return 'Tax Number Sender';
            case 'SALESTAXNO_SENDER':
                return 'Sales Tax Number Sender';
            case 'TRADEREGISTERNO_SENDER':
                return 'Traderegister Number Sender';
            case 'BANK_BIC':
                return 'BIC';
            case 'BANK_IBAN':
                return 'IBAN';
            case 'BANK_BCNO':
                return 'Bankcode Number';
            case 'BANK_BANO':
                return 'Bankaccount Number';
            case 'ACCOUNT_HOLDER':
                return 'Account Holder';
            default:
                return property;
        }
    }

    private reloadStatements() {
        this.dataSourceBankStatement.reload();
    }

    private reloadAdvices() {
        this.dataSourceRemittanceAdvice.reload();
    }

    private reloadLockboxes() {
        this.dataSourceLockbox.reload();
    }

    // tslint:disable-next-line:no-any
    onToolbarPreparingStatementGrid(e: any) {
        e.toolbarOptions.items.unshift({
            location: 'after',
            widget: 'dxButton',
            options: {
                hint: 'Refresh',
                icon: 'refresh',
                onClick: this.reloadStatements.bind(this)
            }
        });
    }

    // tslint:disable-next-line:no-any
    onToolbarPreparingAdviceGrid(e: any) {
        e.toolbarOptions.items.unshift({
            location: 'after',
            widget: 'dxButton',
            options: {
                hint: 'Refresh',
                icon: 'refresh',
                onClick: this.reloadAdvices.bind(this)
            }
        });
    }

    // tslint:disable-next-line:no-any
    onToolbarPreparingLockboxGrid(e: any) {
        e.toolbarOptions.items.unshift({
            location: 'after',
            widget: 'dxButton',
            options: {
                hint: 'Refresh',
                icon: 'refresh',
                onClick: this.reloadLockboxes.bind(this)
            }
        });
    }
}

import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DxAccordionComponent} from 'devextreme-angular';
import {confirm} from 'devextreme/ui/dialog';

import {DataGridUtil} from '../../../shared/helpers/data-grid-util';
import {OpenItem} from '../../models/open-item';
import {ReferenceFields} from '../../models/reference-fields';
import {SearchObject} from '../../models/search-object';
import {OpenItemCoreDataService} from '../../services/open-item-core-data.service';
import {AccountingSystem} from "../../../shared/models/accounting-system";
import {isNullOrUndefined} from "util";
import {MessageToast} from "../../../shared/helpers/message-toast";
import {AccountingSystemService} from "../../../shared/services/accounting-system.service";
import {DirtyCheck} from "../../../shared/helpers/dirty-check";
import {MatchOptions} from "../../models/match-options";
import {MatchOptionValue} from "../../models/match-option-value.enum";
import {DateFields} from "../../models/date-fields";
import {AmountFields} from "../../models/amount-fields";

@Component({
  selector: 'app-open-item-core-data-home',
  templateUrl: './open-item-core-data-home.component.html',
  styleUrls: ['./open-item-core-data-home.component.css'],
  animations: [trigger(
    'showHide',
    [
      state('true', style({transform: 'translate3d(0, 0, 0)'})),
      state('false', style({transform: 'translate3d(-100%, 0, 0)'})),
      transition('0 => 1', animate('300ms ease-in')),
      transition('1 => 0', animate('200ms ease-out'))
    ])]
})
export class OpenItemCoreDataHomeComponent implements OnInit {
  accordionSource = ['Search'];
  viewMode = '';

  @ViewChild(DxAccordionComponent) accordion: DxAccordionComponent | undefined;

  // tslint:disable-next-line:no-any
  private sub: any;
  private currentPath = '';
  searchObject: SearchObject;
  backupSearchObject = '';
  backupCurrentItem = '';

  openItems: OpenItem[] = [];
  currentItem: OpenItem;

  masterHidden = true;
  searchHidden = false;
  editHidden = true;
  customizeColumns = DataGridUtil.customizeColumns;
  accountingSystems: AccountingSystem[] = [];

  companyCodes: string[] = [];
  accountTypes: string[] = [];
  accounts: string[] = [];
  documentNumbers = "";

  _selectedAccounts: string[] = [];
  selectedDocumentNumbers: string[] = [];

  dateFields = DateFields.list;
  amountFields = AmountFields.list;

  //todo: replace by service call
  currencies = ['EUR', 'USD', 'ETH'];

  referenceFields = new ReferenceFields().fields;
  matchedOptions = MatchOptions.list;

  constructor(private openItemCoreDataService: OpenItemCoreDataService,
              private accountingSystemService: AccountingSystemService,
              private route: ActivatedRoute, private router: Router) {
    this.currentItem = new OpenItem();
    this.searchObject = new SearchObject();
  }

  get selectedAccounts() {
    return this._selectedAccounts;
  }

  set selectedAccounts(value) {
    this._selectedAccounts = (!value) ? [] : value;
  }

  ngOnInit() {
    if (isNullOrUndefined(this.accountingSystems) || this.accountingSystems.length < 1) {
      this.readAllAccountingSystems();
    }

    this.readSearchValues();

    this.searchObject.matched = this.matchedOptions.filter(o => o.optionValue === MatchOptionValue.ALL)[0];
    this.backupSearchObject = JSON.stringify(this.searchObject, (key, value) => isNullOrUndefined(value) ? '' : value);

    this.route.url.subscribe(url => this.currentPath = url[0].path);

    this.sub = this.route.queryParamMap.subscribe(params => {
      if (params.has('mode')) {
        this.viewMode = params.get('mode')!;
      } else {
        this.viewMode = '';
      }
    });
  }

  readAllAccountingSystems() {
    this.accountingSystemService.readAllAccountingSystems().subscribe(
      res => (this.accountingSystems = res), error => {
        if (error.status === 204) {
          this.accountingSystems = [];
        } else {
          MessageToast.showError(error.message);
        }
      });
  }

  readSearchValues() {
    this.openItemCoreDataService.getSearchValues().subscribe(
      res => {
        this.companyCodes = res.companyIds;
        this.accountTypes = res.accountTypes;
        this.accounts = res.accounts;
      },
      error => {
        MessageToast.showError(error.message);
      }
    );
  }

  // tslint:disable-next-line:no-any
  onContentReady(event: any) {
    event.component.option('loadPanel.enabled', false);
  }

  searchOpenItems() {
    if (!isNullOrUndefined(this.searchObject)) {
      this.searchObject.accounts = this.selectedAccounts;
    }

    // if nothing selected as search criteria all openItems should be loaded
    const isDirty = DirtyCheck.isDirty(this.searchObject, this.backupSearchObject);
    if (!isDirty) {
      this.openItemCoreDataService.getOpenItems().subscribe(
        res => this.openItems = res,
        error => {
          this.openItems = [];
          MessageToast.showError(error.message);
        });
    } else {
      this.openItemCoreDataService.getOpenItemsFiltered(this.searchObject).subscribe(
        res => this.openItems = res,
        error => {
          this.openItems = [];
          if (error.status !== 404) {
            MessageToast.showError(error.message);
          }
        });
    }

    if (this.accordion) {
      this.accordion.instance.collapseItem(0);
    }

    const navigationExtras: NavigationExtras = {
      queryParams: {'mode': 'master'},
    };

    this.router.navigate([this.currentPath], navigationExtras);
  }

  // tslint:disable-next-line:no-any
  editItem(openItemId: string, event: any) {
    event.stopImmediatePropagation();

    const item = this.openItems.find(item => item.id === openItemId);
    if (item) {
      this.currentItem = item;
      this.backupCurrentItem = JSON.stringify(this.currentItem, (key, value) => isNullOrUndefined(value) ? '' : value);

      const navigationExtras: NavigationExtras = {
        queryParams: {'id': openItemId, 'mode': 'edit'},
      };
      this.router.navigate([this.currentPath], navigationExtras);
    }
  }

  // tslint:disable-next-line:no-any
  removeItem(openItemId: string, event: any) {
    event.stopImmediatePropagation();

    const result = confirm('Are you sure you want to delete this record?', 'Delete');
    result.then(res => {
      if (res) {
        const removeIdx = this.openItems.findIndex(item => item.id === openItemId);
        this.openItemCoreDataService.deleteOpenItem(openItemId).subscribe(() => {
          this.openItems.splice(removeIdx, 1);
        });
      }
    });
  }

  // tslint:disable-next-line:no-any
  animationDone(event: any) {
    this.setHiddenStates();
  }

  setHiddenStates() {
    this.editHidden = this.viewMode !== 'edit';
    this.masterHidden = this.viewMode !== 'master';
    this.searchHidden = this.viewMode === 'edit';
    if (this.accordion && !this.searchHidden && this.masterHidden) {
      this.accordion.instance.expandItem(0);
    }
  }

  // tslint:disable-next-line:no-any
  calculateAccountValue(rowData: any) {
    return rowData;
  }

  // tslint:disable-next-line:no-any
  resizeSelectColumn(event: any) {
    if (event.component.shouldSkipNextReady) {
      event.component.shouldSkipNextReady = false;
    } else {
      event.component.shouldSkipNextReady = true;
      event.component.columnOption('command:select', 'width', 24);
      event.component.updateDimensions();
    }
  }
}

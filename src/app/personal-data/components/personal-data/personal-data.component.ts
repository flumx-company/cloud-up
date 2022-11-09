import {Component, OnInit, ViewChild} from '@angular/core';
import {DxAccordionComponent, DxDataGridComponent, DxTextBoxComponent} from "devextreme-angular";
import {PersonalDataService} from "../../services/personal-data.service";
import {GDPRPersonalData} from "../../models/gdpr-personal-data";
import DataSource from "devextreme/data/data_source";
import {GDPRFilterParameter} from "../../models/gdpr-filter-parameter";
import {DataGridUtil} from "../../../shared/helpers/data-grid-util";

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  filterParams: GDPRFilterParameter[] =
    [GDPRFilterParameter.NAME, GDPRFilterParameter.IBAN, GDPRFilterParameter.BANK_KEY, GDPRFilterParameter.BANK_ACC, GDPRFilterParameter.EMAIL];
  searchMenu = ['Filter'];
  dataSource: DataSource;
  personalData: GDPRPersonalData[] = [];
  filterBy: GDPRFilterParameter;
  customizeColumns = DataGridUtil.customizeColumns;
  @ViewChild('masterGrid') dataGrid?: DxDataGridComponent | undefined;
  @ViewChild('textBox1') textBox1?: DxTextBoxComponent | undefined;
  @ViewChild('textBox2') textBox2?: DxTextBoxComponent | undefined;
  @ViewChild('filterMenu') filterMenu: DxAccordionComponent | undefined;

  constructor(private personalDataService: PersonalDataService) {
  }

  ngOnInit() {
  }

  // tslint:disable-next-line:no-any
  updateInputField(event: any) {
    const filterVal = event.value;
    this.filterBy = filterVal;
    const inputFieldLabel1 =
      document.getElementById('input1');
    const inputField2 =
      document.getElementById('inputField2');

    if (inputFieldLabel1 && inputField2 && this.textBox1 && this.textBox2) {
      inputField2.style.visibility = "hidden";
      this.textBox1.value = "";
      this.textBox2.value = "";

      switch (filterVal) {
        case GDPRFilterParameter.NAME:
          inputFieldLabel1.innerText = "Surname";
          inputField2.style.visibility = "visible";
          break;
        case GDPRFilterParameter.IBAN:
          inputFieldLabel1.innerText = GDPRFilterParameter.IBAN;
          break;
        case GDPRFilterParameter.BANK_KEY:
          inputFieldLabel1.innerText = GDPRFilterParameter.BANK_KEY;
          break;
        case GDPRFilterParameter.BANK_ACC:
          inputFieldLabel1.innerText = GDPRFilterParameter.BANK_ACC;
          break;
        case GDPRFilterParameter.EMAIL:
          inputFieldLabel1.innerText = GDPRFilterParameter.EMAIL;
          break;
        default:
          break;
      }
    }
  }

  // tslint:disable-next-line:no-any
  sendMessage(filterQuery: any) {
    this.personalDataService.connectToServer();

    //Delay for 1s
    setTimeout(() => {
      this.personalDataService.observer.next(filterQuery);
      this.personalDataService.observable.subscribe((data: GDPRPersonalData) => {
        let personalData = '';
        if (data.personalData) {
          personalData = personalData + '{ ';
          for (const field of data.personalData) {
            personalData = personalData + field.fieldName + ': ' + field.fieldValue + '; ';
          }
          personalData = personalData + '}';
        }

        this.personalData.push(data);
        if (this.dataGrid) {
          this.dataGrid.instance.refresh();
        }
      }, error => console.log(error), () => this.personalDataService.observer.complete);
    }, 1000);
  }

  getFilterType(filterVal: string) {
    switch (filterVal) {
      case GDPRFilterParameter.NAME:
        return 'NAME';
      case GDPRFilterParameter.BANK_ACC:
        return 'BANK_ACC';
      case GDPRFilterParameter.BANK_KEY:
        return 'BANK_KEY';
      case GDPRFilterParameter.IBAN:
        return 'IBAN';
      default:
        return 'EMAIL';
    }
  }

  filterPersonalData() {
    if (this.filterMenu) {
      this.filterMenu.instance.collapseItem(0);
      if (this.filterBy && this.filterBy.length > 0) {
        this.personalData = [];
        const filterQuery = {
          filterBy: this.getFilterType(this.filterBy),
          filterParam1: this.textBox1 ? this.textBox1.value : '',
          filterParam2: this.textBox2 ? this.textBox2.value : ''
        };
        this.sendMessage(filterQuery);
      }
    }
  }
}

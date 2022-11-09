import {Component, OnInit} from '@angular/core';
import {DashboardDataService} from '../../services/dashboard-data.service';

@Component({
  selector: 'app-widget-assignment-quote',
  templateUrl: './widget-assignment-quote.component.html',
  styleUrls: ['./widget-assignment-quote.component.scss']
})
export class WidgetAssignmentQuoteComponent implements OnInit {
  title = 'Automatic posting rates';
  dataSource: DataTypeValues[];
  dataTypes: DataTypes[];
  chartType = 'line';

  constructor(private service: DashboardDataService) {
    this.dataSource = service.getDataTypeValues();
    this.dataTypes = service.getDataTypes();
  }

  ngOnInit() {}

  // tslint:disable-next-line:no-any
  customizeTooltip(arg: any) {
    return {text: arg.valueText};
  }
}

export class DataTypeValues {
  date?: string;
  total?: number;
  kto?: number;
  lbx?: number;
  avs?: number;
  paypal?: number;
}

export class DataTypes {
  value?: string;
  name?: string;
  color?: string;
}

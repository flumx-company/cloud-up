import {Component, OnInit} from '@angular/core';
import {DashboardDataService} from '../../services/dashboard-data.service';

@Component({
  selector: 'app-widget-data-ratio',
  templateUrl: './widget-data-ratio.component.html',
  styleUrls: ['./widget-data-ratio.component.scss']
})
export class WidgetDataRatioComponent implements OnInit {
  title = 'Current Status Analysis';
  dataSource: RatioStructure[];

  constructor(private service: DashboardDataService) {
    this.dataSource = service.getRatioData();
  }

  ngOnInit() {}

  // tslint:disable-next-line:no-any
  customizeTooltip(arg: any) {
    return {text: arg.seriesName + ' ' + arg.valueText + '%'};
  }
}

export class RatioStructure {
  state?: string;
  finished?: number;
  unfinished?: number;
}

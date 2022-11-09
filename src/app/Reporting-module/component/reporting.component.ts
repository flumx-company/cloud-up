import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-reporting',
    templateUrl: './reporting.component.html',
    styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {
    dataSource: any;
    dataSourceList: any;
    waterLandRatio: any;
    populationData: any;

    constructor() {
        this.dataSource = [{
            state: "Germany",
            young: 6.7,
            middle: 28.6,
            older: 5.1
        }, {
            state: "Japan",
            young: 9.6,
            middle: 43.4,
            older: 9
        }, {
            state: "Russia",
            young: 13.5,
            middle: 49,
            older: 5.8
        }, {
            state: "USA",
            young: 30,
            middle: 90.3,
            older: 14.5
        }];

        this.dataSourceList = [{
            day: "010",
            oranges: 3
        }, {
            day: "020",
            oranges: 2
        }, {
            day: "030",
            oranges: 3
        }, {
            day: "040",
            oranges: 4
        }, {
            day: "050",
            oranges: 6
        }, {
            day: "060",
            oranges: 11
        }, {
            day: "100",
            oranges: 4
        }];

        this.waterLandRatio = [{
            name: 'Taken',
            area: 0.29
        }, {
            name: 'Lost',
            area: 0.71
        }];

        this.populationData = [
            {
                state: "MANUAL \n 33.00%",
                maleyoung: 29.956,
                malemiddle: 90.354,
                maleolder: 14.472
            },
            {
                state: "ELECTRONIC \n 67.00%",
                maleyoung1: 25.607,
                malemiddle2: 55.793,
                maleolder3: 3.727
            }
        ];

    }

    ngOnInit() {
    }

    customizeTooltip(arg: any) {
        return {
            text: arg.argumentText + "<br/>" + arg.valueText
        };
    }
}

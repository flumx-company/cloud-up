import {Component} from '@angular/core';
import {DashboardDataService} from '../../dashboard/services/dashboard-data.service';


@Component({
    selector: 'app-dashboard-transactional-data',
    templateUrl: './dashboard-transactional-data.component.html',
    styleUrls: ['./dashboard-transactional-data.component.scss']
})
export class DashboardTransactionalDataComponent {
    data: any;

    constructor(
        private dashboard: DashboardDataService
    ) {
        this.dashboard.getData().then((data: any) => this.data = data[0].CONFIG)
    }

}

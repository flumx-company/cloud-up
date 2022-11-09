import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardDataService} from '../../services/dashboard-data.service';

@Component({
    selector: 'app-widget-process-monitor',
    templateUrl: './widget-process-monitor.component.html',
    styleUrls: ['./widget-process-monitor.component.scss']
})
export class WidgetProcessMonitorComponent implements OnInit {
    title = 'My Invoice Action List';

    // tslint:disable-next-line:ban-types
    processMonitor: any;

    constructor(private service: DashboardDataService, private router: Router) {
        if (router.url == '/demo') {
            this.processMonitor = service.getProcessMonitorData();
            sessionStorage.setItem("mode", "demo");
        } else {
            if (sessionStorage.getItem('mode') == "demo") {
                this.processMonitor = service.getProcessMonitorData();
            } else {
                service.getProcessMonitorDataLive().then((data: any) => {
                    data.sort((a: any, b: any) => (b.HEADER.RECNO) - (a.HEADER.RECNO));
                    let recno = data.splice(0, 5)
                    recno.map((curr: any) => {
                        curr.EXCEPTIONS = curr.EXCEPTIONS.filter((t: any) => {
                            return t.CURR == true;
                        })

                        curr.EXCEPTIONS[0].MESSAGES.sort((a: any, b: any) => {
                            return (a.PRIORITY) - (b.PRIORITY)
                        })
                        return curr;
                    })

                    recno.map((k: any) => {
                        let MSG: any = '';
                        k.EXCEPTIONS.map((l: any) => {
                            l.MESSAGES.map((s: any) => {
                                MSG += s.MESSAGE + ','
                            })
                            l.MESSAGES[0].MESSAGE = MSG.substring(0, MSG.length - 1);
                        })
                    })

                    this.processMonitor = recno;

                });
            }
        }
    }

    ngOnInit() {
    }

    // tslint:disable-next-line:no-any
    // onCellPrepared(e: any) {
    //   if (e.rowType !== 'data' || e.columnIndex !== 1) {
    //     return;
    //   }

    //   e.displayValue === 'Success' ? e.cellElement.style.color = 'green' :
    //                                  e.cellElement.style.color = 'red';
    // }

    // tslint:disable-next-line:no-any
    // navTo(data: any, event: any) {
    //   // this has to be changed to a real navigation
    //   // won't work with the currently used mock data
    //   console.log(data);
    //   console.log(event);
    // }
}

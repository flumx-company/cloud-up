import {Injectable} from '@angular/core';
import * as Rx from "rxjs";
import {Observable, Observer} from "rxjs";

@Injectable()
export class WebsocketService {

  // tslint:disable-next-line:no-any
  observer: Observer<any>;
  // tslint:disable-next-line:no-any
  observable: Observable<any>;

  constructor() {
  }

  // tslint:disable-next-line:no-any
  connect(url: any): void {
    this.create(url);
  }

  // tslint:disable-next-line:no-any
  private create(url: any): void {
    const ws = new WebSocket(url);

    this.observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
      });

    this.observer = {
      // tslint:disable-next-line:no-any
      next: (data: any) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
      // tslint:disable-next-line:no-any
      error: () => {
      },
      // tslint:disable-next-line:no-any
      complete: () => {
      },
    };
  }
}



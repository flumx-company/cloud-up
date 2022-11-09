import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {WebsocketService} from './websocket.service';
import {GDPRPersonalData} from '../models/gdpr-personal-data';

const SERVER_URL = window.location.hostname + ':' + window.location.port + '/gdprpersonaldata/ws';

@Injectable()
export class PersonalDataService {

  // tslint:disable-next-line:no-any
  observer: Observer<any>;
  // tslint:disable-next-line:no-any
  observable: Observable<any>;

  constructor(private wsService: WebsocketService) {
  }

  connectToServer() {
    let protocol;
    if (location.protocol === 'https:') {
      protocol = 'wss://';
    } else {
      protocol = 'ws://';
    }

    this.wsService.connect(protocol + SERVER_URL);
    this.observer = this.wsService.observer;
    this.observable = this.wsService.observable.map((response: MessageEvent): GDPRPersonalData => {
      const data = JSON.parse(response.data);
      return {
        serviceName: data.serviceName,
        personalData: data.personalData,
        redirectUrl: data.redirectUrl
      };
    });
  }
}

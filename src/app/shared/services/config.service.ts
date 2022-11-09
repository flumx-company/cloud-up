import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  _apiURI: string;
  _tokenEnpointURI: string;
  tenant: number;

  constructor() {
    this._apiURI = 'http://localhost:8082';
    this._tokenEnpointURI = 'https://HO1900096:5000/connect/token';
    this.tenant = 1;
  }

  getApiURI() {
    return this._apiURI;
  }

  getTokenEndpoint() {
    return this._tokenEnpointURI;
  }

  getTenant() {
    return 1;
  }
}

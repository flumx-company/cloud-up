import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwksValidationHandler, OAuthEvent, OAuthService} from 'angular-oauth2-oidc';
import {AuthToken} from '../models/auth-token';


@Injectable()
export class AuthService {
  loggedIn = new EventEmitter<boolean>();

  constructor(
    private _router: Router, private oauthService: OAuthService,
    private httpClient: HttpClient) {
    this.configureAuth();
  }

  private configureAuth(): void {
    this.oauthService.configure({
      loginUrl: window.location.origin + '/uaa/oauth/authorize',
      redirectUri: window.location.origin,
      clientId: 'FrontendClient',
      // delete scopes entry to get all scopes instead - not tested yet
      scope: 'user-manager origin-core-data open-item-core-data tenant-service policy-service file-service settings-configuration-service' +
      ' isas accounting-system-core-data Conditions-module batch Profile-Manager-Module fine-filter restrictions processing-profile-executor' +
      ' processing-functions-executor business-partner processing-protocol replacement tolerance-group amount-type file-importer' +
      ' gdpr-personal-data sftp-service key-service',
      silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
      oidc: false,
      // TODO delete following entry if frontend/oauthserver is also https,,,
      requireHttps: false
    });


    this.oauthService.tryLogin({}).then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.oauthService.setupAutomaticSilentRefresh();
      }
    });
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  }

  obtainAccessToken(url: string) {
    this.oauthService.redirectUri = window.location.origin + url;
    this.oauthService.initImplicitFlow(url);
  }

  getAccessToken() {
    return this.oauthService.getAccessToken();
  }

  isLoggedIn() {
    if (this.oauthService.hasValidAccessToken()) {
      this.loggedIn.emit(true);
      return true;
    }
    return false;
  }

  getTenant() {
    if (!(this.getAccessToken() === null)) {
      const parts = this.getAccessToken().split('.');
      const decoded = this.urlBase64Decode(parts[1]);
      if (!decoded) {
        throw new Error('Cannot decode the token');
      }
      // tslint:disable-next-line:no-any
      const decodedToken = JSON.parse(decoded) as any;
      return decodedToken.tenant;
    } else {
      return '';
    }
  }

  getUserName() {
    if (!(this.getAccessToken() === null)) {
      const parts = this.getAccessToken().split('.');
      const decoded = this.urlBase64Decode(parts[1]);
      if (!decoded) {
        throw new Error('Cannot decode the token');
      }
      // tslint:disable-next-line:no-any
      const decodedToken = JSON.parse(decoded) as any;
      return decodedToken.name;
    } else {
      return '';
    }
  }

  getTokenData(): AuthToken | undefined {
    return this.decodeToken();
  }

  logout() {
    this.httpClient.request('delete', '/uaa/oauth2/v1/token/revokeToken', {})
      .subscribe(() => this.frontEndLogout(), () => this.frontEndLogout());
  }

  frontEndLogout() {
    this.oauthService.logOut();
    location.reload();

    // make user block invisible
    this.loggedIn.emit(false);
  }


  private urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        // tslint:disable-next-line:no-string-throw
        throw 'Illegal base64url string!';
    }
    // tslint:disable-next-line:no-any
    return decodeURIComponent((window as any).escape(window.atob(output)));
  }

  private decodeToken(): AuthToken | undefined {
    if (!(this.getAccessToken() === null)) {
      const parts = this.getAccessToken().split('.');
      const decoded = this.urlBase64Decode(parts[1]);

      if (!decoded) {
        throw new Error('Cannot decode the token');
      }

      const decodedToken = JSON.parse(decoded) as AuthToken;
      return decodedToken;
    }

    return undefined;
  }
}

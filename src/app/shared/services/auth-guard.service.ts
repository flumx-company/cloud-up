import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      boolean|Observable<boolean>|Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.authService.obtainAccessToken(state.url);
    return false;
  }
}

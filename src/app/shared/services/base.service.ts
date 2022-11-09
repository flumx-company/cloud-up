import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from './auth.service';

export abstract class BaseService {
  protected tenant: number;

  constructor(
      protected httpClient: HttpClient, protected authService: AuthService) {
    try {
      this.tenant = Number(this.authService.getTenant());
    } catch (error) {
      console.log(error);
    }
  }
}

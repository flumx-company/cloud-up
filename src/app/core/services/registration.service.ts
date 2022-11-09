import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegistrationService {
  private baseUrl = '/backend/registration/api/v1/registration';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:no-any
  confirmRegistration(uuid: string, password: string): Observable<HttpResponse<any>> {
    const body = {
      token: uuid,
      password
    };

    return this.http.post(`${this.baseUrl}/registrationConfirm`, body, {observe: 'response'});
  }
}

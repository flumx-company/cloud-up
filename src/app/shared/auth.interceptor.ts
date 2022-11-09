import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './services/auth.service';
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {MessageToast} from "./helpers/message-toast";
import {_throw} from 'rxjs/observable/throw';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let nextRequest: HttpRequest<any>;

        if (sessionStorage.getItem("token")) {
            let headers;
            headers =  req.headers
                .set('Authorization', 'Bearer ' + sessionStorage.getItem("token"))
                .set('Accept', 'application/json');

            if(req.url.indexOf('api/pts?myactionlist') > -1) {
                headers = req.headers
                    .set('Authorization', 'Bearer ' + sessionStorage.getItem("token"))
                    .set('Accept', 'application/json')
                    .set('Accept-Language', navigator.language.split('-')[0].toUpperCase());
            } else {
              headers = headers.append('Accept-Language', '')
            }
            nextRequest = req.clone({headers});
        } else {
            nextRequest = req;
        }
        if(nextRequest.url.indexOf('https') == -1) nextRequest = nextRequest.clone({
            url: environment.base_url + nextRequest.url,
        });

        return next.handle(nextRequest)
            .pipe(
                catchError((err: HttpErrorResponse) => this.handleError(err))
            );
    }

    private handleError(err: HttpErrorResponse | any): Observable<any> {

	if(err.status == 404) return _throw(err);
        if(err.url.indexOf('api/pts') > -1) return new Observable(res => res.next(1));
        if(err.url.indexOf('currency') > -1) return _throw(`${status}`);
        const statusError: any = {
            500: 'Internal Server Error',
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found',
            405: 'Method Not Allowed',
            422: 'Unprocessable Entity'
        };

        let message = null;
        for(let i = 0, length = Object.keys(statusError).length; i < length; i++){
            +status === +Object.keys(statusError)[i] && (message = statusError[Object.keys(statusError)[i]]);
            if(message) break;
            i < Object.keys(statusError).length - 1 && (message = 'Unknown error');
        }

        MessageToast.showError(`Status - ${err.status};
         Message - ${ err && err.error ? err.error.MESSAGE : message};
          ${err && err.error && err.error.TYPE && 'TYPE - ' + err.error.TYPE}`);
        return _throw(err);
    }
}

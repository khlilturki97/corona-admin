import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';
import {NotyService} from '../_services/noty.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private notyService: NotyService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        // location.reload(true);
      } else if (err.status === 403) {
        // 403= forbidden to access that api
        this.notyService.displayForbiddenNotification('Error 403: you dont have the permission');
        // location.reload(true);
      } else if (err.status === 500) {
        console.log(err);
        this.notyService.displayForbiddenNotification(err.error.message);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}

import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../_services/authentication.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.access_token}`
        }
      });
    }

    return next.handle(request);
  }
}

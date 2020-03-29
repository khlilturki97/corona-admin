import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BASE_API, CURRENT_USER, FIND, LOGIN, NEW_PASSWORD, RESET} from '../_globals/vars';
import {UserModel} from '../_models/user.model';
import {Router} from '@angular/router';
import {CrudService} from './crud.service';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUser: Observable<UserModel>;
  private currentUserSubject: BehaviorSubject<UserModel>;

  constructor(private http: HttpClient, private router: Router, private crudService: CrudService) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('adminCoronaDelivery')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(BASE_API + LOGIN, {email, password})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('adminCoronaDelivery', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  updateUserInformation(user) {
    const currentUser = JSON.parse(localStorage.getItem('adminCoronaDelivery'));
    currentUser.currentUser = user;
    console.log(currentUser);
    localStorage.setItem('adminCoronaDelivery', JSON.stringify(currentUser));
    this.currentUserSubject.next(currentUser);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('adminCoronaDelivery');
    this.currentUserSubject.next(null);
    window.location.reload();
    setTimeout(() => this.router.navigateByUrl('/sign-in'),3000);

  }

  sendEmail(email: string) {
    return this.http.post<any>(BASE_API + RESET, {email});
  }

  verifToken(token: string) {
    return this.http.get<any>(BASE_API + FIND + '/' + token);
  }

  reset(e: string, p: string, r: string, t: string) {
    return this.http.post<any>(BASE_API + NEW_PASSWORD, {
      email: e,
      password: p,
      password_confirmation: r,
      token: t
    });
  }

  getCurrentUser() {
      const token = this.currentUserValue.access_token;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:  'Bearer ' + token
      });

      return this.http.get(BASE_API + CURRENT_USER, {headers});

  }
}

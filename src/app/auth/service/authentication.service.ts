import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';

import { DashboardServiceSail } from 'app/main/sail/dashboard_sail/dashboard.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _dashboardService: DashboardServiceSail, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }


  // datos Current User
  public usersBase: any[] = [];
  

  /**
   * User login
   *
   * @param username
   * @param email
   * @param password
   * @returns user
   */
  

  // Peticion post para Loguear
  // https://sail.artificialintelligencelead.com/api/auth/login/

  login(username: string, password: string) {
    return this._http
    //API FAKED
    // .post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
    
    //API EXTERNA
    // .post<any>("https://sail.artificialintelligencelead.com/api/auth/login/", { username, password })
    
    //API LOCAL con ng serve --proxy-config proxy.conf.json
    // .post<any>("api/auth/login/", { username, password })
    
    //API HEROKU
    .post<any>("/loginexterno", { username, password })
    .pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        console.log(user)
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));


           
          // Display welcome toast!
          // setTimeout(() => {
          //   this._toastrService.success(
          //     'You have successfully logged in as an ' +
          //       user.role +
          //       ' user to Vuexy. Now you can start to explore. Enjoy! 🎉',
          //     '👋 Welcome, ' + user.firstName + '!',
          //     { toastClass: 'toast ngx-toastr', closeButton: true }
          //   );
          // }, 2500);

          // notify
          this.currentUserSubject.next(user);
        }
          return user;
      })
    );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }
}

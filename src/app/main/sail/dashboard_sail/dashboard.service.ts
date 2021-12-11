import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Injectable()
export class DashboardServiceSail {
  // Public
  public apiData: any;
  public apiDataUser: any;
  public onApiDataChanged: BehaviorSubject<any>;
  public onApiDataUserChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onApiDataChanged = new BehaviorSubject({});
    this.onApiDataUserChanged = new BehaviorSubject({});
  }


  public getApiDataUserDirecto(): Observable<any>{
    return this._httpClient.get('/current_user_A1');
  }

  public solicitaDatoBase(url:string): Observable<any>{
    return this._httpClient.get(url);
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable()
export class DashboardServiceSail {
  // Public
  public apiData: any;
  public apiDataUser: any;
  public onApiDataChanged: BehaviorSubject<any>;
  public onApiDataUserChanged: BehaviorSubject<any>;
  public resultado$: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onApiDataChanged = new BehaviorSubject({});
    this.onApiDataUserChanged = new BehaviorSubject({});
    this.resultado$= new BehaviorSubject({});
  }


  getApiDataUserDirecto(): Observable<any>{
    return this._httpClient.get('/current_user_A1');
  }

  solicitaDatoBase(url:string): Observable<any>{
    return this._httpClient.get(url);
  }
  
  solicitaDatoBaseFuncion(url:string): Observable<any>{
    // let resultado$: of([53, 24]);
    this._httpClient.get(url).subscribe(
      (result:{code:number}) => {
        if (result.code != 200) {
          this.resultado$.next(result);
        } else {
          console.log(result)
          this.resultado$.error(result);
        }
      },
      error => {
        console.log(<any>error);
        this.resultado$.error(error);
      }
    );
    return this.resultado$
  }
  
  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getApiData()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get Api Data
   */
  getApiData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('/API_BASE/lead_col/?status=new&ordering=created&with_concession=true').subscribe((response: any) => {
        this.apiData = response;
        this.onApiDataChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }

}


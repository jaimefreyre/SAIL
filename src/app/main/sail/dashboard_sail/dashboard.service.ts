import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable()
export class DashboardServiceSail {
  // Public
  public search;
  //Objestos
  public apiData: any;
  public apiDataUser: any;
  //BehaviorSubject
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


  //Peticiones Get

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
    return new Promise((resolve, reject) => {
      Promise.all([this.getApiData(), this.getApiCurrentUser()]).then(res => {
        resolve(res);
      }, reject);
    });
  }

  /**
   * Get Api Data
   */
  getApiData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('/API_BASE/lead_col/?status=new&ordering=created&with_concession=true').subscribe( (response: any) => {
        this.apiData = response;
        this.onApiDataChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }

  /**
   * Get Api Usuario Logueado
   */
  getApiCurrentUser(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('/current_user_A1').subscribe((response: any) => {
        this.apiDataUser = response;
        this.onApiDataUserChanged.next(this.apiDataUser);
        resolve(this.apiDataUser);
      }, reject);
    });
  }

  /**
   * Multiples Observables en serie y despues concatenados en paralelo
   */
  // getBookWithDetails(id: number): Observable<any> {
  //   return this.http.get('/api/books/' + id).pipe(
  //     switchMap((book: any) => {
  //       return forkJoin(
  //         of(book),
  //         this.http.get('/api/authors/' + book.author_id),
  //         this.http.get('/api/editors/' + book.editor_id)
  //       ).pipe(
  //         map((data: any[]) => {
  //           let book = data[0];
  //           let author = data[1];
  //           let editor = data[2];
  //           book.author = author;
  //           book.editor = editor;
  //           return book;
  //         })
  //       );
  //     })
  //   );
  // }


}


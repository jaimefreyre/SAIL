import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable, of, forkJoin } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/forkJoin';
import { map } from 'rxjs/operators';



@Injectable()
export class DashboardServiceSail {
  // Public
  public search;
  //Objestos
  public apiData: [[any], [any], [any], [any], [any]];
  public onApiDataChanged: BehaviorSubject<any>;
  
  //BehaviorSubject
  public apiDataUser: any;
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
  
  // '/API_BASE/lead_col/?status=commercial_management&ordering=created&page=1&page_size=10&with_concession=true'
  // '/API_BASE/lead_col/?concessionaire__in=&created_end_date=2022-01-06T03%3A00%3A00.000Z&created_start_date=2021-12-15T03%3A00%3A00.000Z&ordering=created&page=2&page_size=10&search=&source__channel_id__in=&source__origin_id__in=&status=attended&status__in=&tasks__media__in=&tasks__type__in=&user_id__in=&vehicles__brand_model__in=&with_concession=true
  public getParamsDinamica(
    data: { 
      status: string, 
      ordering: string, 
      wc?: string, 
      page?: string, 
      page_size?: string,
      search?: string,
      concessionaire__in?: string,
      created_end_date?: string,
      created_start_date?: string,
      source__channel_id__in?: string,
      source__origin_id__in?: string,
      status__in?: string,
      tasks__media__in?: string,
      tasks__type__in?: string,
      user_id__in?:string,
      vehicles__brand_model__in?: string
    }
    ) {
    let params = new HttpParams();
    params = params.append('status', data.status);
    params = params.append('ordering', data.ordering);
    if(data.wc){
      params = params.append('with_concession', data.wc);
    }
    if(data.page){
      params = params.append('page', data.page);
    }
    if (data.page_size) {
      params = params.append('page_size', data.page_size);
    }
    if (data.search) {
      params = params.append('search', data.search);
    }
    if (data.concessionaire__in) {
      params = params.append('concessionaire__in', data.concessionaire__in);
    }
    if (data.created_end_date) {
      params = params.append('created_end_date', data.created_end_date);
    }
    if (data.created_start_date) {
      params = params.append('created_start_date', data.created_start_date);
    }
    if (data.source__channel_id__in) {
      params = params.append('source__channel_id__in', data.source__channel_id__in);
    }
    if (data.source__origin_id__in) {
      params = params.append('source__origin_id__in', data.source__origin_id__in);
    }
    if (data.status__in) {
      params = params.append('status__in', data.status__in);
    }
    if (data.tasks__media__in) {
      params = params.append('tasks__media__in', data.tasks__media__in);
    }
    if (data.tasks__type__in) {
      params = params.append('tasks__type__in', data.tasks__type__in);
    }
    if (data.user_id__in) {
      params = params.append('user_id__in', data.user_id__in);
    }
    if (data.vehicles__brand_model__in) {
      params = params.append('vehicles__brand_model__in', data.vehicles__brand_model__in);
    }
    
    return this._httpClient.get("/API_BASE/lead_col", {params: params});
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
      Promise.all([
        this.getApiCurrentUser(),
        this.getApiDataNuevo({ status: 'new', ordering: 'created', wc: 'true' },0), 
        this.getApiDataNuevo({ status: 'new', ordering: 'created', wc: 'true' },1), 
        this.getApiDataNuevo({ status: 'new', ordering: 'created', wc: 'true' },2), 
        this.getApiDataNuevo({ status: 'new', ordering: 'created', wc: 'true' },3), 
        this.getApiDataNuevo({ status: 'new', ordering: 'created', wc: 'true' },4), 
      ]).then(res => {
        resolve(res);
      }, reject);
    });
  }

  /**
   * Get Api Data
   */
  getApiDataNuevo(data:any, indexArray:number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      // this._httpClient.get('/API_BASE/lead_col/?status=new&ordering=created&with_concession=true').subscribe( (response: any) => {
      this.getParamsDinamica(data).subscribe( (response: any) => {
        this.apiData[indexArray] = response ;
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


  // getAuthorWithBooks(id: number): Observable<any> {
  //   return forkJoin([
  //     this.http.get('/api/authors/' + id),
  //     this.http.get('/api/authors/' + id + '/books')
  //   ]).pipe(
  //     map((data: any[]) => {
  //       let author: any = data[0];
  //       let books: any[] = data[1];
  //       return author.books = books;
  //     })
  //   );
  // }


    // getPokemonInfo(pokemonId) {
    //   return this.http.get(this.url + 'pokemon/' + pokemonId, { headers: this.headers })
    //     .map(res => res.json());
    // }

    // getPokemonForm(pokemonId) {
    //   return this.http.get(this.url + 'pokemon-form/' + pokemonId, { headers: this.headers })
    //     .map(res => res.json());
    // }

    // const pokemonInfo = this.pokemonService.getPokemonInfo(this.pokemonId);
    // const pokemonForm = this.pokemonService.getPokemonForm(this.pokemonId);

    // Observable.forkJoin([pokemonInfo, pokemonForm])
    //   .subscribe(results => {
    //     console.log(results[0]);
    //     console.log(results[1]);
    //     this.pokemon.nombre = results[0].name;
    //     this.pokemon.altura = results[0].height;
    //     this.pokemon.peso = results[0].weight;
    //     this.pokemon.imagen = results[1].sprites.front_default;
    //   });


}


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

interface dataNewObservable{
    marca: [];
    modelo: [];
    version: [];
    combustible: [];
    sector: [];
    actividad: [];
    TaskSet1: [];
    TaskSet2: [];  
  }

interface dataNew {
  count: Number;
  next: String;
  results: [];
};

interface DD{
    status?: string,
    ordering?: string,
    wc?: string,
    page?: string,
    page_size?: string,
    raiting?: string,
    id_excluded?: string,
    search?: string,
    concessionaire__in?: string,
    created_end_date?: string,
    created_start_date?: string,
    source__channel_id__in?: string,
    source__origin_id__in?: string,
    status__in?: string,
    tasks__media__in?: string,
    tasks__type__in?: string,
    user_id__in?: string,
    vehicles__brand_model__in?: string,
    vehicle_model__id?: string,
}


@Injectable({
  providedIn: 'root'
})
export class ServiceNuevoService {
  // https://sail.artificialintelligencelead.com/api/vehicles_brand/?page_size=all&search=
  // public marca;
  // https://sail.artificialintelligencelead.com/api/vehicles_model/?brand__id=marcaId&page_size=50&search=
  // public modelo;
  // https://sail.artificialintelligencelead.com/api/vehicles_version/?page_size=50&search=&vehicle_model__id=1
  // public version;
  // https://sail.artificialintelligencelead.com/api/gas_type/
  // public combustible;
  // https://sail.artificialintelligencelead.com/api/business_sector/?page_size=50&search=
  // public sector;
  // https://sail.artificialintelligencelead.com/api/business_activity/?page_size=50&search=&sector__id=4
  // public actividad;
  // https://sail.artificialintelligencelead.com/api/task/options/?is_traking_task=false&page=all
  // public TaskSet1;
  // https://sail.artificialintelligencelead.com/api/task/options/?is_traking_task=true&page=all
  // public TaskSet2;

  // public DATA__NEW = {} as dataNewObservable;
  public DATA__NEW: dataNew[]= [];
   
  public setting_res$: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) { 
    this.setting_res$ = new BehaviorSubject({});
  }

  // https://sail.artificialintelligencelead.com/api/lead_col/?status=new&id_excluded=0&ordering=created&page_size=10&with_concession=true
  // https://sail.artificialintelligencelead.com/api/lead_col/?status=attended&id_excluded=0&ordering=created&page_size=10&with_concession=true
  // https://sail.artificialintelligencelead.com/api/lead_col/?status=commercial_management&id_excluded=0&ordering=lead_task_date&page_size=10&with_concession=true
  // https://sail.artificialintelligencelead.com/api/lead_col/?status=tracing&id_excluded=0&ordering=lead_task_date&page_size=10&with_concession=true
  // https://sail.artificialintelligencelead.com/api/lead_col/?status=end&id_excluded=0&page_size=10&with_concession=true

  // https://sail.artificialintelligencelead.com/api/lead_col/?status=new&id_excluded=0&ordering=created&page_size=10&with_concession=true
  // https://sail.artificialintelligencelead.com/api/lead_col/?status=attended&id_excluded=0&ordering=created&page_size=10&with_concession=true
  // https://sail.artificialintelligencelead.com/api/lead_col/?status=commercial_management&id_excluded=0&ordering=lead_task_date&page_size=10&with_concession=true
  // https://sail.artificialintelligencelead.com/api/lead_col/?status=tracing&id_excluded=0&ordering=lead_task_date&page_size=10&with_concession=true
  // https://sail.artificialintelligencelead.com/api/lead_col/?status=end&id_excluded=0&page_size=10&with_concession=true


  public getParamsDinamica(
    // data: {
    //   status?: string,
    //   ordering?: string,
    //   wc?: string,
    //   page?: string,
    //   page_size?: string,
    //   raiting?: string,
    //   id_excluded?: string,
    //   search?: string,
    //   concessionaire__in?: string,
    //   created_end_date?: string,
    //   created_start_date?: string,
    //   source__channel_id__in?: string,
    //   source__origin_id__in?: string,
    //   status__in?: string,
    //   tasks__media__in?: string,
    //   tasks__type__in?: string,
    //   user_id__in?: string,
    //   vehicles__brand_model__in?: string,
    //   vehicle_model__id?: string,
    // },
    data: DD,
    url_accion: string
  ){
    let params = new HttpParams();

    if (data.status !== undefined) {
    params = params.append('status', data.status);
    }
    if (data.ordering !== undefined) {
      params = params.append('ordering', data.ordering);
    }
    if (data.wc !== undefined) {
      params = params.append('with_concession', data.wc);
    }
    if (data.page !== undefined) {
      params = params.append('page', data.page);
    }
    if (data.page_size !== undefined) {
      params = params.append('page_size', data.page_size);
    }
    if (data.raiting !== undefined) {
      params = params.append('raiting', data.raiting);
    }
    if (data.search !== undefined) {
      params = params.append('search', data.search);
    }
    if (data.concessionaire__in !== undefined) {
      params = params.append('concessionaire__in', data.concessionaire__in);
    }
    if (data.created_end_date !== undefined) {
      params = params.append('created_end_date', data.created_end_date);
    }
    if (data.created_start_date !== undefined) {
      params = params.append('created_start_date', data.created_start_date);
    }
    if (data.source__channel_id__in !== undefined) {
      params = params.append('source__channel_id__in', data.source__channel_id__in);
    }
    if (data.source__origin_id__in !== undefined) {
      params = params.append('source__origin_id__in', data.source__origin_id__in);
    }
    if (data.status__in !== undefined) {
      params = params.append('status__in', data.status__in);
    }
    if (data.tasks__media__in !== undefined) {
      params = params.append('tasks__media__in', data.tasks__media__in);
    }
    if (data.tasks__type__in !== undefined) {
      params = params.append('tasks__type__in', data.tasks__type__in);
    }
    if (data.user_id__in !== undefined) {
      params = params.append('user_id__in', data.user_id__in);
    }
    if (data.id_excluded !== undefined) {
      params = params.append('id_excluded', data.id_excluded);
    }
    if (data.vehicles__brand_model__in !== undefined) {
      params = params.append('vehicles__brand_model__in', data.vehicles__brand_model__in);
    }
    if (data.vehicle_model__id !== undefined) {
      params = params.append('vehicle_model__id', data.vehicle_model__id);
    }

    // let baseURL = '/API_BASE/lead_col/';
    let baseURL = '/API_BASE/' + url_accion;
    let fullURL = `${baseURL}?${params.toString()}`;
    console.log(fullURL)

    return this._httpClient.get(baseURL, { params: params });
  }


  solicitaDatoBase(url: string): Observable<any> {
      return this._httpClient.get(url);
    }

  /**
  * Get rows
  */
    getDataTableRows(): Promise<any[]> {
      return new Promise((resolve, reject) => {
        this._httpClient.get('api/datatable-rows').subscribe((response: any) => {
          // console.log(response);
          // this.rows = response;
          // this.onDatatablessChanged.next(this.rows);
          resolve(response);
        }, reject);
      });
    }
  
  /**
   * Get Setters
   */
    setterNuevo(URL_Dinamica: string, posicionArray: string, dataPedido?: {}): Promise<any[]> {
      return new Promise((resolve, reject) => {
        this.getParamsDinamica(dataPedido, URL_Dinamica).subscribe((response: any) => {
        // this.getParamsDinamica( { search: "", page_size: "all" }, "vehicles_brand/").subscribe((response: dataNew) => {
          console.log(response);
          // this.DATA__NEW = { [posicionArray] : {response} };
          this.DATA__NEW[posicionArray] = {};
          this.DATA__NEW[posicionArray] = response.results;
          this.setting_res$.next(this.DATA__NEW);
          
          console.log(this.DATA__NEW);
          resolve(response.results);
        }, reject);
      });
    }
  
  /**
   * Llamar a seter de forma manual
   */

    llamarSetterManual(){
      console.log("Se activa llamar setter");
      this.setterNuevo("vehicles_brand/", "marca", { search: "", page_size: "all" }),
      this.setterNuevo("gas_type/", "combustible", {});
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
        Promise.all(
          [
            // this.getDataTableRows(),
            this.setterNuevo("vehicles_brand/", "marca", {search: "", page_size: "all"}),
            this.setterNuevo("vehicles_brand/", "modelo", {page_size:"all", search: ""}),
            this.setterNuevo("vehicles_version/", "version", {page_size:"50", search:"", vehicle_model__id:"1"}),
            // this.setterNuevo("gas_type/", "combustible"),
            // this.setterNuevo("vehicles_brand/?page_size=all&search=", "sector"),
            this.setterNuevo("business_activity/?page_size=50&search=&sector__id=4", "actividad", {}),
            // this.setterNuevo("task/options/?is_traking_task=false&page=all", "TaskSet1"),
            // this.setterNuevo("task/options/?is_traking_task=true&page=all", "TaskSet2"),
          ]).then(res => {
          resolve(res);
        }, reject);
      });
    }
}


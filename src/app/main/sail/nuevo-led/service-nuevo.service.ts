import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceNuevoService {

  // https://sail.artificialintelligencelead.com/api/vehicles_brand/?page_size=all&search=
  public marca;
  // https://sail.artificialintelligencelead.com/api/vehicles_model/?brand__id=marcaId&page_size=50&search=
  public modelo;
  // https://sail.artificialintelligencelead.com/api/vehicles_version/?page_size=50&search=&vehicle_model__id=1
  public version;


  // https://sail.artificialintelligencelead.com/api/gas_type/
  public combustible;
  // https://sail.artificialintelligencelead.com/api/business_sector/?page_size=50&search=
  public sector;
  // https://sail.artificialintelligencelead.com/api/business_activity/?page_size=50&search=&sector__id=4
  public actividad;
  
  constructor(private _httpClient: HttpClient) { }

  // https://sail.artificialintelligencelead.com/api/task/options/?is_traking_task=false&page=all
  // https://sail.artificialintelligencelead.com/api/task/options/?is_traking_task=true&page=all

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
     * Get rows
     */
    getDataTableRows2(): Promise<any[]> {
      return new Promise((resolve, reject) => {
        this._httpClient.get('/API_BASE/netelip/call_manager/').subscribe((response: any) => {
          // console.log(response);
          // this.llamadas = response;
          // this.cambiosLlamadas.next(this.llamadas);
          // resolve(this.llamadas);
          resolve(response);
        }, reject);
      });
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
        Promise.all([this.getDataTableRows(), this.getDataTableRows2()]).then(res => {
          resolve(res);
        }, reject);
      });
    }





}

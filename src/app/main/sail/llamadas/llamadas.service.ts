import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DatatablesServiceLlamadas implements Resolve<any> {
    rows: any;
    onDatatablessChanged: BehaviorSubject<any>;

    llamadas: any;
    cambiosLlamadas: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        this.onDatatablessChanged = new BehaviorSubject({});
        this.cambiosLlamadas = new BehaviorSubject({});
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

    /**
     * Get rows
     */
    getDataTableRows(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/datatable-rows').subscribe((response: any) => {
                console.log(response);
                this.rows = response;
                this.onDatatablessChanged.next(this.rows);
                resolve(this.rows);
            }, reject);
        });
    }
    /**
     * Get rows
     */
    getDataTableRows2(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('/API_BASE/netelip/call_manager/').subscribe((response: any) => {
                console.log(response);
                this.llamadas = response;
                this.cambiosLlamadas.next(this.llamadas);
                resolve(this.llamadas);
            }, reject);
        });
    }





    
}



//Peticiones

// Curret_USER de auth service: https://sail.artificialintelligencelead.com/api/user/current_user/
// GET: https://sail.artificialintelligencelead.com/api/netelip/call_manager/
// Peticion WS : wss://sail.artificialintelligencelead.com/websocket/netelip/admin/
// Repite GET: https://sail.artificialintelligencelead.com/api/netelip/call_manager/

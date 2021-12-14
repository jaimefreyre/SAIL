import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DatatablesServiceLlamadas implements Resolve<any> {
    rows: any;
    onDatatablessChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        this.onDatatablessChanged = new BehaviorSubject({});
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
            Promise.all([this.getDataTableRows()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get rows
     */
    getDataTableRows(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/datatable-rows').subscribe((response: any) => {
                this.rows = response;
                this.onDatatablessChanged.next(this.rows);
                resolve(this.rows);
            }, reject);
        });
    }
}



//Peticiones

// Curret_USER de auth service: https://sail.artificialintelligencelead.com/api/user/current_user/
// GET: https://sail.artificialintelligencelead.com/api/netelip/call_manager/
// Peticion WS : wss://sail.artificialintelligencelead.com/websocket/netelip/admin/
// Repite GET: https://sail.artificialintelligencelead.com/api/netelip/call_manager/

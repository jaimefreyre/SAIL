// import { Component, OnInit, ViewEncapsulation, ViewChild, Renderer2  } from '@angular/core';
import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild} from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable, Subscription, of } from 'rxjs';
import { ajax } from "rxjs/ajax";

  


import { CoreConfigService } from '@core/services/config.service';

import { colors } from 'app/colors.const';
import { User } from 'app/auth/models';
import { UserService } from 'app/auth/service';
import { DashboardServiceSail } from 'app/main/sail/dashboard_sail/dashboard.service';
// import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


interface ListaLeads {
  count: Number;
  next: String;
  results: [Leads];
};

interface Leads {
  id: Number;
  score: Number;
  vehicles_names: [];
  client_name: any;
  client_surname?: any;
  client_phone: any;
  channel: any;
  origin: any;
  result: String;
  user_data: any;

}
  //   id": 24,
// "score": "4",
//   "vehicles_names": [
//     "AUDI A4 2.0 TDI 150cv S line edition 4p"
//   ],
//     "client_name": "Dragomir",
//       "client_surname": null,
//         "client_business_name": null,
//           "client_phone": "+34603332809",
//             "channel": "phone",
//               "origin": "https://sail.artificialintelligencelead.com/media/temp_fMtH9Qu.png",
//                 "result": "negative",
//                   "result_reason": null,
//                     "user": 20,
//                       "user_data": {
//                           "id": 20,
//                             "first_name": "JOAQUÍN",
//                               "last_name": "SOSA",
//                                 "phone": "",
//                                   "username": "info.madrid@hrmotor.com",
//                                     "email": "info.madrid@hrmotor.com",
//                                       "is_online": false,
//                                         "lost_calls": false,
//                                           "emails_received": false
//                         },
//                   "last_lead_action": null,
//                     "actions_number": 0,
//                       "last_task": {
//                     "type": null,
//                       "subtype": "",
//                         "description": "",
//                           "media": null,
//                             "planified_realization_date": null,
//                               "planified_tracking_date": null,
//                                 "realization_date": null,
//                                   "realization_date_check": false,
//                                     "tracking_date_check": false,
//                                       "appraisal": {
//                       "lead": null,
//                         "brand": "",
//                           "model": "",
//                             "version": "",
//                               "km": "",
//                                 "status": "",
//                                   "features": "",
//                                     "circulation_date": null,
//                                       "evaluation_vo_price": null,
//                                         "total_vehicles": null,
//                                           "total_comercial_vehicles": null,
//                                             "total_tourism_vehicles": null,
//                                               "fleet_notes": "",
//                                                 "license_plate": "",
//                                                   "buy_date": null,
//                                                     "registration_date": null,
//                                                       "last_mechanic_date": null,
//                                                         "cv": null,
//                                                           "is_finance": false
//                     },
//                     "author": null,
//                       "is_traking_task": false
//                   },
//                   "lead_managements_data": [
//                     {
//                       "id": 10708,
//                       "message": "Lead cerrado",
//                       "status": "end",
//                       "event": "lead_end",
//                       "user_data": {
//                         "id": 20,
//                         "first_name": "JOAQUÍN",
//                         "last_name": "SOSA",
//                         "phone": "",
//                         "username": "info.madrid@hrmotor.com",
//                         "email": "info.madrid@hrmotor.com",
//                         "is_online": false,
//                         "lost_calls": false,
//                         "emails_received": false
//                       },
//                       "created": "2020-06-26T11:51:15.723104+02:00"
//                     },
//             };  



@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnalyticsComponentSail implements OnInit {
  // Decorator
  @ViewChild('gainedChartRef') gainedChartRef: any;  

  // Public
  public data: any;
  public loading = false;
  
  public currentUser: any;
  apiSailSubscription_current_user: Subscription;
  
  public users: User[] = [];
  public usersBase:any;
  public usersBase$:Observable<any>;
  // public users: any;

  public gainedChartoptions;
  
  public todosVar:boolean = false;
  public miosVar:boolean = false;
  //Public Informacion Sail
  // public leadsObservable: Observable<any>;

  
  //Subscripciones
  public newLeadsArray: ListaLeads;
  apiSailSubscription_nuevo_led: Subscription;
  
  //Observable Ajax
  public datosApi$ = ajax.getJSON("/API_BASE/lead_col/?status=new&ordering=created&page=1&page_size=10&with_concession=true");
  apiSailSubscription_datosApi$: Subscription;


  // Private
  private $primary = '#7367F0';
  private $warning = '#FF9F43';
  private $info = '#00cfe8';
  private $info_light = '#1edec5';
  private $strok_color = '#b9c3cd';
  private $label_color = '#e7eef7';
  private $white = '#fff';
  private $textHeadingColor = '#5e5873';

  /**
   * Constructor
   *
   * @param {UserService} _userService
   * @param {DashboardService} _dashboardService
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreCardModule} _cardModule
   * @param {NgbModal} modalService
   *
   */
  // * @param {Renderer2} renderer
  
  constructor(
    private _userService: UserService,
    private _dashboardService: DashboardServiceSail,
    private _coreConfigService: CoreConfigService,
    private modalService: NgbModal,
    // private renderer: Renderer2
    // private _cardModule: CoreCardModule
  ) {
    // Subscribers Gained chart
    this.gainedChartoptions = {
      chart: {
        height: 100,
        type: 'area',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        }
      },
      colors: [this.$primary],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2.5
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.9,
          opacityFrom: 0.7,
          opacityTo: 0.5,
          stops: [0, 80, 100]
        }
      },
      tooltip: {
        x: { show: false }
      }
    };

    
  }


/**
 *  FUNCIONES SUELTAS
 *  Necesarias para los componentes de Busqueda
 * La tabla de componentes rastrea los datos del api con distintas consultas producidas
 * En la funcion de la linea 251
 * Que suscribe datos de la base
 * en un array recolector
 * Y los muestra en una variable devuelta
 */

  // modal Open Animation Disabled
  modalOpenAD(modalAD) {
    this.modalService.open(modalAD, {
      centered: true,
      windowClass: 'animation-disable',
      animation: false
    });
  }

  // datos Current User
  datos_A1(){
    this.apiSailSubscription_current_user =this._dashboardService.getApiDataUserDirecto().subscribe(
      result => {
        this.iniciaCerrado();
        if (result.code != 200) {
          this.usersBase = result;
          console.log(this.usersBase);
        } else {
          console.log(result)
        }

      },
      error => {
        console.log(<any>error);
      }
    );
    return this.usersBase;
  }
  // datos_API(url:string){
  datos_API(url:string): any{
    this.apiSailSubscription_nuevo_led = this._dashboardService.solicitaDatoBase(url).subscribe(
      result => {
        if (result.code != 200) {
          this.newLeadsArray = result;
          // this.resultado$ = of( result);
          
        } else {
          console.log(result)
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  //Muestra el contenido del LEad resumido al iniciar el componente
  iniciaCerrado(){
    let cajasLeads = document.getElementsByClassName('card-content collapse show');
    let testDivs = Array.prototype.filter.call(cajasLeads, function (cajaLead) {
      cajaLead.classList.remove('show');
      return cajaLead.nodeName === 'DIV';
    });
    console.log(testDivs);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {

    // get the currentUser details from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    if (this.currentUser.token){
      this.datos_A1();
      this.datos_API('/API_BASE/lead_col/?status=new&ordering=created&with_concession=true');
      // this.resultado$.subscribe(iceCream => console.log(iceCream));
      this.apiSailSubscription_datosApi$ = this.datosApi$
        .subscribe(arg => console.log(arg));
      
    }


  }
  
  ngOnDestroy() {
    // acciones de destrucción
    this.apiSailSubscription_current_user.unsubscribe();
    this.apiSailSubscription_nuevo_led.unsubscribe();
    this.apiSailSubscription_datosApi$.unsubscribe();
  }

}

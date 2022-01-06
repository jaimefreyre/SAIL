// import { Component, OnInit, ViewEncapsulation, ViewChild, Renderer2  } from '@angular/core';
import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild} from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable, Subscription, of } from 'rxjs';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  lead_managements_data: [manejo]
}

interface manejo{
  id: Number,
  message: String,
  status: String,
  event: String,
  user_data: userData,
  created: Date 
}

interface userData{
  id: 20,
  first_name: String,
  last_name: String,
  phone: Number,
  username: String,
  email: String,
  is_online: Boolean,
  lost_calls: Boolean,
  emails_received: Boolean
}

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
  
  
  public users: User[] = [];
  public usersBase:any;
  public usersBase$:Observable<any>;
  // public users: any;

  public gainedChartoptions;
  public todosVar:boolean = true;
  public miosVar:boolean = false;
  // public Informacion Sail
  // public leadsObservable: Observable<any>;

  //Informacion
  public newLeadsArray: any;
  public comercialArray: any;
  public atendidosArray: any; 
  public seguimientoArray: any; 
  public pendientesArray: any; 
  public cerradosArray: any; 

  
  //Subscripciones
  apiSailSubscription_lead_Observable$: Subscription;
  apiSailSubscription_current_user: Subscription;
  


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
    private route: ActivatedRoute,
    private router: Router 
  ) {
    
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
  current_user_base(){
    this.apiSailSubscription_current_user =this._dashboardService.getApiDataUserDirecto().subscribe(
      result => {
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
  


  gotoLead(lead: Leads) {
    // const leadId = lead ? lead.id : null;
    this.router.navigate(['/sail/nuevo', lead]);
  }


  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {


    const idLead = this.route.snapshot.paramMap.get('id');

    // get the currentUser details from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    if (this.currentUser.token){
      this.current_user_base();
      // Get the dashboard service data
      this._dashboardService.onApiDataChanged.subscribe(response => {
        this.data = response;
        this.newLeadsArray = response;
        console.log(this.newLeadsArray);
        
        // this.comercialArray
        // this.atendidosArray
        // this.seguimientoArray
        // this.pendientesArray
        // this.cerradosArray
      });
    
    }


  }
  
  ngOnDestroy() {
    // acciones de destrucción
    this.apiSailSubscription_current_user.unsubscribe();
    this.apiSailSubscription_lead_Observable$.unsubscribe();
    
  }

}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { DashboardServiceSail } from 'app/main/sail/dashboard_sail/dashboard.service';
import { ServiceNuevoService } from './service-nuevo.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { Observable, Subscription, of, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-nuevo-led',
  templateUrl: './nuevo-led.component.html',
  styleUrls: ['./nuevo-led.component.scss']
})
export class NuevoLedComponent implements OnInit {


  // public
  public contentHeader: object;
  public TDNameVar;
  public TDEmailVar;
  public TDFirstNameVar;
  public TDLastNameVar;
  public twitterVar;
  public facebookVar;
  public googleVar;
  public linkedinVar;
  public landmarkVar;
  public addressVar;

  //Variable Score
  public score;

  //Select
  public selectMulti = [{ name: 'English' }, { name: 'French' }, { name: 'Spanish' }];
  public selectMultiSelected;
  
  //Suscriptores de llamadas
  Set_Observable$: Subscription;
  public Data;
  
  /**
   * 
   * @param elementoamostrar
   */
  public tp1Form = 0;
  
  
  constructor(
    private modalService: NgbModal, 
    // public dService: DashboardServiceSail, 
    public nService: ServiceNuevoService, 
    private route: ActivatedRoute,
    private router: Router ) { }
    
    // modal Open Srolling Long Content Inside
    modalOpenSLCIM(modalSLCIM) {
      this.modalService.open(modalSLCIM, { scrollable: true });
    }
    //Timeline ReportBasic
    public showReportBasic = true;
    public currentUser: any;
    
    gotoLead(hero: any) {
      const heroId = hero ? hero.id : null;
      this.router.navigate(['/sail/nuevo', { id: heroId }]);
    }
    
    llamarSeter(){
      this.nService.llamarSetterManual();
    }




  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Init
   */
  ngOnInit() {
    const idLead = this.route.snapshot.paramMap.get('id');

    // get the currentUser details from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    if (this.currentUser.token) {
      // this.Set_Observable$ = this.nService.setting_res$.subscribe(response => {
      this.nService.setting_res$.subscribe(response => {
      //   this.Data = response;
      //   // this.newLeadsArray = response["new"];
      //   // this.comercialArray = response["commercial_management"];
      //   // this.atendidosArray = response["attended"];
      //   // this.pendientesArray = response["tracing"];
      //   // this.cerradosArray = response["end"];
      //   console.log(this.Data);
        console.log(response);
      });
    }
  }

  /**
   * On Submit
   */
  onSubmit() {
    return false;
  }


}

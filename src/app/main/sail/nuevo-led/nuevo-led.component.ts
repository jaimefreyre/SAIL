import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { DashboardServiceSail } from 'app/main/sail/dashboard_sail/dashboard.service';
import { ServiceNuevoService, dataNewObservable } from './service-nuevo.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { Observable, Subscription, of, BehaviorSubject } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  public Configuraciones$: Observable<any>;
  public Data;
  
  /**
   * 
   * @param elementoamostrar
   */
  public tp1Form = 0;
  
  public cargandoSet = false;

  public consecionarios = [
    { id: 1, name: 'Python' },
    { id: 2, name: 'Node Js' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'PHP', disabled: true },
    { id: 5, name: 'Django' },
    { id: 6, name: 'Angular' },
    { id: 7, name: 'Vue' },
    { id: 8, name: 'ReactJs' },
  ];
  public selected = [
    { id: 2, name: 'Node Js' },
    { id: 8, name: 'ReactJs' }
  ];

  public itemsSelect = [
    { id: 1, name: 'Python', image: 'python.jpg' },
    { id: 2, name: 'Node Js', image: 'nodejs.jpg' },
    { id: 3, name: 'Java', image: 'java.jpg' },
    { id: 4, name: 'PHP', image: 'php.jpg', disabled: true },
    { id: 5, name: 'Django', image: 'django.jpg' },
    { id: 6, name: 'Angular', image: 'angular.jpg' },
    { id: 7, name: 'Vue', image: 'vue.jpg' },
    { id: 8, name: 'ReactJs', image: 'reactjs.jpg' },
  ];
  public selectedKeys = [2, 8];


  public filtro = this.fb.group({
    search: ['', [Validators.required, Validators.minLength(5)]],
    wc: [''],
    created_start_date: [''],
    created_end_date: [''],
    raiting: [''],
    status: [''],
    user_id__in: [''],
    concessionaire__in: [''],
    source__origin_id__in: [''],
    source__channel_id__in: [''],
    status__in: [''],
    medio: [''],
    marca: [''],
    vehicles__brand_model__in: [''],
    version: [''],
    tasks__type__in: [''],
    tasks__media__in: ['']
  });


  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    // return item.name.toLowerCase().indexOf(term) > -1 || item.gender.toLowerCase() === term;
    return item.name.toLowerCase().indexOf(term) > -1;
  }

  constructor(
    private modalService: NgbModal, 
    // public dService: DashboardServiceSail, 
    public nService: ServiceNuevoService, 
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder  ) { }
    
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
    console.log(this.filtro);
    this.nService.llamarSetterManual();
  }

  buscarApi(searchInput :string, URL_1:string, INDEX:string){
    // this.nService.llamarSet_("concessionaire/", "consecionario", { search: searchInput, page_size: "all"})
    this.nService.llamarSet_(URL_1, INDEX, { search: searchInput, page_size: "all"});
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
      this.Set_Observable$ = this.nService.setting_res$.subscribe(response => {
      // this.nService.setting_res$.subscribe(response => {
          this.Configuraciones$ = response;
      //   // this.newLeadsArray = response["new"];
      //   // this.comercialArray = response["commercial_management"];
      //   // this.atendidosArray = response["attended"];
      //   // this.pendientesArray = response["tracing"];
      //   // this.cerradosArray = response["end"];
      //   console.log(this.Data);
        console.log(this.Configuraciones$);
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

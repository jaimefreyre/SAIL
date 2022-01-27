import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { DashboardServiceSail } from 'app/main/sail/dashboard_sail/dashboard.service';
import { ServiceNuevoService, dataNewObservable, dataNew } from './service-nuevo.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { concat, Observable, Subscription, Subject,  of, BehaviorSubject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map } from 'rxjs/operators';

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
  public Configuraciones$: Observable<dataNewObservable[]>;
  public Data;
  
  /**
   * 
   * @param elementoamostrar
   */
  public tp1Form = 0;
  
  public cargandoSet = false;
  
  public consecionario: Observable<dataNew[]>;

  // public consecionario = {
  //   count:2,
  //   next:"",
  //   results :[
  //       { id: 1, name: 'Python' },
  //       { id: 2, name: 'Node Js' },
  //       { id: 3, name: 'Java' },
  //       { id: 4, name: 'PHP', disabled: true },
  //       { id: 5, name: 'Django' },
  //       { id: 6, name: 'Angular' },
  //       { id: 7, name: 'Vue' },
  //       { id: 8, name: 'ReactJs' },
  //     ]
  // };

  public selected = [
    { id: 2, name: 'Node Js' },
    { id: 8, name: 'ReactJs' }
  ];




  

//Dato consecionarios
// {  address: "CARMEN DE BURGOS 9"
//   appraisal_notes: null
//   concession_phone: "+34655550550"
//   date_notes: null
//   financing_notes: null
//   hubspot_api_key: null
//   hubspot_id: null
//   id: 1
//   latitude: null
//   longitude: null
//   mask_c2c: "+34910052918"
//   name: "demo"
//   notes: []
//   notes_data: []
//   related_users: null
//   schedule: "<iframe width=\"600\" height=\"373.5\" src=\"https://app.powerbi.com/view?r=eyJrIjoiNzkyZmNhMWUtOGNlNC00NGQ2LWE5YmItY2JiMDE3YTExYWJjIiwidCI6ImNiODM1OTFjLTBiZjAtNDg3Zi1iM2UzLWM4NzhhMDI3YTEyNiIsImMiOjh9\" frameborder=\"0\" allowFullScreen=\"true\"></iframe>"
//   service_notes: null
//   sources: [{ id: 1, channel: 1, channel_data: { id: 1, slug: "phone", name: "Teléfono" }, data: "+34910000000",… },…]
//   warranty_notes: null
//   web: null
//   web_coches_net: "no activa"
//   work_calendar: null
// }

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


  public DATOSLEADORIGEN = this.fb.group({
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

  public FORMULARIOEMPRESA = this.fb.group({
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

  public FORMULARIOPERSONAL = this.fb.group({
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

  public FORMULARIOPARTICULAR = this.fb.group({
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

  public VEHICULOSOLICITADO = this.fb.group({
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

  public VEHICULOACTUAL = this.fb.group({
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

  public ACCIONESPROGRAMADAS = this.fb.group({
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

  public NOTASGRAL = this.fb.group({
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

  llamarSeter() {
    console.log(this.DATOSLEADORIGEN);
    this.nService.llamarSetterManual();
  }

  buscarApi(searchInput: string, URL_1: string, INDEX: string) {
    // this.nService.llamarSet_("concessionaire/", "consecionario", { search: searchInput, page_size: "all"})
    this.nService.llamarSet_(URL_1, INDEX, { search: searchInput, page_size: "all" });
    console.log(this.Configuraciones$ );
  }

  buscarConsecionaria(term: string, item: any){
    this.buscarApi(term, 'concessionaire /', 'consecionario');
    // this.nService.llamarSet_("concessionaire/", "consecionario", { search: term, page_size: "all"});
    term = term.toLowerCase();
    return item.name.toLowerCase().indexOf(term) > -1;
  }

  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
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
 


  //Autoselect
  public dataSelect_$: Observable<any>;
  public dataSelect_Loading = false;
  public dataSelect_Input$ = new Subject<any>();
  public selectedPersons: dataNew[] = <any>[{ count: 200, results: [] }];

  trackByFn(item: any) {
      return item.id;
  };

  private loaddataSelect_() {
    this.dataSelect_$ = concat(
      of([]), // default items
      this.dataSelect_Input$.pipe(
        distinctUntilChanged(),
        debounceTime(300),
        tap(() => this.dataSelect_Loading = true),
        switchMap(term => this.nService.datoSelect(term, 'concessionaire/').pipe(
          catchError(() => of([])), // empty list on error
          // tap(() => this.dataSelect_Loading = false)
          map(n => {
            // n = n.results;
            console.log(n);
            this.dataSelect_Loading = false;
            // return of(n)
            return n
          })
        ))
      )
    );
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
      this.loaddataSelect_();
      // this.buscarApi("a", 'concessionaire/', 'consecionario');
      this.Set_Observable$ = this.nService.setting_res$.subscribe(response => {
        // this.nService.setting_res$.subscribe(response => {
        this.Configuraciones$ = response;
        this.consecionario = this.Configuraciones$["consecionario"];
        // this.newLeadsArray = response["new"];
        // this.comercialArray = response["commercial_management"];
        // this.atendidosArray = response["attended"];
        // this.pendientesArray = response["tracing"];
        // this.cerradosArray = response["end"];
        // console.log(this.Data);
        // console.log(this.Configuraciones$);
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

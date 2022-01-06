 constructor(
    private _userService: UserService,
    private _dashboardService: DashboardServiceSail,
    private _coreConfigService: CoreConfigService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router 
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
  current_user_base(){
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
  
  // Nuevos Leads
  public newLeadsArray: ListaLeads;
  apiSailSubscription_nuevo_led: Subscription;
  datos_API_leadNew(url:string): any{
    this.apiSailSubscription_nuevo_led = this._dashboardService.solicitaDatoBase(url).subscribe(
      result => {
        if (result.code != 200) {
          this.newLeadsArray = result;
          console.log(this.newLeadsArray);
          
        } else {
          console.log(result)
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  
  // Manejados comercial
  public comercialArray: ListaLeads;
  apiSailSubscription_comercial: Subscription;
  datos_API_comercial(url:string): any{
    this.apiSailSubscription_nuevo_led = this._dashboardService.solicitaDatoBase(url).subscribe(
      result => {
        if (result.code != 200) {
          this.comercialArray = result;
          console.log(this.comercialArray);
          
        } else {
          console.log(result)
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  
  // Atendidos
  public atendidosArray: ListaLeads;
  apiSailSubscription_atendidos: Subscription;
  datos_API_atendidos(url:string): any{
    this.apiSailSubscription_nuevo_led = this._dashboardService.solicitaDatoBase(url).subscribe(
      result => {
        if (result.code != 200) {
          this.atendidosArray = result;
          console.log(this.atendidosArray);
          
        } else {
          console.log(result)
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  
  // Seguimiento Traicing
  public seguimientoArray: ListaLeads;
  apiSailSubscription_seguimiento: Subscription;
  datos_API_seguimiento(url:string): any{
    this.apiSailSubscription_nuevo_led = this._dashboardService.solicitaDatoBase(url).subscribe(
      result => {
        if (result.code != 200) {
          this.seguimientoArray = result;
          console.log(this.seguimientoArray);
          
        } else {
          console.log(result)
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  
  // Pendientes
  public pendientesArray: ListaLeads;
  apiSailSubscription_pendientes: Subscription;
  datos_API_pendientes(url:string): any{
    this.apiSailSubscription_nuevo_led = this._dashboardService.solicitaDatoBase(url).subscribe(
      result => {
        if (result.code != 200) {
          this.pendientesArray = result;
          console.log(this.pendientesArray);
          
        } else {
          console.log(result)
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  // cerrados
  public cerradosArray: ListaLeads;
  apiSailSubscription_cerrados: Subscription;
  datos_API_cerrados(url:string): any{
    this.apiSailSubscription_nuevo_led = this._dashboardService.solicitaDatoBase(url).subscribe(
      result => {
        if (result.code != 200) {
          this.cerradosArray = result;
          console.log(this.cerradosArray);
          
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
    let cajasLeads = document.getElementsByClassName('show');
    let testDivs = Array.prototype.filter.call(cajasLeads, function (cajaLead) {
      cajaLead.classList.remove('show');
      return cajaLead.nodeName === 'DIV';
    });
    console.log(testDivs);
  }

  public search: string;
  pedirSoloFiltrado(){
    if (this.todosVar){
      this.pedirSoloUsuario();
    }
    else{
      this.pedirTodos();
    }
  }

  pedirSoloUsuario(){
    this.todosVar = false;
    if(this.search){
      this.datos_API_leadNew('/API_BASE/lead_col/?status=new&ordering=created&page=1&page_size=10&search=' + this.search);
      this.datos_API_comercial('/API_BASE/lead_col/?status=commercial_management&ordering=created&page=1&page_size=10&search=' + this.search);
      this.datos_API_atendidos('/API_BASE/lead_col/?status=attended&ordering=created&page=1&page_size=10&search=' + this.search);
      this.datos_API_seguimiento('/API_BASE/lead_col/?status=tracing&ordering=lead_task_date&page=1&page_size=10&search=' + this.search);
      
      this.datos_API_pendientes('/API_BASE/lead_col/?ordering=lead_task_date&page=2&page_size=10&status=tracing&search=' + this.search);
      this.datos_API_cerrados('/API_BASE/lead_col/?page=2&page_size=10&status=end&search=' + this.search);
    }
    else{
      this.datos_API_leadNew('/API_BASE/lead_col/?status=new&ordering=created&page=1&page_size=10');
      this.datos_API_comercial('/API_BASE/lead_col/?status=commercial_management&ordering=created&page=1&page_size=10');
      this.datos_API_atendidos('/API_BASE/lead_col/?status=attended&ordering=created&page=1&page_size=10');
      this.datos_API_seguimiento('/API_BASE/lead_col/?status=tracing&ordering=lead_task_date&page=1&page_size=10');
      this.datos_API_pendientes('/API_BASE/lead_col/?ordering=lead_task_date&page=2&page_size=10&status=tracing');
      this.datos_API_cerrados('/API_BASE/lead_col/?page=2&page_size=10&status=end');
    }
  }

  pedirTodos(){
    this.todosVar = true;
    if(this.search){
      this.datos_API_leadNew('/API_BASE/lead_col/?status=new&ordering=created&with_concession=true&search=' + this.search);
      this.datos_API_comercial('/API_BASE/lead_col/?status=commercial_management&ordering=created&page=1&page_size=10&with_concession=true&search=' + this.search);
      this.datos_API_atendidos('/API_BASE/lead_col/?status=attended&ordering=created&page=1&page_size=10&with_concession=true&search=' + this.search);
      this.datos_API_seguimiento('/API_BASE/lead_col/?status=tracing&ordering=lead_task_date&page=1&page_size=10&with_concession=true&search=' + this.search);
      this.datos_API_pendientes('/API_BASE/lead_col/?ordering=lead_task_date&page=2&page_size=10&status=tracing&with_concession=true&search=' + this.search);
      this.datos_API_cerrados('/API_BASE/lead_col/?page=2&page_size=10&status=end&with_concession=true&search=' + this.search);
    }
    else{
      this.datos_API_leadNew('/API_BASE/lead_col/?status=new&ordering=created&with_concession=true');
      this.datos_API_comercial('/API_BASE/lead_col/?status=commercial_management&ordering=created&page=1&page_size=10&with_concession=true');
      this.datos_API_atendidos('/API_BASE/lead_col/?status=attended&ordering=created&page=1&page_size=10&with_concession=true');
      this.datos_API_seguimiento('/API_BASE/lead_col/?status=tracing&ordering=lead_task_date&page=1&page_size=10&with_concession=true');
      this.datos_API_pendientes('/API_BASE/lead_col/?ordering=lead_task_date&page=2&page_size=10&status=tracing&with_concession=true');
      this.datos_API_cerrados('/API_BASE/lead_col/?page=2&page_size=10&status=end&with_concession=true');
    }
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
      this.datos_API_leadNew('/API_BASE/lead_col/?status=new&ordering=created&with_concession=true');
      this.datos_API_comercial('/API_BASE/lead_col/?status=commercial_management&ordering=created&page=1&page_size=10&with_concession=true');
      this.datos_API_atendidos('/API_BASE/lead_col/?status=attended&ordering=created&page=1&page_size=10&with_concession=true');
      this.datos_API_seguimiento('/API_BASE/lead_col/?status=tracing&ordering=lead_task_date&page=1&page_size=10&with_concession=true');
      this.datos_API_pendientes('/API_BASE/lead_col/?ordering=lead_task_date&page=2&page_size=10&status=tracing&with_concession=true');
      this.datos_API_cerrados('/API_BASE/lead_col/?page=2&page_size=10&status=end&with_concession=true');
      
      this.apiSailSubscription_lead_Observable$ = this._dashboardService
        .solicitaDatoBaseFuncion('/API_BASE/lead_col/?status=attended&ordering=created&page=1&page_size=10&with_concession=true')
        .subscribe(
            (next:any)=>(
              console.log(next)
            ),
            (error:any)=>(
              console.log(error)
            )
        );
    }


  }
  
  ngOnDestroy() {
    // acciones de destrucción
    this.apiSailSubscription_current_user.unsubscribe();
    this.apiSailSubscription_nuevo_led.unsubscribe();
    this.apiSailSubscription_lead_Observable$.unsubscribe();
    
  }

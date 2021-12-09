// import { Component, OnInit, ViewEncapsulation, ViewChild, Renderer2  } from '@angular/core';
import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';

import { colors } from 'app/colors.const';
import { User } from 'app/auth/models';
import { UserService } from 'app/auth/service';
import { DashboardServiceSail } from 'app/main/sail/dashboard_sail/dashboard.service';
// import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnalyticsComponentSail implements OnInit {
  // Decorator
  @ViewChild('gainedChartRef') gainedChartRef: any;
  @ViewChild('orderChartRef') orderChartRef: any;
  @ViewChild('avgSessionChartRef') avgSessionChartRef: any;
  @ViewChild('supportChartRef') supportChartRef: any;
  @ViewChild('salesChartRef') salesChartRef: any;

  // Public
  public data: any;
  public currentUser: any;
  public loading = false;
  public users: User[] = [];
  public usersBase:any;
  // public users: any;
  public gainedChartoptions;
  public orderChartoptions;
  public avgsessionChartoptions;
  public supportChartoptions;
  public salesChartoptions;
  public todosVar:boolean = false;
  public miosVar:boolean = false;
  //Public Informacion Sail
  public leads: any;
  public leadsArray: [];
  public leadsObservable: Observable<any>;

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

    // Order Received Chart
    this.orderChartoptions = {
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
      colors: [this.$warning],
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
      series: [
        {
          name: 'Orders',
          data: [10, 15, 8, 15, 7, 12, 8]
        }
      ],
      tooltip: {
        x: { show: false }
      }
    };

    // Average Session Chart
    this.avgsessionChartoptions = {
      chart: {
        type: 'bar',
        height: 200,
        sparkline: { enabled: true },
        toolbar: { show: false }
      },
      colors: [
        this.$label_color,
        this.$label_color,
        this.$primary,
        this.$label_color,
        this.$label_color,
        this.$label_color
      ],
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
          endingShape: 'rounded'
        }
      },
      tooltip: {
        x: { show: false }
      }
    };

    // Support Tracker Chart
    this.supportChartoptions = {
      chart: {
        height: 290,
        type: 'radialBar',
        sparkline: {
          enabled: false
        }
      },
      plotOptions: {
        radialBar: {
          offsetY: 20,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '65%'
          },
          track: {
            background: this.$white,
            strokeWidth: '100%'
          },
          dataLabels: {
            name: {
              offsetY: -5,
              color: this.$textHeadingColor,
              fontSize: '1rem'
            },
            value: {
              offsetY: 15,
              color: this.$textHeadingColor,
              fontSize: '1.714rem'
            }
          }
        }
      },
      colors: [colors.solid.danger],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: [colors.solid.primary],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 8
      },
      labels: ['Completed Tickets']
    };

    // Sales Chart
    this.salesChartoptions = {
      chart: {
        height: 330,
        type: 'radar',
        dropShadow: {
          enabled: true,
          blur: 8,
          left: 1,
          top: 1,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      stroke: {
        width: 0
      },
      colors: [this.$primary, this.$info],
      plotOptions: {
        radar: {
          polygons: {
            connectorColors: 'transparent'
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#9f8ed7', this.$info_light],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 0
      },
      legend: {
        show: false
      },
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      dataLabels: {
        style: {
          colors: [
            this.$strok_color,
            this.$strok_color,
            this.$strok_color,
            this.$strok_color,
            this.$strok_color,
            this.$strok_color
          ]
        }
      },
      yaxis: {
        show: false
      }
    };


    
  }

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
    this._dashboardService.getApiDataUserDirecto().subscribe(
      result => {
        this.iniciaCerrado();
        if (result.code != 200) {
          // console.log(result);
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
  }

  // datos_API(url:string){
  datos_API(url:string): any{
    this._dashboardService.solicitaDatoBase(url).subscribe(
      result => {
        if (result.code != 200) {
          this.leadsArray = result;
          console.log(this.leadsArray);
          return result

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
      this.leads = this.datos_API('/API_BASE/lead_col/?status=new&ordering=created&with_concession=true');
      // this.iniciaCerrado();
    }
    /**
     * Get the secure api service (based on user role) (Admin Only secure API)
     * For example purpose
     */
    this.loading = true;
    this._userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.loading = false;
        this.users = users;
      });

    // Get the dashboard service data
    // this._dashboardService.onApiDataUserChanged.subscribe(response => {
    //   console.log('se activa el observable sobre current_user')
    //   this.usersBase = response;
    //   console.log(response)
    //   console.log(this.usersBase)
    // });

    // Get the dashboard service data
    this._dashboardService.onApiDataChanged.subscribe(response => {
      this.data = response;
    });


   }
}

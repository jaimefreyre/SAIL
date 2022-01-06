import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardServiceSail } from 'app/main/sail/dashboard_sail/dashboard.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

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


  /**
   * 
   * @param elementoamostrar
   */
  public tp1Form = 0;


  gotoLead(hero: any) {
    const heroId = hero ? hero.id : null;
    this.router.navigate(['/sail/nuevo', { id: heroId }]);
  }

  constructor(private modalService: NgbModal, dService: DashboardServiceSail, private route: ActivatedRoute,
    private router: Router ) { }

  // modal Open Srolling Long Content Inside
  modalOpenSLCIM(modalSLCIM) {
    this.modalService.open(modalSLCIM, { scrollable: true });
  }
  //Timeline ReportBasic
  public showReportBasic = true;

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Init
   */
  ngOnInit() {
   

  }


  /**
   * On Submit
   */
  onSubmit() {
    return false;
  }


}

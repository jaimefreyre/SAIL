import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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


  /**
   * On Submit
   */
  onSubmit() {
    return false;
  }

  constructor(private modalService: NgbModal) { }

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



}

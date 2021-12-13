import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { CoreConfigService } from '@core/services/config.service';
import { CoreTranslationService } from '@core/services/translation.service';

import { User } from 'app/auth/models';
import { colors } from 'app/colors.const';
import { AuthenticationService } from 'app/auth/service';
import { DashboardService } from 'app/main/dashboard/dashboard.service';

import { locale as english } from 'app/main/dashboard/i18n/en';
import { locale as french } from 'app/main/dashboard/i18n/fr';
import { locale as german } from 'app/main/dashboard/i18n/de';
import { locale as portuguese } from 'app/main/dashboard/i18n/pt';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceComponent implements OnInit {
  
  public isAdmin: boolean;
  public isClient: boolean;
  public currentUser: any;
  public data: any;

  /**
   * Constructor
   * @param {AuthenticationService} _authenticationService
   * @param {DashboardService} _dashboardService
  
   */
  constructor(
    private _authenticationService: AuthenticationService,
    private _dashboardService: DashboardService
 
  ) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.isAdmin = this._authenticationService.isAdmin;
    this.isClient = this._authenticationService.isClient;

  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // get the currentUser details from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Get the dashboard service data
    this._dashboardService.onApiDataChanged.subscribe(response => {
      this.data = response;
    });
  }
}

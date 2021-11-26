import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { Ng2FlatpickrModule } from 'ng2-flatpickr';
// import { FaqModule } from 'app/main/pages/faq/faq.module';
import { DashboardSailModule } from './dashboard_sail/dashboard.module';
// import { BlogModule } from './blog/blog.module';
// import { ProfileModule } from './profile/profile.module';
// import { PricingModule } from './pricing/pricing.module';
// import { AccountSettingsModule } from './account-settings/account-settings.module';
// import { AuthenticationModule } from './authentication/authentication.module';
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    Ng2FlatpickrModule,
    // FaqModule,

    DashboardSailModule
    // AuthenticationModule,
    // MiscellaneousModule,
    // PricingModule,
    // BlogModule,
    // ProfileModule,
    // KbModule,
    // AccountSettingsModule
  ],

  providers: []
})
export class SailModule {}

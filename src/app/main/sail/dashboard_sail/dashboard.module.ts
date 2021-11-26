import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AuthGuard } from 'app/auth/helpers';
import { Role } from 'app/auth/models';

import { CoreCommonModule } from '@core/common.module';

import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';
import { InvoiceListService } from 'app/main/apps/invoice/invoice-list/invoice-list.service';

import { DashboardServiceSail } from 'app/main/sail/dashboard_sail/dashboard.service';

import { AnalyticsComponentSail } from 'app/main/sail/dashboard_sail/analytics/analytics.component';
import { EcommerceComponent } from 'app/main/sail/dashboard_sail/ecommerce/ecommerce.component';





const routes = [
  {
    path: 'A',
    component: AnalyticsComponentSail,
    // canActivate: [AuthGuard],
    // data: { roles: [Role.Admin] },
    resolve: {
      css: DashboardServiceSail,
      inv: InvoiceListService
    }
  },
  {
    path: 'E',
    component: EcommerceComponent,
    // canActivate: [AuthGuard],
    resolve: {
      css: DashboardServiceSail
    }
  }
];

@NgModule({
  declarations: [AnalyticsComponentSail, EcommerceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgApexchartsModule,
    InvoiceModule
  ],
  providers: [DashboardServiceSail, InvoiceListService],
  exports: [EcommerceComponent]
})
export class DashboardSailModule {}

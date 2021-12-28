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
import { CalendarModule } from './calendario/calendar.module';
import { LlamadasComponent } from './llamadas/llamadas.component';
import { ContactosComponent } from './contactos/contactos.component';
import { AutomatismosComponent } from './automatismos/automatismos.component';
import { AbmComponent } from './abm/abm.component';
import { NuevoLedComponent } from './nuevo-led/nuevo-led.component';
import { FramesdashComponent } from './framesdash/framesdash.component';
// import { BlogModule } from './blog/blog.module';
// import { ProfileModule } from './profile/profile.module';
// import { PricingModule } from './pricing/pricing.module';
// import { AccountSettingsModule } from './account-settings/account-settings.module';
// import { AuthenticationModule } from './authentication/authentication.module';
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { CsvModule } from '@ctrl/ngx-csv';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatatablesServiceLlamadas } from './llamadas/llamadas.service';

// import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';


import { RouterModule, Routes } from '@angular/router';
import { ConsecionariosComponent } from './consecionarios/consecionarios.component';
import { CanalesComponent } from './canales/canales.component';
import { OrigenesComponent } from './origenes/origenes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
const routes: Routes = [
  {
    path: 'llamadas',
    component: LlamadasComponent
  },
  {
    path: 'contactos',
    component: ContactosComponent
  },
  {
    path: 'automatismos',
    component: AutomatismosComponent
  },
  {
    path: 'abm',
    component: AbmComponent
  },
  {
    path: 'nuevo',
    component: NuevoLedComponent
  },
  {
    path: 'framedash',
    component: FramesdashComponent
  },
];


@NgModule({
  declarations: [LlamadasComponent, ContactosComponent, AutomatismosComponent, AbmComponent, NuevoLedComponent, FramesdashComponent, ConsecionariosComponent, CanalesComponent, OrigenesComponent, UsuariosComponent],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    Ng2FlatpickrModule,
    // FaqModule,
    DashboardSailModule,
    CalendarModule,
    RouterModule.forChild(routes),
    CsvModule,
    NgxDatatableModule,
    // CardSnippetModule
    // AuthenticationModule,
    // MiscellaneousModule,
    // PricingModule,
    // BlogModule,
    // ProfileModule,
    // KbModule,
    // AccountSettingsModule
  ],
  providers: [DatatablesServiceLlamadas]
})
export class SailModule {}

import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { UserService } from 'app/auth/service';
import { DashboardServiceSail } from 'app/main/sail/dashboard_sail/dashboard.service';
import { AuthenticationService } from 'app/auth/service';


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

  constructor(private _userService: UserService,
    private _dashboardService: DashboardServiceSail,
    private _authenticationService: AuthenticationService) { }

  $contactosSubs: Subscription;
  contactosLista: any;
  datos_API_contactos(url: string): any {
    this.$contactosSubs = this._dashboardService.solicitaDatoBase(url).subscribe(
      result => {
        if (result.code != 200) {
          this.contactosLista = result;
          console.log(this.contactosLista);
        } else {
          console.log(result)
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  ngOnInit(): void {
    let cuntUser = this._authenticationService.currentUserValue;
    this.datos_API_contactos("/API_BASE/lead/?user_id__in=" + cuntUser.id)
   
  }

}

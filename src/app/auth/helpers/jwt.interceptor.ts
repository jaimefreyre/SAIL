import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/auth/service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _authenticationService: AuthenticationService) {}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this._authenticationService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    // console.log('Interceptor JWT para ingrear Token: ' + currentUser.token);
    const isApiUrl = request.url.startsWith(environment.apiUrl);  
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          // Authorization: `Bearer ${currentUser.token}`
          Authorization: `Token ${currentUser.token}`,
          Cookie: 'selectedTheme = sail; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=0',
          // DNT: 1,
          Host: 'sail.artificialintelligencelead.com',
          Referer: 'https://sail.artificialintelligencelead.com/leads/board'
        }
      });
    }

    return next.handle(request);
  }
}

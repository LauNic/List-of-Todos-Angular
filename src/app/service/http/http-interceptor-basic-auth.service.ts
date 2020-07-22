import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicAuthService } from './basic-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthService: BasicAuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let basicAuthHeaderString = this.basicAuthService.getLoggedInToken();
    let username = this.basicAuthService.getLoggedInUser();

    if (basicAuthHeaderString && username) {

      request = request.clone({
        setHeaders: {Authorization: basicAuthHeaderString}
      });
    }

    return next.handle(request);
  }

}

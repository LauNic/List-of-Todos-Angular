import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let username = "lau";
    let password = "cuvant";
    let basicAuthHeaderString = "Basic "+ window.btoa(username + ":" + password);

    request = request.clone({
                              setHeaders: {Authorization: basicAuthHeaderString}
                            });

    return next.handle(request);
  }

}

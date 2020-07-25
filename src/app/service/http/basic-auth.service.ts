import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthenticationBean } from './authentication-bean';
import { TODO_API_URL } from '../../app.constants';

export const AUTHENTICATED_USER = "authenticatedUser";
export const TOKEN = "token";

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {

  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService(username: string, password: string) {

    return this.http.post<any>(`${TODO_API_URL}/authenticate`,{username, password})
                    .pipe(map(
                            data => {
                              sessionStorage.setItem(AUTHENTICATED_USER, username);
                              sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
                              return data;
                            }
                    ));
  }

  executeAuthenticationService(username: string, password: string) {

    let basicAuthHeaderString = "Basic "+ window.btoa(username + ":" + password);
    let basicAuthHeader = new HttpHeaders(
      {Authorization: basicAuthHeaderString}
    );

    return this.http.get<AuthenticationBean>(`${TODO_API_URL}/basicauth`, {headers: basicAuthHeader})
                    .pipe(map(
                            data => {
                              sessionStorage.setItem(AUTHENTICATED_USER, username);
                              sessionStorage.setItem(TOKEN, basicAuthHeaderString);
                              return data;
                            }
                    ));
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null)
  }

  getLoggedInUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getLoggedInToken() {
    if(this.getLoggedInUser())
      return sessionStorage.getItem(TOKEN);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

}

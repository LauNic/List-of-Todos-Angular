import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelloWorldBean } from './hello-world-bean';
import { TODO_API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  executeHelloWorldBeanService() {

    return this.http.get<HelloWorldBean>(`${TODO_API_URL}/hello-world-bean`);
  }

  executeHelloWorldServicePathVariable(variable: string) {

    return this.http.get<HelloWorldBean>(`${TODO_API_URL}/hello-world-bean/path-variable/${variable}`);
  }

  // createBasicAuthenticationHttpHeader(): HttpHeaders {
  //   let username = "lau";
  //   let password = "cuvant";
  //   let basicAuthHeaderString = "Basic "+ window.btoa(username + ":" + password);

  //   let basicAuthHeader = new HttpHeaders(
  //     {Authorization: basicAuthHeaderString}
  //   );

  //   return basicAuthHeader;
  // }

}

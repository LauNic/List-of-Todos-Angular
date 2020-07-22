import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelloWorldBean } from './hello-world-bean';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  executeHelloWorldBeanService() {

    return this.http.get<HelloWorldBean>("http://localhost:8080/hello-world-bean");
  }

  executeHelloWorldServicePathVariable(variable: string) {

    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world-bean/path-variable/${variable}`);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthService } from '../service/http/basic-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  errorMessage = "Invalid Credentials";
  invalidLogin = false;

  constructor(private router: Router,
              private authenticatedService: HardcodedAuthenticationService,
              private basicAuthService: BasicAuthService) { }

  ngOnInit(): void {

    console.log("LoginComponent inside onInit isUserLoggedIn", this.authenticatedService.isUserLoggedIn());

    if(this.authenticatedService.isUserLoggedIn()) {

      console.log("LoginComponent inside onInit userLoggedIn", sessionStorage.getItem('authenticatedUser'));
      this.router.navigate(['welcome', sessionStorage.getItem('authenticatedUser')]);
    }

  }

  handleLogin() {

    if(this.authenticatedService.authenticate(this.username, this.password)) {
      // redirect to welcome page
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false;
    }
    else {
      this.invalidLogin = true;
    }
  }

  performBasicAuthentication() {

    this.basicAuthService.executeJWTAuthenticationService(this.username, this.password).subscribe(
      response => {
                    console.log("response:", JSON.stringify(response));
                    this.router.navigate(['welcome', this.username]);
                    this.invalidLogin = false;
                  },
      error =>  {
                    this.handleErrorResponse(error);
                    this.invalidLogin = true;
                }
    );
  }

  handleErrorResponse(error: any): void {
    console.log("error ", error, error.error, error.error.message);
    // this.errorMessage = error.error.message;
  }

}

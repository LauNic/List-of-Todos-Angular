import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

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
              private authenticatedService: HardcodedAuthenticationService) { }

  ngOnInit(): void {

    if(this.authenticatedService.isUserLoggedIn) {
      // console.log("LoginComponent inside onInit userLoggedIn", sessionStorage.getItem('authenticatedUser'));
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

}

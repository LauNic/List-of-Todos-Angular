import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WelcomeDataService } from '../service/data/welcome-data.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name: string = "";
  customWelcomeMessage: string;

  // Activated route
  constructor(private route: ActivatedRoute,
              private dataService: WelcomeDataService,
              public authenticatedService: HardcodedAuthenticationService,
              private router: Router) { }

  ngOnInit(): void {

    if(this.route.snapshot.params['name'] != this.authenticatedService.getLoggedInUser())
    {
      this.router.navigate(['**']);
    }

    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage() {

    this.dataService.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  getWelcomeMessageWithVariable() {

    this.dataService.executeHelloWorldServicePathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleErrorResponse(error: any): void {
    this.customWelcomeMessage = error.error.message;
  }

  handleSuccessfulResponse(response) {
    this.customWelcomeMessage = response.message;
  }

}

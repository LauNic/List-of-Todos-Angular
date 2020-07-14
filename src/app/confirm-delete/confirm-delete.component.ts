import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';


@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  userName: string;
  id: number;
  description: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public authenticatedService: HardcodedAuthenticationService) { }

  ngOnInit(): void {

    if(this.route.snapshot.params['userName'] != this.authenticatedService.getLoggedInUser())
    {
      this.router.navigate(['**']);
    }

    this.userName = this.route.snapshot.params['userName'];
    this.id = this.route.snapshot.params['id'];
    this.description = this.route.snapshot.params['description'];

    console.log("confirmDelete onInit ",this.userName, this.id, this.description);

  }

}

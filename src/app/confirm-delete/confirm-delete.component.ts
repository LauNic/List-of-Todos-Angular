import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { TodoDataService } from '../service/data/todo-data.service';
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
  errorMessage: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private todoService: TodoDataService,
              public authenticatedService: HardcodedAuthenticationService) { }

  ngOnInit(): void {

    if(this.route.snapshot.params['userName'] != this.authenticatedService.getLoggedInUser())
    {
      this.router.navigate(['**']);
    }

    this.userName = this.route.snapshot.params['userName'];
    this.id = this.route.snapshot.params['id'];
    this.description = this.route.snapshot.params['description'];

    // console.log("confirmDelete onInit ",this.userName, this.id, this.description);
  }

  confirmDelete(userName: string, id: number, description: string) {

    console.log('inside method confirmDelete: ', userName, id, description);

    this.todoService.executeDeleteTodo(userName, id).subscribe(
      response => {
                    this.router.navigate(['todos',userName,
                                          `The Todo "${description}" of the user  ${userName} was deleted with success`]);
                  },
      error => this.handleErrorResponse(error)
    );
  }

  handleErrorResponse(error: any): void {
    this.errorMessage = error.error.message;
  }

}

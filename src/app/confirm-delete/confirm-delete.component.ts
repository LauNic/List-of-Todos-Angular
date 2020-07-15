import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { TodoDataService } from '../service/data/todo-data.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { Todo } from '../list-todos/list-todos.component';


@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  userName: string;
  id: number;
  description: string;
  done: boolean;
  targetDate: Date;

  errorMessage: string;
  displayedColumns: string[] = ['id', 'description', 'targetDate', 'done', 'userName'];
  oneElemArray = [{}];
  dataSource: MatTableDataSource<any>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private todoService: TodoDataService,
              public authenticatedService: HardcodedAuthenticationService) { }

  ngOnInit(): void {

    if(this.route.snapshot.params['userName'] != this.authenticatedService.getLoggedInUser())
    {
      this.router.navigate(['**']);
    }

    // this.userName = this.route.snapshot.params['userName'];
    // this.id = this.route.snapshot.params['id'];
    // this.description = this.route.snapshot.params['description'];

    this.getTodo(this.route.snapshot.params['id']);
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

  getTodo(id: number) {

    console.log('inside method getTodo: ', id);

    this.todoService.executeGetTodo(id).subscribe(
      response => {
                    console.log("response:", JSON.stringify(response));

                    this.oneElemArray.pop();
                    this.oneElemArray.push(response);
                    this.dataSource = new MatTableDataSource(this.oneElemArray);
                    this.userName = response.userName;
                    this.id = response.id;
                    this.description = response.description;
                    this.done = response.done;
                    this.targetDate = response.targetDate;
                  },
      error => this.handleErrorResponse(error)
    );
  }

  handleErrorResponse(error: any): void {
    this.errorMessage = error.error.message;
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { TodoDataService } from '../service/data/todo-data.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { Todo } from '../list-todos/list-todos.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  userName: string;
  id: number;
  description: string;
  done: boolean;
  targetDate: Date;

  operation: string;
  errorMessage: string;
  doneSelect: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private todoService: TodoDataService,
              public authenticatedService: HardcodedAuthenticationService) { }

  ngOnInit(): void {

    if(this.route.snapshot.params['userName'] != this.authenticatedService.getLoggedInUser())
    {
      this.router.navigate(['**']);
    }
    this.getTodo(this.route.snapshot.params['id']);
    this.operation = this.route.snapshot.params['operation'];
  }

  getTodo(id: number) {

    console.log('inside Todo method getTodo: ', id);

    this.todoService.executeGetTodo(id).subscribe(
      response => {
                    console.log("response:", JSON.stringify(response));

                    this.userName = response.userName;
                    this.id = response.id;
                    this.description = response.description;
                    this.done = response.done;
                    this.doneSelect = String(response.done);
                    this.targetDate = response.targetDate;
                  },
      error => this.handleErrorResponse(error)
    );
  }

  save(userName: string, id: number, operation: string) {

    console.log('Todo.save:', id, operation, this.description, this.targetDate, this.doneSelect, this.done);
    this.done = JSON.parse(this.doneSelect);

    if(operation==="edit") {

      this.todoService.executeEditTodo(id, new Todo(id, userName, this.description, this.done, this.targetDate)).subscribe(
          response => {
                        this.router.navigate(['todos',userName,
                                              `The Todo "${this.description}" of the user  ${userName} was modified with success`]);
                      },
          error => this.handleErrorResponse(error)
      );

    }
    else if(operation==="new") {

      this.todoService.executeCreateTodo(userName, new Todo(id, userName, this.description, this.done, this.targetDate)).subscribe(
        response => {
                      this.router.navigate(['todos',userName,
                                            `The Todo "${this.description}" of the user  ${userName} was created with success`]);
                    },
        error => this.handleErrorResponse(error)
    );
    }
  }

  handleErrorResponse(error: any): void {
    this.errorMessage = error.error.message;
  }

}

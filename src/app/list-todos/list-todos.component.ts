import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { TodoDataService } from '../service/data/todo-data.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

export class Todo {
  constructor(public id: number,
              public userName: string,
              public description: string,
              public done: boolean,
              public targetDate: Date
              ) {}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  name: string;
  displayedColumns: string[] = ['description', 'targetDate', 'done', 'actions'];
  dataSource: MatTableDataSource<Todo>;
  errorMessage: string;
  successMessage: string;

  constructor(private route: ActivatedRoute,
              private todoService: TodoDataService,
              private router: Router,
              @Inject(DOCUMENT) private document: Document,
              public authenticatedService: HardcodedAuthenticationService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {

    if(this.route.snapshot.params['name'] != this.authenticatedService.getLoggedInUser())
    {
      this.router.navigate(['**']);
    }

    if(this.route.snapshot.params['message']) {

      console.log(this.route.snapshot.params['message']);
      this.successMessage = this.route.snapshot.params['message'];
    }

    this.getAllTodos();
  }

  getAllTodos() {

    this.name = this.route.snapshot.params['name'];
    this.todoService.executeGetAllTodos(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  deleteTodo(userName: string, id: number, description: string) {
    this.router.navigate(['confirmDelete', userName, id, description]);
  }

  handleErrorResponse(error: any): void {
    this.errorMessage = error.error.message;
  }

  handleSuccessfulResponse(response) {
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.sort = this.sort;
  }

}

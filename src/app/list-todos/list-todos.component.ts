import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

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
              private router: Router) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {

    this.getAllTodos();
  }

  getAllTodos() {

    this.name = this.route.snapshot.params['name'];
    this.todoService.executeGetAllTodos(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  deleteTodo(userName: string, id: number) {
    console.log('deleteTodo: ', userName, id);

    this.todoService.executeDeleteTodo(userName, id).subscribe(
      response => {
                    this.successMessage = `The Todo with id ${id} of the user  ${userName} was deleted with success`;
                  },
      error => this.handleErrorResponse(error)
    );

    this.todoService.executeGetAllTodos(this.name).subscribe(
      response => {
                    // this.dataSource = new MatTableDataSource(response);
                    // this.dataSource.sort = this.sort;
                    // this.dataSource.disconnect();

                  },
      error => this.handleErrorResponse(error)
    );
  }

  handleErrorResponse(error: any): void {
    this.errorMessage = error.error.message;
  }

  handleSuccessfulResponse(response) {
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.sort = this.sort;
  }

}

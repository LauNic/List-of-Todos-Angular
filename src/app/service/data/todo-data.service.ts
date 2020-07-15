import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) { }

  executeGetAllTodos(variable: string) {

    return this.http.get<Todo[]>(`http://localhost:8080/users/${variable}/todos`);
  }

  // /users/{userName}/todos/{id}
  executeDeleteTodo(userName: string, id: number) {

    return this.http.delete<any>(`http://localhost:8080/users/${userName}/todos/${id}`);
  }

  executeGetTodo(id: number) {

    return this.http.get<Todo>(`http://localhost:8080/users/todos/${id}`);
  }

}

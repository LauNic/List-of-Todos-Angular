import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import { TODO_API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) { }

  executeGetAllTodos(variable: string) {

    return this.http.get<Todo[]>(`${TODO_API_URL}/users/${variable}/todos`);
  }

  // /users/{userName}/todos/{id}
  executeDeleteTodo(userName: string, id: number) {

    return this.http.delete<any>(`${TODO_API_URL}/users/${userName}/todos/${id}`);
  }

  executeGetTodo(id: number) {

    return this.http.get<Todo>(`${TODO_API_URL}/users/todos/${id}`);
  }

  executeEditTodo(id: number, todo: Todo) {

    return this.http.put<Todo>(`${TODO_API_URL}/users/todos/${id}`, todo);
  }

  executeCreateTodo(userName: string, todo: Todo) {

    return this.http.post<any>(`${TODO_API_URL}/users/${userName}/todos`, todo);
  }

}

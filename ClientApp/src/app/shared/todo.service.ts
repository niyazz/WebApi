
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TodoItem } from '../models/todo.model';
import { TodoFilter } from  '../models/todo.filter.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  readonly rootURL = 'http://localhost:50450/api/Todo';

  constructor(private http: HttpClient) { }


  getAll(filter:TodoFilter) {
    return this.http.post(this.rootURL + '/getAllTodo', filter).toPromise();
  }

  create(todo:TodoItem) {
    return this.http.post(this.rootURL + '/createTodo', todo).toPromise();
  }

  getHi() {
    return this.http.get(this.rootURL + '/geter', { responseType: 'text' }).toPromise();
  }

  delete(id:number) {
    return this.http.get(this.rootURL + `/deleteTodo/${id}`).toPromise();
  }
}
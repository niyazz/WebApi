import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { TodoItem } from '../models/todo.model';
import { UserService } from '../shared/user.service';
import { WorkerUser } from '../models/workerUser.model';
import { TodoFilter } from  '../models/todo.filter.model';
import { NotificationService } from '../shared/notify.service';


@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  public todoList: TodoItem[];
  public workerList: WorkerUser[];
  public filter: TodoFilter;
  constructor(private todoServ:TodoService,
              private userServ: UserService,
              private notify:NotificationService) {
                this.filter = new TodoFilter();
                this.filter.executerNickName = "";
                this.filter.priority = -1;
                this.filter.status = "";
               }

  ngOnInit(): void {
 
    this.loadAll();
    this.userServ.getAllWorkers()
    .then((res) => {
      this.workerList = res as WorkerUser[];
    })
    .catch((err) =>{
      this.notify.showError("Не удалось получить список исполнителей", "Ошибка!")
    })
  }

  public loadAll(): void{
    this.todoServ.getAll(this.filter)
    .then((res) => {
      this.todoList = res as TodoItem[];
    })
    .catch((err) =>{
      this.notify.showError("Не удалось получить список задач", "Ошибка!")
    }) 


  }

  public changeTodoList(): void{
    this.todoList = [];
    this.filter.priority = +this.filter.priority;
    this.loadAll();
  }

  public removeFromTodoList(id: number): void{
    let index = this.todoList.findIndex(x => x.id == id);
    this.todoList.splice(index, 1);
    this.notify.showSuccess("Задача успешно удалена", "Готово!")
  }
}

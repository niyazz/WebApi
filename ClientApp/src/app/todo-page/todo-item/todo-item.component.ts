import { Component, OnInit } from '@angular/core';
import { Input} from '@angular/core';
import { TodoItem } from 'src/app/models/todo.model';
import { TodoService } from '../../shared/todo.service';
import { EventEmitter, Output } from '@angular/core';
import { faTrash, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../../shared/notify.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  faTrash = faTrash;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  @Input() todo: TodoItem;
  @Output() removedTodo = new EventEmitter<number>();
  constructor(private todoServ: TodoService, private notify:NotificationService) { }
  
  ngOnInit(): void {
  }

  public removeTodo(): void{
    this.todoServ.delete(this.todo.id)
    .then((res) => {
      this.removedTodo.emit(this.todo.id);    
    })
    .catch((err) =>{
      this.notify.showError("Не удалось удлать задачу", "Ошибка!")
    }) 
  }
}

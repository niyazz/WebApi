import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from "@angular/forms";
import { UserService } from '../../shared/user.service';
import { WorkerUser } from '../../models/workerUser.model';
import { TodoItem } from 'src/app/models/todo.model';
import { TodoService } from '../../shared/todo.service';
import { EventEmitter, Output } from '@angular/core';
import { NotificationService } from '../../shared/notify.service';

@Component({
  selector: 'app-todo-creator',
  templateUrl: './todo-creator.component.html',
  styleUrls: ['./todo-creator.component.css']
})
export class TodoCreatorComponent implements OnInit {
  
  constructor(
    private formBulider: FormBuilder, 
    private userSev: UserService, 
    private todoServ: TodoService,
    private notify: NotificationService) { }

  public todoForm: FormGroup;
  public workerList: WorkerUser[];
  public newTodo: TodoItem;
  public currentUser: any;
  @Output() addedTodo = new EventEmitter();
  public timeOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  ngOnInit(): void {
    this.todoForm = this.formBulider.group({
      title: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      priority: ['0'],
      executer: [''],
    });

    this.userSev.getUserProfile()
    .then((res) => {
      this.currentUser = res; 
    })
    .catch((err)=>{
      console.log(err);
    })


    this.userSev.getAllWorkers()
    .then((res) => {
      this.workerList = res as WorkerUser[];
    })
    .catch((err) =>{
      console.log(err)
    })
  }

  public setCurrentUser(event): void{
    this.todoForm.patchValue({
      executer: this.currentUser.userName, 
    });
    event.preventDefault();    
  }

  public addTodo(): void{
    try {

      this.newTodo = new TodoItem(
        this.todoForm.value.title,
        this.todoForm.value.description,
        this.currentUser.lastName + ' ' + this.currentUser.firstName[0] + '.',
        this.workerList.find(x => x.workerNickname ==  this.todoForm.value.executer).workerFullName,
        this.todoForm.value.executer,
        (new Date).toLocaleString('ru',this.timeOptions),
        +this.todoForm.value.priority,
        false
      );
  
      this.todoServ.create(this.newTodo)
      .then((res) => {
        console.log(res)
        this.notify.showSuccess("Задача успешно создана", "Готово!")
      })
      .then((res) => {
        this.todoForm.reset();
      })
      .then(() => {
        this.addedTodo.emit();
      })
      .catch((error) => {
        this.notify.showError("Пожалуйста, заполните форму", "Ошибка!")
      })     
    } 

    catch (error) {
      this.notify.showError("Пожалуйста, заполните форму", "Ошибка!")
    }
   

    
   
  }
}

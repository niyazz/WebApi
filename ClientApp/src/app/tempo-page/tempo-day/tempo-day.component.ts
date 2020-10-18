import { Component, OnInit } from '@angular/core';
import { Input} from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { TimeRecord } from '../../models/tempo.model';
import { TempoService } from '../../shared/tempo.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from "@angular/forms";
import { TodoService } from '../../shared/todo.service';
import { TodoItem } from '../../models/todo.model';
import { UserService } from '../../shared/user.service';
import { TodoFilter } from  '../../models/todo.filter.model';
import { NotificationService } from '../../shared/notify.service';

@Component({
  selector: 'app-tempo-day',
  templateUrl: './tempo-day.component.html',
  styleUrls: ['./tempo-day.component.css']
})
export class TempoDayComponent implements OnInit {
  faPlus = faPlus;
  @Input() tempoListic: TimeRecord[];
  @Input('daynum') dayNumber: any;
  @Input('weeknum') weekNumber: any;
  @Output() removedTempo = new EventEmitter<number>();

  constructor(
     private tempoServ: TempoService,
     private formBulider: FormBuilder,
     private todoServ:TodoService,
     private userSev: UserService,
     private notify:NotificationService ) {  
  }
  public currentUser: any;
  public filter: TodoFilter = new TodoFilter();
  public tempoForm: FormGroup;
  public todoList: TodoItem[];
  public newTempo: TimeRecord;
  public opened: boolean = false;
  public timeOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  ngOnInit(): void {

    this.filter.priority = -1;

    this.userSev.getUserProfile()
    .then((res) => {
      this.currentUser = res;
    })
    .catch((err)=>{
    })

    this.todoServ.getAll(this.filter)
    .then((res) => {
      this.todoList = res as TodoItem[];
    })
    .catch((err) =>{
      this.notify.showError("Не удалось получить список задач", "Ошибка!")
    }) 

    this.tempoForm = this.formBulider.group({
      todoId: ['', Validators.required],
      execHours: ['', Validators.required],
      execMinutes: ['', Validators.required],
      lunchHours: [''],
      lunchMinutes: [''],
      todoIsDone: [false],
    });
  }

  public addTempo(): void{
    this.newTempo = new TimeRecord(
     + this.tempoForm.value.todoId,
      this.tempoForm.value.todoIsDone,
      this.weekNumber,
      this.dayNumber,
      (new Date).toLocaleString('ru',this.timeOptions),
      +this.tempoForm.value.execHours*60 +  +this.tempoForm.value.execMinutes,
      +this.tempoForm.value.lunchHours*60 +  +this.tempoForm.value.lunchMinutes,
      this.currentUser.userName
    );

    this.tempoServ.create(this.newTempo)
    .then((res) => {
      this.opened = !this.opened;
      this.notify.showSuccess("Запись успешно создана", "Готово!")
    })
    .then((res) => {
      document.location.reload(true);
    })
    .catch((err) =>{
      this.notify.showError("Не удалось создать запись", "Ошибка!")
    }) 
  }

  public OpenModal(): void {
    this.opened = !this.opened;
  }
  
  public onlyNumbers(e): void{
    if((e.key >= '0' && e.key <= '9') || e.key == "Backspace")
      return;
    else{
      e.preventDefault();
    }
     
  }
}

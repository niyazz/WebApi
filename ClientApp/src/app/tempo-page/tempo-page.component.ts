import { Component, OnInit } from '@angular/core';
import { TimeRecord } from '../models/tempo.model';
import { TempoService } from '../shared/tempo.service';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Subject }    from 'rxjs';
import { NotificationService } from '../shared/notify.service';

@Component({
  selector: 'app-tempo-page',
  templateUrl: './tempo-page.component.html',
  styleUrls: ['./tempo-page.component.css']
})
export class TempoPageComponent implements OnInit {
  faArrowCircleRight = faArrowCircleRight; 
  faArrowCircleLeft = faArrowCircleLeft;
  parentSubject:Subject<any> = new Subject();
  public weekTime: string;
  public tempoList: TimeRecord[] = [];
  public weekNumber:number = +localStorage.getItem('weekNumber') || this.getWeek();
  public days: any[] = [
    { name:'пн', dayNum:1 },
    { name:'вт', dayNum:2 },
    { name:'ср', dayNum:3 },
    { name:'чт', dayNum:4 },
    { name:'пт', dayNum:5 },
    { name:'сб', dayNum:6 },
    { name:'вс', dayNum:7 }];
 
  constructor(private tempoServ: TempoService, private notify:NotificationService) { 
   
  }

  ngOnInit(): void {
    this.loadAll();   
  }

  public loadAll(): void{
    this.tempoServ.getAll(this.weekNumber)
    .then((res) => {
      this.tempoList = res as TimeRecord[];
    
    })
    .catch((err) =>{
      this.notify.showError("Не удалось получить данные", "Ошибка!")
    }) 
    this.GetWeekTime();
    this.parentSubject.next('loadAll');
  }

  public NextWeek(): void{
    this.weekNumber++;
    localStorage.setItem('weekNumber', this.weekNumber.toString());
    this.loadAll();
  }

  public PrevWeek(): void{
    this.weekNumber--;
    localStorage.setItem('weekNumber', this.weekNumber.toString());
    this.loadAll();
  }

  public GetWeekTime(): void{
    this.tempoServ.getWeekTime(this.weekNumber)
    .then((res) => {
      this.weekTime = res;   
    })
    .catch((err) =>{
      this.notify.showError("Не удалось получить данные о списанном времени", "Ошибка!")
    }) 
  }

  public getWeek(): number {
    let onejan = new Date((new Date()).getFullYear(), 0, 1);
    let answer = Math.ceil(((((+new Date()) - +onejan) / 86400000) + onejan.getDay() + 1) / 7);
    localStorage.setItem('weekNumber', answer.toString());
    return answer;
}

  
}

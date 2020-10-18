import { Component, OnInit } from '@angular/core';
import { Input} from '@angular/core';
import { TimeRecord } from '../../models/tempo.model';
import { TempoService } from '../../shared/tempo.service';
import { Subject }    from 'rxjs';
@Component({
  selector: 'app-tempo-day-header',
  templateUrl: './tempo-day-header.component.html',
  styleUrls: ['./tempo-day-header.component.css']
})
export class TempoDayHeaderComponent implements OnInit {
  @Input() parentSubject:Subject<any>;
  @Input() header:any;
  @Input() tempoListic: TimeRecord[];
  public date: string;
  public workTime: number;
  constructor( private tempoServ: TempoService) { }

  ngOnInit(): void {

    this.getDayWorkTime()
    this.parentSubject.subscribe(event => {
      this.getDayWorkTime()
    });
   
    this.tempoServ.getDayDate(+this.header.dayNum)
    .then((resp) => {
      this.date = resp;
    })
    .catch((err)=>{

    })
  }
  
  public getDayWorkTime(){
    this.tempoServ.getWorkTime(+localStorage.getItem('weekNumber'), this.header.dayNum)
    .then((resp) => {
      this.workTime = +resp;
    })
    .catch((err)=>{
     
    })

  }
}

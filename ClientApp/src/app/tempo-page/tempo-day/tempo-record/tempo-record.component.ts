import { Component, OnInit } from '@angular/core';
import { TimeRecord } from '../../../models/tempo.model';
import { TempoService } from '../../../shared/tempo.service';
import { Input} from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { faBackspace, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from "@angular/forms";
import { NotificationService } from '../../../shared/notify.service';

@Component({
  selector: 'app-tempo-record',
  templateUrl: './tempo-record.component.html',
  styleUrls: ['./tempo-record.component.css']
})
export class TempoRecordComponent implements OnInit {
  faBackspace = faBackspace;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  @Input() tempo: TimeRecord;
  @Input() numbe: number;

  constructor(private tempoServ:TempoService, private notify: NotificationService) { }

 
  ngOnInit(): void {
    
  }
  public timeConvert(n:number) {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return `${rhours}h ${rminutes}m`;
  }

  public removeTempo(): void{
    this.tempoServ.delete(this.tempo.id)
    .then((res) => {
      this.notify.showSuccess("Запись успешно удалена!", "Готово!");
    })
    .then(() =>{
      document.location.reload(true);
    })
    .catch((err) =>{
      this.notify.showError("Не удалось удалить запись!", "Ошибка!");
    }) 
  }
}

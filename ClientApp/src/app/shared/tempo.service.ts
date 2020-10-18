import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TimeRecord } from '../models/tempo.model';
@Injectable({
  providedIn: 'root'
})
export class TempoService {

  readonly rootURL = 'http://localhost:50450/api/TimeRecord';

  constructor(private http: HttpClient) { }


  getAll(week: number) {
    return this.http.get(this.rootURL + `/getAllRecords/${week}`).toPromise();
  }

  create(tempo:TimeRecord) {
    return this.http.post(this.rootURL + '/createRecord', tempo).toPromise();
  }

  delete(id:number) {
    return this.http.get(this.rootURL + `/deleteRecord/${id}`).toPromise();
  }

  getWorkTime(week:number, day:number){
    return this.http.get(this.rootURL + `/sumTime/${week}/${day}`, { responseType: 'text' }).toPromise();
  }

  getWeekTime(week:number){
    return this.http.get(this.rootURL + `/sumWeekTime/${week}`, { responseType: 'text' }).toPromise();
  }

  getDayDate(dayNumber){
    return this.http.get(this.rootURL + `/dateByDay/${dayNumber}`, { responseType: 'text' }).toPromise();
  }
}

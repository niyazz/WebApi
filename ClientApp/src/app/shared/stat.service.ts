import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient) { }

  readonly rootURL = 'http://localhost:50450/api/Statistic';

  getTodoDoneAmount(userName: string) {    
    return this.http.get(this.rootURL + `/getTodoDoneAmount/${userName}`, { responseType: 'text' }).toPromise();
  }
  
  getAllTodoTime(userName: string) {    
    return this.http.get(this.rootURL + `/getAllTodoTime/${userName}`, { responseType: 'text' }).toPromise();
  }

  getAllLunchTime(userName: string) {    
    return this.http.get(this.rootURL + `/getAllLunchTime/${userName}`, { responseType: 'text' }).toPromise();
  }

  getPercents(userName: string) {    
    return this.http.get(this.rootURL + `/getPercents/${userName}`, { responseType: 'text' }).toPromise();
  }
}

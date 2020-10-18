import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseURI = 'http://localhost:50450/api';
  constructor(
    private http: HttpClient
  ) {}

  public RegisterAdmin(payload: any){
    return  this.http.post(this.baseURI + '/ApplicationUser/Register', payload);
  }

  public LoginAsUser(payload: any){
    return  this.http.post(this.baseURI + '/ApplicationUser/Login', payload);
  }

  public getUserProfile() {
    return this.http.get(this.baseURI + '/UserProfile').toPromise();
  }

  public getAllWorkers() {
    return this.http.get(this.baseURI + '/ApplicationUser/getAllWorkers').toPromise();
  }
}

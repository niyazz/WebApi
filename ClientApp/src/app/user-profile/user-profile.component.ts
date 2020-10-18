import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {StatService} from '../shared/stat.service';
import { faCogs, faUtensils, faBusinessTime, faPercent } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../shared/notify.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private router: Router, private userServ: UserService, private statServ: StatService, private notify: NotificationService) { }
  public userDetails: any;
  faCogs = faCogs;
  faUtensils = faUtensils;
  faBusinessTime= faBusinessTime;
  faPercent = faPercent;

  public todoAmount: any;
  public todoTitle: any = "Задач решено";

  public todoTime: any;
  public timeTitle: any = "Часов работы";

  public lunchTime: any;
  public lunchTimeTitle: any = "Часов перерыва";

  public percentNum: any;
  public percentTitle: any = "Ваша продуктивность";

  ngOnInit() {
    this.userServ.getUserProfile()
    .then((res) => {
      this.userDetails = res;
      localStorage.setItem('userFullName', `${this.userDetails.lastName} ${this.userDetails.firstName}`);
    })
    .then(() => {
      this.loadStatistic();
    })
    .catch((err) =>{
      this.notify.showError("Не удалось загрузить данные пользователя", "Ошибка!")
    })
  
  }

  public loadStatistic(): void{  
    this.statServ.getTodoDoneAmount(this.userDetails.userName)
    .then((res) => {
      this.todoAmount = res;
    })
    .catch((err) => {
      this.notify.showError("Не удалось загрузить статистику", "Ошибка!")
    });

    this.statServ.getAllTodoTime(this.userDetails.userName)
    .then((res) => {
      this.todoTime = res;
    })
    .catch((err) => {
      this.notify.showError("Не удалось загрузить статистику", "Ошибка!")
    });

    this.statServ.getAllLunchTime(this.userDetails.userName)
    .then((res) => {
      this.lunchTime = res;
    })
    .catch((err) => {
      this.notify.showError("Не удалось загрузить статистику", "Ошибка!")
    });

    this.statServ.getPercents(this.userDetails.userName)
    .then((res) => {
      this.percentNum = res;
    })
    .catch((err) => {
      this.notify.showError("Не удалось загрузить статистику", "Ошибка!")
    });
  }

  public loadImage(): void{
    this.notify.showInfo("Данная функция находится в разработке", "Информация!")
  }
}

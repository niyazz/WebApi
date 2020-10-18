import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { faCoffee, faGem, faTachometerAlt, faCircle, faChartLine, faGlobe, faTasks } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../shared/notify.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  faGem = faGem;
  faCoffee =  faCoffee;
  faTachometerAlt = faTachometerAlt;
  faCircle = faCircle;
  faTasks = faTasks;
  faChartLine = faChartLine;
  faGlobe = faGlobe;

  constructor(private router: Router, private notify:NotificationService ) { }
  public userFullName: string;
  
  ngOnInit(): void {
    this.userFullName = localStorage.getItem("userFullName");
  }

  public onLogout(): void{
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  public sayPhrase(): void{
    this.notify.showInfo("Данный раздел находится в разработке","Информация!")
  }
}

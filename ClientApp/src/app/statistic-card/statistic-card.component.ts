import { Component, OnInit } from '@angular/core';
import { Input} from '@angular/core';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.css']
})
export class StatisticCardComponent implements OnInit {
  @Input() icon: any;
  @Input() number: any;
  @Input() text: any;
  constructor() { }

  ngOnInit(): void {
  }

}

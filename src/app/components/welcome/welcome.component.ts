import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';

import { AuthService, GlobalService } from 'src/app/services';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public hour = moment().format('HH');
  public iconTime!: number;
  public time!: string;
  public userInfo!: any;

  constructor(
    private readonly authService: AuthService,
    private readonly globalService: GlobalService
  ) {}

  ngOnInit(): void {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);
  }

  public getHour() {
    if (this.hour > '12' && this.hour <= '18') {
      this.time = 'Buenas tardes';
      this.iconTime = 0;
    } else if (this.hour > '18' && this.hour < '24') {
      this.time = 'Buenas noches';
      this.iconTime = 1;
    } else {
      this.time = 'Buenos días';
      this.iconTime = 2;
    }
    return { time: this.time, iconTime: this.iconTime };
  }
}

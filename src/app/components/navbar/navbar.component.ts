import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, GlobalService } from 'src/app/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public userInfo!: any;

  constructor(
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);
  }

  public goToHome() {
    this.router.navigateByUrl('/home/reports');
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}

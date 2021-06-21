import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

import { Api } from '../shared/api';
import { GlobalService } from '../services/global.service';
import { Login } from '../entities/login.class';
import { ROLE } from '../entities/enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl: string = '';
  private userInfo: any;

  constructor(
    private readonly globalService: GlobalService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  /**
   * @description realizar login
   * @returns Observable <any>
   */
  public login(data: Login): Observable<any> {
    return this.globalService
      .post(Api.Endpoints.AUTH.LOGIN, {
        email: data.email,
        password: data.password,
      })
      .pipe(
        map((res) => {
          this.userInfo = this.getDecodedAccessToken(res.data.accessToken);

          if (this.userInfo.rol.id === ROLE.USER) {
            this.toastr.warning(
              'Hemos detectado que intenta ingresar con un tipo de usuario No Administrador, el cual no es permitido dentro de esta plataforma.',
              'Autorización denegada',
              { timeOut: 12000 }
            );
          } else {
            localStorage.setItem('accessToken', res.data['accessToken']);
          }
          return res.data;
        })
      );
  }

  public isLoggedIn() {
    const token = localStorage.getItem('accessToken');
    if (token && token !== undefined) {
      return true;
    }
    return false;
  }

  public saveToken(token: any): any {
    localStorage.setItem('accessToken', token);
  }

  public getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public logout() {
    localStorage.clear();

    this.router.navigate(['/login']);
  }
}

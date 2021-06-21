import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Api } from '../shared/api';
import { GlobalService } from '../services/global.service';
import { User } from '../entities/user.class';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly globalService: GlobalService) {}

  public getAll(
    pageNumber: number,
    pageElements: number,
    start: string,
    end: string,
    id: any
  ): Observable<any> {
    return this.globalService
      .get(Api.Endpoints.USER.ALL(pageNumber, pageElements, start, end, id))
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getById(user: User) {
    return this.globalService
      .get(Api.Endpoints.USER.BASE + '/' + user.identification)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public update(user: User, identification: string) {
    return this.globalService
      .put(Api.Endpoints.USER.UPDATE(identification), user)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public updatePassword(password: any, identification: string) {
    return this.globalService
      .put(Api.Endpoints.USER.UPDATEPASSWORD(identification), password)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public create(user: User) {
    return this.globalService.post(Api.Endpoints.USER.BASE, user).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public delete(user: User) {
    return this.globalService
      .delete(Api.Endpoints.USER.BASE + '/' + user.identification)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Api } from '../shared/api';
import { Category } from '../entities';
import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly globalService: GlobalService) {}

  public getAll(): Observable<any> {
    return this.globalService.get(Api.Endpoints.CATEGORY.BASE).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public create(category: Category) {
    return this.globalService.post(Api.Endpoints.CATEGORY.BASE, category).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public update(category: Category, id: number) {
    return this.globalService
      .put(Api.Endpoints.CATEGORY.BASE + '/' + id, category)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}

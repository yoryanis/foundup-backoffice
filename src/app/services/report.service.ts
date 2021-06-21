import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Api } from '../shared/api';
import { GlobalService } from '../services/global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(
    private readonly globalService: GlobalService,
    private httpClient: HttpClient
  ) {}

  covURL = 'https://pomber.github.io/covid19/timeseries.json';

  public getAllO(): Observable<any> {
    return this.httpClient.get<any>(this.covURL);
  }

  public getAll(
    pageNumber: number,
    pageElements: number,
    start: string,
    end: string
  ): Observable<any> {
    return this.globalService
      .get(Api.Endpoints.REPORT.ALL(pageNumber, pageElements, start, end))
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getAllGeneral(year: string): Observable<any> {
    return this.globalService.get(Api.Endpoints.REPORT.ALL_GENERAL(year)).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getAllCategory(year: string): Observable<any> {
    return this.globalService.get(Api.Endpoints.REPORT.CATEGORY(year)).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getAllCity(year: string): Observable<any> {
    return this.globalService.get(Api.Endpoints.REPORT.CITY(year)).pipe(
      map((res) => {
        return res;
      })
    );
  }
}

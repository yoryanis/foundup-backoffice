import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { GlobalService } from '../index';
import { Router } from '@angular/router';
import { Api } from 'src/app/shared/api';

@Injectable({
  providedIn: 'root',
})
export class InterceptorRequestInterceptor {
  constructor(private router: Router, private globalService: GlobalService) {}

  // intercept request and add headers
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone();

    if (!request.headers.get('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (!request.headers.get('Authorization')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.globalService.getToken()}`,
        },
      });
    }

    return next.handle(request).pipe(
      tap(
        (event) => {
          const codes: number[] = [
            1001,
            1002,
            1006,
            1007,
            1012,
            1014,
            1015,
            1018,
          ];
          if (event instanceof HttpResponse) {
            if (
              event.body.code > 1000 &&
              !Object.values(codes).includes(event.body.code)
            ) {
              this.globalService.onSuccess(event.body.message, event.body.code);
            }
            if (event.body.code <= 1000) {
              this.globalService.onFailure(event.body.error, event.body.code);
              return event;
            }

            if (!Api.PRODUCTION && Api.DEBUG) {
              console.log(
                `%cSTART HttpRequest :: Method => ${request.method} :: URL => ${request.url} :: `,
                'color: green;'
              );
              console.log(`%cHttpResponse`, 'color: green;', event);
              console.log(
                `%cEND HttpRequest :: Method => ${request.method} :: URL => ${request.url} :: `,
                'color: green;'
              );
            }
          }
        },
        (error) => {
          if (!Api.PRODUCTION && Api.DEBUG) {
            console.log(
              `%cSTART HttpRequest :: Method => ${request.method} :: URL => ${request.url} :: `,
              'color: red;'
            );
            console.error(`%cHttpResponse`, 'color: red;', error);
            console.log(
              `%cEND HttpRequest :: Method => ${request.method} :: URL => ${request.url} :: `,
              'color: red;'
            );
          }
          if (error.status === 401) {
            localStorage.setItem(
              Api.AUTH.KEYS.urlBeforExpelling,
              this.router.url
            );
            localStorage.removeItem(Api.AUTH.KEYS.token);
            this.router.navigateByUrl('');
          }
        }
      )
    );
  }
}

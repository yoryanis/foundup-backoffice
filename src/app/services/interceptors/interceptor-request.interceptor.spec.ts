import { TestBed } from '@angular/core/testing';

import { InterceptorRequestInterceptor } from './interceptor-request.interceptor';

describe('InterceptorRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterceptorRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InterceptorRequestInterceptor = TestBed.inject(InterceptorRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

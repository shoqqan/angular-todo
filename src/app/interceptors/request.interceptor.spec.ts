import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { RequestInterceptor } from './request.interceptor';

describe('RequestInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  it('should add Authorization header when user is authenticated', () => {
    spyOnProperty(authService, 'isAuthenticated', 'get').and.returnValue(true);
    spyOnProperty(authService, 'token', 'get').and.returnValue('fakeToken');
    httpClient.get('/api/data').subscribe(response => {
      expect(response).toBeTruthy();
    });
    const req = httpTestingController.expectOne('/api/data');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fakeToken');
    httpTestingController.verify();
  });

  it('should not add Authorization header when user is not authenticated', () => {
    spyOnProperty(authService, 'isAuthenticated', 'get').and.returnValue(false);
    httpClient.get('/api/data').subscribe(response => {
      expect(response).toBeTruthy();
    });
    const req = httpTestingController.expectOne('/api/data');
    expect(req.request.headers.has('Authorization')).toBe(false);
    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

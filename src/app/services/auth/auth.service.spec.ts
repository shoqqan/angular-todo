import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let authService: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: HttpClient, useValue: {}}
      ]
    });
    authService = TestBed.inject(AuthService);
  });
  it('setting user with argument should works', () => {
    authService.setUser('token123');
    expect(localStorage.getItem('token')).toEqual('token123');
    expect(authService.token).toEqual('token123');
  });
  it('setting user without argument should works', () => {
    authService.setUser('');
    expect(localStorage.getItem('token')).toEqual('');
    expect(authService.token).toEqual('');
  });
  it('getting isAuthenticated() should return true if user authenticated', () => {
    authService.setUser('token123');
    expect(authService.isAuthenticated).toBeTruthy();
  });
  it('getting isAuthenticated() should return false if user is not authenticated', () => {
    authService.setUser('');
    expect(authService.isAuthenticated).toBeFalse();
  });
});

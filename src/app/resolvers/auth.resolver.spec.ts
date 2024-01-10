import { AuthResolver } from './auth.resolver';
import { AuthService } from '../services/auth/auth.service';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('AuthResolver', () => {
  let authResolver: AuthResolver;
  const fakeAuthService: jasmine.SpyObj<AuthService> = jasmine.createSpyObj('fakeAuthService', [], ['isAuthenticated']);
  const fakeRouter: jasmine.SpyObj<AuthService> = jasmine.createSpyObj('Router', ['navigate'], []);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthResolver,
        {provide: AuthService, useValue: fakeAuthService},
        {provide: Router, useValue: fakeRouter}
      ]
    });
    authResolver = TestBed.inject(AuthResolver);
  });
  it('should be created', () => {
    expect(authResolver).toBeDefined();
  });
  it('resolve() should return false if user authenticated', () => {
    //@ts-ignore
    Object.getOwnPropertyDescriptor(fakeAuthService, 'isAuthenticated').get.and.returnValue(true);
    const result = authResolver.resolve();
    expect(result).toBeFalse();
  });
  it('resolve() should return true if user not authenticated', () => {
    //@ts-ignore
    Object.getOwnPropertyDescriptor(fakeAuthService, 'isAuthenticated').get.and.returnValue(false);
    const result = authResolver.resolve();
    expect(result).toBeTruthy();
  });
});

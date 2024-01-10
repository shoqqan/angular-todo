import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth/auth.service';
import { loggedInGuard } from './logged-in.guard';

describe('loggedInGuard', () => {
  const fakeRouter = jasmine.createSpyObj('router', ['navigateByUrl'], []);
  const fakeAuthService = jasmine.createSpyObj('fakeAuthService', [], ['isAuthenticated']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useValue: fakeAuthService},
        {provide: Router, useValue: fakeRouter}
      ]
    });

  });
  it('should return false if user authenticated', () => {
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;
    // @ts-ignore
    Object.getOwnPropertyDescriptor(fakeAuthService, 'isAuthenticated').get.and.returnValue(true);
    const result = TestBed.runInInjectionContext(() =>
      loggedInGuard(route, state)
    );
    expect(result).toBeFalse();
  });
  it('should return true if user not authenticated', () => {
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;
    // @ts-ignore
    Object.getOwnPropertyDescriptor(fakeAuthService, 'isAuthenticated').get.and.returnValue(false);
    const result = TestBed.runInInjectionContext(() =>
      loggedInGuard(route, state)
    );
    expect(result).toBeTruthy();
  });
});

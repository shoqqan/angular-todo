import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { TodolistsService } from '../../todolists/services/todolists.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { GlobalErrorService } from '../../services/global-error/global-error.service';
import { AddItemFormComponent } from '../../components/add-item-form/add-item-form.component';

describe('HomePage', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  const fakeGlobalErrorService = jasmine.createSpyObj('fakeGlobalErrorService', ['getError'], ['error']);
  const fakeAuthService = jasmine.createSpyObj(['setUser']);
  const fakeRouter = jasmine.createSpyObj(['navigateByUrl']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePageComponent
      ],
      providers: [
        {provide: TodolistsService, useValue: {}},
        {provide: AuthService, useValue: fakeAuthService},
        {provide: Router, useValue: fakeRouter},
        {provide: GlobalErrorService, useValue: fakeGlobalErrorService}
      ],
      imports: [
        AddItemFormComponent
      ]
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeDefined();
  });
  it('should return correct global error value', () => {
    //@ts-ignore
    Object.getOwnPropertyDescriptor(fakeGlobalErrorService, 'error').get.and.returnValue('login error');
    expect(component.error).toEqual('login error');
  });
  it('onLogout() should reset user and navigate', () => {
    component.onLogout();
    expect(fakeAuthService.setUser).toHaveBeenCalledWith(null);
    expect(fakeRouter.navigateByUrl).toHaveBeenCalledWith('sign-in');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { TodolistsService } from '../../todolists/services/todolists.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GlobalErrorService } from '../../services/global-error.service';
import { AddItemFormComponent } from '../../components/add-item-form/add-item-form.component';

describe('HomePage', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePageComponent
      ],
      providers: [
        {provide: TodolistsService, useValue: {}},
        {provide: AuthService, useValue: {}},
        {provide: Router, useValue: {}},
        {provide: GlobalErrorService, useValue: {}}
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
});

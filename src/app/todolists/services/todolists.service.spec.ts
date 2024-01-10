import { TodolistsService } from './todolists.service';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { GlobalErrorService } from '../../services/global-error/global-error.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { of, throwError } from 'rxjs';
import { FilterType } from '../interfaces/todolists';

describe('TodolistService', () => {
  let todolistService: TodolistsService;
  const fakeHttpClient = jasmine.createSpyObj('fakeHttpClient', ['get', 'post', 'delete', 'put']);
  const fakeAuthService = jasmine.createSpyObj('fakeAuthService', ['setUser']);
  const fakeRouter = jasmine.createSpyObj('fakeRouter', ['navigateByUrl']);
  const fakeGlobalErrorService = jasmine.createSpyObj('fakeGlobalErrorService', [], ['error']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodolistsService,
        {provide: HttpClient, useValue: fakeHttpClient},
        {provide: AuthService, useValue: fakeAuthService},
        {provide: Router, useValue: fakeRouter},
        {provide: GlobalErrorService, useValue: fakeGlobalErrorService},
      ]
    });
    todolistService = TestBed.inject(TodolistsService);
  });
  it('Base url should be correct', () => {
    expect(todolistService['BASE_URL']).toEqual('https://todo-back-production.up.railway.app/todolists');
  });
  it('getTodolists() should return correct todolists', done => {
    fakeHttpClient.get.and.returnValue(of([
      {id: 1, title: 'What to do', filter: FilterType.ALL},
      {id: 1, title: 'What to eat', filter: FilterType.ALL}
    ]));
    todolistService.getTodolists().subscribe(result => {
      expect(result).toEqual(
        [
          {id: 1, title: 'What to do', filter: FilterType.ALL},
          {id: 1, title: 'What to eat', filter: FilterType.ALL}
        ]
      );
      done();
    });
  });
  it('getTodolists() should return error if user unauthorised', fakeAsync(() => {
    fakeHttpClient.get.and.returnValue(throwError({status: 401}));
    todolistService.getTodolists().subscribe(() => {
      fail('Unexpected success callback');
    }, err => {
      expect(err).toBeTruthy();
    });
    tick();
    expect(fakeAuthService.setUser).toHaveBeenCalledWith(null);
    expect(fakeRouter.navigateByUrl).toHaveBeenCalledWith('sign-in');
  }));
  it('getTodolists() should return error', fakeAsync(() => {
    // @ts-ignore
    const setterSpy = Object.getOwnPropertyDescriptor(fakeGlobalErrorService, 'error').set.and.callThrough();
    fakeHttpClient.get.and.returnValue(throwError({error: {message: 'FAKE ERROR'}}));
    todolistService.getTodolists().subscribe(() => {
      fail('Unexpected success callback');
    }, err => {
      expect(err).toBeTruthy();
    });
    expect(setterSpy).toHaveBeenCalledWith('FAKE ERROR');
    tick();
  }));
  it('createTodolist should return correct todolist', done => {
    const title = 'TODO FROM BACK';
    fakeHttpClient.post.and.returnValue(of(
      {
        id: 1,
        title: title,
        user_id: 1,
        updatedAt: '',
        createdAt: ''
      }
    ));
    todolistService.createTodolist(title).subscribe(result => {
      expect(result).toEqual({
        title, id: 1, filter: FilterType.ALL
      });
      done();
    });
  });
  it('createTodolist() should update globalErrorService', fakeAsync(() => {
    // @ts-ignore
    const setterSpy = Object.getOwnPropertyDescriptor(fakeGlobalErrorService, 'error').set.and.callThrough();
    fakeHttpClient.post.and.returnValue(throwError({error: {message: 'FAKE ERROR'}}));
    todolistService.createTodolist('TITLE').subscribe(() => {
      fail('Unexpected success callback');
    }, error => {
      expect(error).toBeTruthy();
    });
    tick();
    expect(setterSpy).toHaveBeenCalledWith('FAKE ERROR');

  }));
  it('deleteTodolist() should delete todolist', fakeAsync(() => {
    fakeHttpClient.delete.and.returnValue(of({message: 'FAKE MESSAGE', id: '1'}));
    todolistService.deleteTodolist(1).subscribe(res => {
      expect(res).toEqual(1);
    });
    tick();
  }));
  it('deleteTodolist() should catch error', fakeAsync(() => {
    // @ts-ignore
    const setterSpy = Object.getOwnPropertyDescriptor(fakeGlobalErrorService, 'error').set.and.callThrough();
    fakeHttpClient.delete.and.returnValue(throwError({error: {message: 'FAKE ERROR'}}));
    todolistService.deleteTodolist(1).subscribe(() => {
      fail('Unexpected success callback');
    }, err => {
      expect(err).toBeTruthy();
    });
    tick();
    expect(setterSpy).toHaveBeenCalledWith('FAKE ERROR');
  }));
  it('changeTodolistTitle() should return updated todolist', fakeAsync(() => {
    fakeHttpClient.put.and.returnValue(of({message: 'FAKE MESSAGE', title: 'FAKE TITLE'}));
    todolistService.changeTodolistTitle(1, 'FAKE TITLE').subscribe(res => {
      expect(res).toEqual({todo_id: 1, title: 'FAKE TITLE'});
    });
  }));
  it('changeTodolistTitle() should catch error', fakeAsync(() => {
    // @ts-ignore
    const setterSpy = Object.getOwnPropertyDescriptor(fakeGlobalErrorService, 'error').set.and.callThrough();
    fakeHttpClient.put.and.returnValue(throwError({error: {message: 'FAKE ERROR'}}));
    todolistService.changeTodolistTitle(1, 'FAKE TITLE').subscribe(() => {
      fail('Unexpected success callback');
    }, err => {
      expect(err).toBeTruthy();
    });
    expect(setterSpy).toHaveBeenCalledWith('FAKE ERROR');
  }));
});

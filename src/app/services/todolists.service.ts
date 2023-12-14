import { Injectable } from '@angular/core';
import { ITodolist } from '../models/todolists';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class TodolistsService {
  todolists$: BehaviorSubject<ITodolist[]> = new BehaviorSubject([] as ITodolist[]);


  constructor(private apiService: ApiService) {
  }


  getTodolists() {
    this.apiService.getTodolists().subscribe(tdls => this.todolists$.next(tdls));
  }

  createTodolist(title: string) {
    this.apiService.createTodolist(title).subscribe(todolist => this.todolists$.next([...this.todolists$.value, todolist]));
  }

  changeTodolistTitle(todo_id: number, title: string) {
    this.apiService.changeTodolistName(todo_id, title).subscribe(res => this.todolists$.next(this.todolists$.value.map(tdl => tdl.id === res.todo_id ? {
      ...tdl,
      title: res.title
    } : {...tdl})));
  }

  deleteTodolist(todo_id: number) {
    this.apiService.deleteTodolist(todo_id).subscribe(
      id =>
        this.todolists$.next(this.todolists$.value.filter(tdl => tdl.id !== id))
    );
  }
}

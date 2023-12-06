import { Injectable } from '@angular/core';
import { ITodolist } from '../models/todolists';
import { todolists } from '../data/todolists';
import { TasksService } from './tasks.service';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodolistsService {
  todolists$: BehaviorSubject<ITodolist[]> = new BehaviorSubject(todolists);

  constructor(private taskService: TasksService) {
  }

  createTodolist(title: string) {
    const id = Date.now().toString();
    this.todolists$.next(
      [...this.todolists$.value, {id, title, filter: 'all'}]
    );
    this.taskService.onCreateNewTodolist(id);
  }

  changeTodolistTitle(todo_id: string, title: string) {
    this.todolists$.pipe(
      map(todolists => todolists.map((tdl: ITodolist) => tdl.id === todo_id ? {...tdl, title} : {...tdl}))
    ).subscribe(updatedTdl =>
      this.todolists$.next(updatedTdl)
    );
  }

  deleteTodolist(todo_id: string) {
    this.todolists$.pipe(
      map(todolists => todolists.filter(tdl => tdl.id !== todo_id))
    ).subscribe(updatedTdl =>
      this.todolists$.next(updatedTdl)
    );
    this.taskService.onDeleteTodolist(todo_id);
  }
}

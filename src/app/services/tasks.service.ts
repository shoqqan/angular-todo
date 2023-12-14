import { Injectable } from '@angular/core';
import { ITasks } from '../models/tasks';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks$: BehaviorSubject<ITasks> = new BehaviorSubject({} as ITasks);

  constructor(private apiService: ApiService) {
  }

  getTasksOfTodolist(todo_id: number) {
    this.apiService.getTasks(todo_id).subscribe(
      tsks =>
        this.tasks$.next({
          ...this.tasks$.value,
          [todo_id]: tsks
        })
    );
  }

  createTask(todo_id: number, title: string) {
    this.apiService.createTask(todo_id, title).subscribe(task =>
      this.tasks$.next({
        ...this.tasks$.value,
        [todo_id]: [task, ...this.tasks$.value[todo_id]]
      })
    );
  }

  // changeTaskName(todo_id: string, id: string, title: string) {
  //
  //   // this.tasks$.next(
  //   //   {
  //   //     ...this.tasks$.value,
  //   //     [todo_id]: this.tasks$.value[todo_id].map((task) => task.id === id ? ({...task, title}) : {...task})
  //   //   }
  //   // );
  // }

  deleteTask(todo_id: number, id: number) {
    this.apiService.deleteTask(todo_id, id).subscribe(id =>
      this.tasks$.next({...this.tasks$.value, [todo_id]: this.tasks$.value[todo_id].filter(task => task.id != id)})
    );
  }

  //TODO
  // changeTaskStatus(todo_id: string, id: string, status: boolean) {
  //   // this.tasks$.next(
  //   //   {
  //   //     ...this.tasks$.value,
  //   //     [todo_id]: this.tasks$.value[todo_id].map((el) => (el.id === id ? {...el, isDone: status} : {...el}))
  //   //   }
  //   // );
  // }
}

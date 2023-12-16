import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private apiService: ApiService) {
  }

  getTasksOfTodolist(todo_id: number) {
    return this.apiService.getTasks(todo_id).pipe(map(tasks => tasks.reverse()));
  }

  createTask(todo_id: number, title: string) {
    return this.apiService.createTask(todo_id, title);
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
    return this.apiService.deleteTask(todo_id, id);
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

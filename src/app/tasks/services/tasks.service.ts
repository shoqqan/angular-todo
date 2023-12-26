import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { MessageAPIResponce, TaskAPIResponce } from '../../models/api-responces';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { GlobalErrorService } from '../../services/global-error.service';
import { Task } from '../interfaces/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private BASE_URL = 'https://todo-back-production.up.railway.app/todolists';

  constructor(private http: HttpClient, private authService: AuthService, private globalErrorService: GlobalErrorService) {
  }

  getTasksOfTodolist(todo_id: number) {
    return this.http.get<TaskAPIResponce[]>(`${this.BASE_URL}/${todo_id}/tasks`).pipe(
      map(tasks => {
        return tasks.map(el => ({id: el.id, title: el.title, isDone: el.isDone})).reverse();
      }),
      catchError(err => {
          this.globalErrorService.setError(err.error.message);
          return of([]);
        }
      )
    );
  }

  createTask(todo_id: number, title: string): Observable<Task> {
    return this.http.post<TaskAPIResponce>(`${this.BASE_URL}/${todo_id}/tasks`, {title}).pipe(
      map(task => {
        return {id: task.id, title: task.title, isDone: task.isDone};
      }),
      catchError(err => {
        // console.log(err);
        this.globalErrorService.setError(err.error.message);
        return of();
      })
    );
  }

  // changeTaskName(todo_id: string, id: string, title: string) {
  //
  //   // this.tasks$.next(
  //   //   {
  //   //     ...this.tasks$.value,
  //   //     [todo_id]: this.tasks$.value[todo_id].map((task) => task.id === id ? ({...task, title}) : {...task})
  //   /   }
  //   // );
  // }

  deleteTask(todo_id: number, id: number): Observable<number> {
    return this.http.delete<MessageAPIResponce>(`${this.BASE_URL}/${todo_id}/tasks/${id}`).pipe(
      map(res => Number(res.id)),
      catchError(err => {
        this.globalErrorService.setError(err.error.message);
        return of();
      })
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';
import { ITodolist } from '../models/todolists';
import { ITask } from '../models/tasks';
import {
  IChangeNameAPIResponce,
  ICreateTodolistsAPIResponce,
  IMessageAPIResponce,
  ITaskAPIResponce
} from '../models/api-responces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'https://todo-back-production.up.railway.app/todolists';
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.token}`
  });

  constructor(private http: HttpClient, private authService: AuthService) {
  }


//TODOLIST
  getTodolists(): Observable<ITodolist[]> {
    return this.http.get<ITodolist[]>(`${this.BASE_URL}`, {headers: this.headers});
  }

  createTodolist(title: string): Observable<ITodolist> {
    return this.http.post<ICreateTodolistsAPIResponce>(`${this.BASE_URL}`, {
      title
    }, {headers: this.headers}).pipe(
      map(tdl => {
        const newTodolist: ITodolist = {
          title: tdl.title,
          id: tdl.id,
          filter: 'all'
        };
        return newTodolist;
      })
    );
  }

  deleteTodolist(todo_id: number): Observable<number> {
    return this.http.delete<IMessageAPIResponce>(`${this.BASE_URL}/${todo_id}`, {headers: this.headers}).pipe(
      map(res => Number(res.id))
    );

  }

  changeTodolistName(todo_id: number, title: string): Observable<{ todo_id: number, title: string }> {
    return this.http.put<IChangeNameAPIResponce>(`${this.BASE_URL}/${todo_id}`, {title}, {headers: this.headers}).pipe(
      map(res => (
          {
            todo_id: todo_id, title: res.title
          }
        )
      )
    );
  }

  //TASKS
  getTasks(todo_id: number): Observable<ITask[]> {
    return this.http.get<ITaskAPIResponce[]>(`${this.BASE_URL}/${todo_id}/tasks`, {headers: this.headers}).pipe(
      map(tasks => {
        return tasks.map(el => ({id: el.id, title: el.title, isDone: el.isDone}));
      })
    );
  }

  createTask(todo_id: number, title: string): Observable<ITask> {
    return this.http.post<ITaskAPIResponce>(`${this.BASE_URL}/${todo_id}/tasks`, {title}, {headers: this.headers}).pipe(
      map(task => {
        return {id: task.id, title: task.title, isDone: task.isDone};
      })
    );
  }

  deleteTask(todo_id: number, task_id: number): Observable<number> {
    return this.http.delete<IMessageAPIResponce>(`${this.BASE_URL}/${todo_id}/tasks/${task_id}`, {headers: this.headers}).pipe(
      map(res => Number(res.id))
    );
  }

//TODO
  // changeTaskName(todo_id: number, task_id: number) {
  //   // return this.http.put();
  // }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ChangeNameAPIResponce, CreateTodolistsAPIResponce, MessageAPIResponce } from '../../models/api-responces';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalErrorService } from '../../services/global-error.service';
import { FilterType, Todolist } from '../interfaces/todolists';

@Injectable({
  providedIn: 'root'
})

export class TodolistsService {
  private BASE_URL = 'https://todo-back-production.up.railway.app/todolists';


  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private globalErrorService: GlobalErrorService) {
  }

  getTodolists() {
    return this.http.get<Todolist[]>(`${this.BASE_URL}`).pipe(
      catchError(err => {
        if (err.status == 401) {
          this.authService.setUser(null);
          this.router.navigateByUrl('sign-in');
        } else {
          this.globalErrorService.setError(err.error.message);
        }
        return of();
      })
    );
  }

  createTodolist(title: string) {
    return this.http.post<CreateTodolistsAPIResponce>(`${this.BASE_URL}`, {
      title
    }).pipe(
      map(tdl => {
        const newTodolist: Todolist = {
          title: tdl.title,
          id: tdl.id,
          filter: FilterType.ALL
        };
        return newTodolist;
      }),
      catchError(err => {
        this.globalErrorService.setError(err.error.message);
        return of();
      })
    );
  }

  changeTodolistTitle(todo_id: number, title: string): Observable<{ todo_id: number, title: string }> {
    return this.http.put<ChangeNameAPIResponce>(`${this.BASE_URL}/${todo_id}`, {title}).pipe(
      map(res => (
          {
            todo_id: todo_id, title: res.title
          }
        )
      ),
      catchError(err => {
        this.globalErrorService.setError(err.error.message);
        return of();
      })
    );
  }

  deleteTodolist(todo_id: number) {
    return this.http.delete<MessageAPIResponce>(`${this.BASE_URL}/${todo_id}`).pipe(
      map(res => Number(res.id)),
      catchError(err => {
        this.globalErrorService.setError(err.error.message);
        return of();
      })
    );
  }
}

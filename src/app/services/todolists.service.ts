import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class TodolistsService {


  constructor(private apiService: ApiService) {
  }


  getTodolists() {
    return this.apiService.getTodolists();
  }

  createTodolist(title: string) {
    return this.apiService.createTodolist(title);
  }

  changeTodolistTitle(todo_id: number, title: string) {
    return this.apiService.changeTodolistName(todo_id, title);
  }

  deleteTodolist(todo_id: number) {
    return this.apiService.deleteTodolist(todo_id);
  }
}

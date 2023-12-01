import {Injectable} from '@angular/core';
import {ITodolist} from "../models/todolists";
import {todolists} from '../data/todolists'
import {TasksService} from "./tasks.service";

@Injectable({
  providedIn: 'root'
})
export class TodolistsService {
  constructor(private taskService: TasksService) {
    this.todolists = todolists
  }

  todolists: ITodolist[] = []

  createTodolist(title: string) {
    const id = Date.now().toString()
    this.todolists.push({id, title, filter: 'all'})
    this.taskService.onCreateNewTodolist(id)
  }

  changeTodolistTitle(todo_id: string, title: string) {
    this.todolists = this.todolists.map(tdl => tdl.id === todo_id ? {...tdl, title} : {...tdl})
  }

  deleteTodolist(todo_id: string) {
    this.todolists = this.todolists.filter(tdl => tdl.id !== todo_id)
    this.taskService.onDeleteTodolist(todo_id)
  }
}

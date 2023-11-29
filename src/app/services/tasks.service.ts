import {Injectable} from '@angular/core';
import {ITasks} from "../models/tasks";
import {tasks} from '../data/tasks'

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: ITasks = {}

  constructor() {
    this.tasks = tasks
  }

  createTask(todo_id: string, title: string) {
    this.tasks = {...this.tasks, [todo_id]: [{id: Date.now().toString(), title, isDone: false}, ...this.tasks[todo_id]]}
    console.log(this.tasks)
  }

  onCreateNewTodolist(id: string) {
    this.tasks = {...this.tasks, [id]: []}
  }

}

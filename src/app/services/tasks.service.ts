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
  }

  onCreateNewTodolist(id: string) {
    this.tasks = {...this.tasks, [id]: []}
  }

  onDeleteTodolist(id: string) {
    delete this.tasks[id]
  }

  changeTaskName(todo_id: string, id: string, title: string) {
    this.tasks = {
      ...this.tasks,
      [todo_id]: this.tasks[todo_id].map((task) => task.id === id ? ({...task, title}) : {...task})
    }
  }

  deleteTask(todo_id: string, id: string) {
    this.tasks = {
      ...this.tasks, [todo_id]: this.tasks[todo_id].filter(task => task.id != id)
    }
  }
}

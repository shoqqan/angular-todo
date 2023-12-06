import { Injectable } from '@angular/core';
import { ITasks } from '../models/tasks';
import { tasks } from '../data/tasks';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks$: BehaviorSubject<ITasks> = new BehaviorSubject(tasks);


  createTask(todo_id: string, title: string) {
    this.tasks$.next({
      ...this.tasks$.value,
      [todo_id]: [{id: Date.now().toString(), title, isDone: false}, ...this.tasks$.value[todo_id]]
    });
  }

  onCreateNewTodolist(id: string) {
    this.tasks$.next({...this.tasks$.value, [id]: []});
  }

  onDeleteTodolist(id: string) {
    const updatedTasks = {...this.tasks$.value};
    delete updatedTasks[id];
    this.tasks$.next(updatedTasks);
  }

  changeTaskName(todo_id: string, id: string, title: string) {

    this.tasks$.next(
      {
        ...this.tasks$.value,
        [todo_id]: this.tasks$.value[todo_id].map((task) => task.id === id ? ({...task, title}) : {...task})
      }
    );
  }

  deleteTask(todo_id: string, id: string) {

    this.tasks$.next({...this.tasks$.value, [todo_id]: this.tasks$.value[todo_id].filter(task => task.id != id)});
  }

  changeTaskStatus(todo_id: string, id: string, status: boolean) {
    this.tasks$.next(
      {
        ...this.tasks$.value,
        [todo_id]: this.tasks$.value[todo_id].map((el) => (el.id === id ? {...el, isDone: status} : {...el}))
      }
    );
  }
}

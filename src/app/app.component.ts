import { Component, OnInit } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { TodolistsService } from './services/todolists.service';
import { ITodolist } from './models/todolists';
import { ITasks } from './models/tasks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  todolists: ITodolist[] = [];
  tasks: ITasks = {};

  constructor(
    public tasksService: TasksService,
    public todolistsService: TodolistsService
  ) {
  }

  ngOnInit(): void {
    this.todolistsService.todolists$.subscribe((tdl) => {
      this.todolists = tdl;
    });
    this.tasksService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }


}

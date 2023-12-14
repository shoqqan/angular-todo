import { Component, OnInit } from '@angular/core';
import { ITodolist } from '../../models/todolists';
import { ITasks } from '../../models/tasks';
import { TasksService } from '../../services/tasks.service';
import { TodolistsService } from '../../services/todolists.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todolists-page',
  templateUrl: './todolists-page.component.html',
})
export class TodolistsPageComponent implements OnInit {
  todolists: ITodolist[] = [];
  tasks: ITasks = {};

  constructor(
    private tasksService: TasksService,
    private todolistsService: TodolistsService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  createTodolist(title: string) {
    this.todolistsService.createTodolist(title);
  }

  onLogout() {
    localStorage.removeItem('token');
    this.authService.currentUserSig.set(null);
    this.router.navigateByUrl('sign-in');


  }

  ngOnInit(): void {
    this.todolistsService.todolists$.subscribe((tdl) => {
      this.todolists = tdl;
    });
    this.tasksService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.todolistsService.getTodolists();
  }

}

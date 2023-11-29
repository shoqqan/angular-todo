import {Component} from '@angular/core';
import {TasksService} from "./services/tasks.service";
import {TodolistsService} from "./services/todolists.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  constructor(
    public tasksService: TasksService,
    public todolistsService: TodolistsService
  ) {
  }


}

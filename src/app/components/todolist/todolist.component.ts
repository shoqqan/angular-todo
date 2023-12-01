import {Component, Input} from '@angular/core';
import {ITask} from "../../models/tasks";
import {TasksService} from "../../services/tasks.service";
import {TodolistsService} from "../../services/todolists.service";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
})
export class TodolistComponent {
  @Input() id: string;
  @Input() title: string
  @Input() tasks: ITask[]

  constructor(
    public tasksService: TasksService,
    public todolistService: TodolistsService
  ) {
    this.id = ''
    this.title = ''
    this.tasks = []
  }

}

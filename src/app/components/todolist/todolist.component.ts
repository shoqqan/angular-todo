import {Component, Input} from '@angular/core';
import {ITask} from "../../models/tasks";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
})
export class TodolistComponent {
  @Input() title: string
  @Input() tasks: ITask[]

  constructor() {
    this.title = ''
    this.tasks = []
  }
}

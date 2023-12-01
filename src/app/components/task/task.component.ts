import {Component, Input} from '@angular/core';
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent {
  @Input() todo_id: string
  @Input() id: string
  @Input() title: string
  @Input() isDone: boolean

  constructor(public taskService: TasksService) {
    this.todo_id=''
    this.id = ''
    this.title = ''
    this.isDone = false
  }
}

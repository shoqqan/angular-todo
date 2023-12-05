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

  constructor(private taskService: TasksService) {
    this.todo_id = ''
    this.id = ''
    this.title = ''
    this.isDone = false
  }

  changeName(title: string) {
    this.taskService.changeTaskName(this.todo_id, this.id, title)
  }

  changeStatus() {
    this.taskService.changeTaskStatus(this.todo_id, this.id, !this.isDone)
  }

  delete() {
    this.taskService.deleteTask(this.todo_id, this.id)
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent {
  @Input() todo_id: number;
  @Input() id: number;
  @Input() title: string;
  @Input() isDone: boolean;
  @Output() deletedTask = new EventEmitter<number>();

  constructor() {
    this.todo_id = 0;
    this.id = 0;
    this.title = '';
    this.isDone = false;
  }

  //TODO
  changeName(title: string) {
    //   // this.taskService.changeTaskName(this.todo_id, this.id, title);
  }

  //
  //TODO
  changeStatus() {
    //   // this.taskService.changeTaskStatus(this.todo_id, this.id, !this.isDone);
  }

  delete() {
    this.deletedTask.emit(this.id);
  }
}

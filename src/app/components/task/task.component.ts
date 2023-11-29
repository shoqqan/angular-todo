import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent {
  @Input() id: string
  @Input() title: string
  @Input() isDone: boolean

  constructor() {
    this.id = ''
    this.title = ''
    this.isDone = false
  }
}

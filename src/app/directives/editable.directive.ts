import {Directive, ElementRef, HostBinding, HostListener, Optional} from '@angular/core';

import {TasksService} from "../services/tasks.service";
import {TodolistsService} from "../services/todolists.service";
import {TodolistComponent} from "../components/todolist/todolist.component";
import {TaskComponent} from "../components/task/task.component";

type componentType = "APP-TASK" | "APP-TODOLIST"

@Directive({
  selector: '[appEditable]'
})
export class EditableDirective {
  constructor(
    private ref: ElementRef,
    private taskService: TasksService,
    private todolistService: TodolistsService,
    private todolistComponent: TodolistComponent,
    @Optional() public taskComponent: TaskComponent
  ) {
  }

  component: componentType = this.ref.nativeElement.parentElement.parentElement.nodeName

  @HostBinding('attr.contenteditable')
  contenteditable = false;

  inputValue = ''

  onChange() {
    if (this.component === "APP-TASK") {
      if (this.inputValue.trim().length === 0) {
        this.contenteditable = false
        this.inputValue = this.taskService.tasks[this.todolistComponent.id].find(el => el.id === this.taskComponent.id)!.title
      }
      this.taskService.changeTaskName(this.todolistComponent.id, this.taskComponent.id, this.inputValue)
    } else {
      if (this.inputValue.trim().length === 0) {
        this.contenteditable = false
        this.inputValue = this.todolistService.todolists.find(tdl => tdl.id === this.todolistComponent.id)!.title
      }
      this.todolistService.changeTodolistTitle(this.todolistComponent.id, this.inputValue)
    }
  }

  @HostListener('click')
  edit() {
    this.contenteditable = true
  }

  @HostListener('input', ['$event.target.textContent'])
  onInput(value: string) {
    this.inputValue = value
  }

  @HostListener('blur', ['$event'])
  onBlur() {
    this.onChange()
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.onChange()
    }
  }
}

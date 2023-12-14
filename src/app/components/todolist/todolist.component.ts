import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../models/tasks';
import { TodolistsService } from '../../services/todolists.service';
import { FilterType } from '../../models/todolists';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
})
export class TodolistComponent implements AfterViewInit, OnInit {
  @Input() id: number;
  @Input() title: string;
  @Input() tasks: ITask[] = [];

  filter: FilterType = 'all';
  filteredTasks: ITask[] = [];

  constructor(
    private todolistService: TodolistsService,
    private taskService: TasksService
  ) {
    this.id = 0;
    this.title = '';
  }


  onChangeFilter(filter: FilterType) {
    this.filter = filter;
  }

  createTask(title: string) {
    this.taskService.createTask(this.id, title);
  }

  changeTitle(title: string) {
    this.todolistService.changeTodolistTitle(this.id, title);
  }

  delete() {
    this.todolistService.deleteTodolist(this.id);
  }

  ngOnInit(): void {
    this.taskService.getTasksOfTodolist(this.id);
  }

  ngAfterViewInit(): void {
    this.filteredTasks = this.tasks;
  }

}

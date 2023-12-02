import {AfterViewInit, Component, Input} from '@angular/core';
import {ITask} from "../../models/tasks";
import {TasksService} from "../../services/tasks.service";
import {TodolistsService} from "../../services/todolists.service";
import {FilterType} from "../../models/todolists";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
})
export class TodolistComponent implements AfterViewInit {
  @Input() id: string;
  @Input() title: string
  @Input() tasks: ITask[]
  filter: FilterType = 'all'
  filteredTasks: ITask[] = []

  constructor(
    public tasksService: TasksService,
    public todolistService: TodolistsService
  ) {
    this.id = ''
    this.title = ''
    this.tasks = []
  }

  onChangeFilter(filter: FilterType) {
    switch (filter) {
      case "all": {
        this.filter = "all"
        return this.filteredTasks = this.tasksService.tasks[this.id]
      }
      case "active": {
        this.filter = "active"
        return this.filteredTasks = this.tasksService.tasks[this.id].filter(el => !el.isDone)
      }
      case "done": {
        this.filter = "done"
        return this.filteredTasks = this.tasksService.tasks[this.id].filter(el => el.isDone)
      }
    }
  }

  ngAfterViewInit(): void {
    this.filteredTasks = this.tasks
  }
}

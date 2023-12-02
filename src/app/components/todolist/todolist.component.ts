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
    this.filter = filter
  }

  ngAfterViewInit(): void {
    this.filteredTasks = this.tasks
  }
}

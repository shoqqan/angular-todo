import { AfterViewInit, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../../models/tasks';
import { FilterType } from '../../models/todolists';
import { TasksService } from '../../services/tasks.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
})
export class TodolistComponent implements AfterViewInit, OnInit {
  @Input() id: number;
  @Input() title: string;
  @Output() deletedTodolist = new EventEmitter<number>();
  @Output() changedTitleOfTodolist = new EventEmitter<{ id: number, title: string }>();
  tasks: ITask[] = [];
  filter: FilterType = 'all';
  filteredTasks: ITask[] = [];
  isLoading = false;
  private destroyRef = inject(DestroyRef);

  constructor(
    private taskService: TasksService
  ) {
    this.id = 0;
    this.title = '';
  }


  onChangeFilter(filter: FilterType) {
    this.filter = filter;
  }

  createTask(title: string) {
    this.isLoading = true;
    this.taskService.createTask(this.id, title).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(task => {
        this.tasks.unshift(task);
        this.isLoading = false;
      }
    );
  }

  changeTitle(title: string) {
    this.changedTitleOfTodolist.emit({id: this.id, title: title});
  }

  delete() {
    this.deletedTodolist.emit(this.id);
  }

  deleteTask(task_id: number) {
    this.isLoading = true;
    this.taskService.deleteTask(this.id, task_id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(id => {
        this.tasks = this.tasks.filter(el => el.id !== id);
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.taskService.getTasksOfTodolist(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(tasks => {
      this.tasks = tasks;
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    this.filteredTasks = this.tasks;
  }

}

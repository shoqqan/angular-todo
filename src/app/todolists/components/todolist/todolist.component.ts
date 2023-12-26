import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { FilterType } from '../../interfaces/todolists';
import { Task } from '../../../tasks/interfaces/tasks';
import { TasksService } from '../../../tasks/services/tasks.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
})
export class TodolistComponent implements OnInit {
  @Input() id: number;
  @Input() title: string;
  @Output() deletedTodolist = new EventEmitter<number>();
  @Output() changedTitleOfTodolist = new EventEmitter<{ id: number, title: string }>();
  tasks: Task[] = [];
  filter: FilterType = FilterType.ALL;
  isLoading = false;
  protected readonly FilterType = FilterType;
  private destroyRef = inject(DestroyRef);

  constructor(
    private taskService: TasksService,
  ) {
    this.id = 0;
    this.title = '';
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.taskService.getTasksOfTodolist(this.id).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => {
        this.isLoading = false;
      })).subscribe(
      tasks => {
        this.tasks = tasks;
        this.isLoading = false;
      });
  }

  onChangeFilter(filter: FilterType) {
    this.filter = filter;
  }

  createTask(title: string) {
    this.isLoading = true;
    this.taskService.createTask(this.id, title).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => {
        this.isLoading = false;
      })).subscribe(
      task => {
        this.tasks.unshift(task);
      },
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
    this.taskService.deleteTask(this.id, task_id).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(
      id => {
        this.tasks = this.tasks.filter(el => el.id !== id);
        this.isLoading = false;
      },
    );
  }
}

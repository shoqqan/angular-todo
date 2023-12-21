import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../../models/tasks';
import { FilterType } from '../../models/todolists';
import { TasksService } from '../../services/tasks.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GlobalErrorService } from '../../services/global-error.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
})
export class TodolistComponent implements OnInit {
  @Input() id: number;
  @Input() title: string;
  @Output() deletedTodolist = new EventEmitter<number>();
  @Output() changedTitleOfTodolist = new EventEmitter<{ id: number, title: string }>();
  tasks: ITask[] = [];
  filter: FilterType = 'all';
  isLoading = false;
  private destroyRef = inject(DestroyRef);

  constructor(
    private taskService: TasksService,
    private globalErrorService: GlobalErrorService
  ) {
    this.id = 0;
    this.title = '';
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
      error => {
        this.globalErrorService.setError(error.error.message);
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
      error => {
        console.log('error');
        this.globalErrorService.setError(error.error.message);
      }
    );
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
      },
      error => {
        this.globalErrorService.setError(error.error.message);
      });
  }


}

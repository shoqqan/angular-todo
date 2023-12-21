import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ITodolist } from '../../models/todolists';
import { TodolistsService } from '../../services/todolists.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { GlobalErrorService } from '../../services/global-error.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  todolists: ITodolist[] = [];
  isLoading = false;
  private destroyRef = inject(DestroyRef);

  constructor(
    private todolistsService: TodolistsService,
    private authService: AuthService,
    private router: Router,
    private globalErrorService: GlobalErrorService
  ) {
  }

  get error() {
    return this.globalErrorService.errorMessage;
  }

  createTodolist(title: string) {
    this.isLoading = true;
    this.todolistsService.createTodolist(title).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => {
        this.isLoading = false;
      })).subscribe(
      tdl => {
        this.todolists.push(tdl);
      },
      error => {
        this.globalErrorService.setError(error.error.message);
      },
    );
  }

  delete(id: number) {
    this.isLoading = true;
    this.todolistsService.deleteTodolist(id).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(
      id => {
        this.todolists = this.todolists.filter(tdl => tdl.id !== id);
        this.isLoading = false;
      },
      error => {
        this.globalErrorService.setError(error.error.message);
      },
    );
  }

  changeTitle(id: number, title: string) {
    this.isLoading = true;
    this.todolistsService.changeTodolistTitle(id, title).pipe(takeUntilDestroyed(this.destroyRef)).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(
      values => {
        this.todolists = this.todolists.map(tdl => tdl.id === values.todo_id ? {
          ...tdl,
          title: values.title
        } : {...tdl});
        this.isLoading = false;
      },
      error => {
        this.globalErrorService.setError(error.error.message);
      },
    );
  }

  onLogout() {
    this.authService.setUser(null);
    this.router.navigateByUrl('sign-in');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.todolistsService.getTodolists().pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => {
        this.isLoading = false;
      })).subscribe(
      tdls => {
        this.todolists = tdls;
        this.isLoading = false;
      },
      error => {
        if (error.status == 401) {
          this.authService.setUser(null);
          this.router.navigateByUrl('sign-in');
        } else {
          this.globalErrorService.setError(error.error.message);
        }
      },
    );
  }
}

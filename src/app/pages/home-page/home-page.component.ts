import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ITodolist } from '../../models/todolists';
import { TodolistsService } from '../../services/todolists.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  ) {
  }

  createTodolist(title: string) {
    this.isLoading = true;
    this.todolistsService.createTodolist(title).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(tdl => {
      this.todolists.push(tdl);
      this.isLoading = false;
    });
  }

  delete(id: number) {
    this.isLoading = true;
    this.todolistsService.deleteTodolist(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(id => {
      this.todolists = this.todolists.filter(tdl => tdl.id !== id);
      this.isLoading = false;
      pipe(
        takeUntilDestroyed()
      );
    });
  }

  changeTitle(id: number, title: string) {
    this.isLoading = true;
    this.todolistsService.changeTodolistTitle(id, title).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(values => {
      this.todolists = this.todolists.map(tdl => tdl.id === values.todo_id ? {
        ...tdl,
        title: values.title
      } : {...tdl});
      this.isLoading = false;
    });
  }

  onLogout() {
    this.authService.setUser(null);
    this.router.navigateByUrl('sign-in');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.todolistsService.getTodolists().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(tdls => {
      this.todolists = tdls;
      this.isLoading = false;
    });
  }
}

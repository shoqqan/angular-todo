import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todolist-skeleton',
  templateUrl: './todolist-skeleton.component.html',
})
export class TodolistSkeletonComponent {
  @Input() isLoading: boolean;
  protected readonly Array = Array;

  constructor() {
    this.isLoading = true;
  }
}

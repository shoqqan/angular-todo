import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todolist-skeleton',
  templateUrl: './todolist-skeleton.component.html',
})
export class TodolistSkeletonComponent {
  @Input() count = 1;
  protected readonly Array = Array;
}

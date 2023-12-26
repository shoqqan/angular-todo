import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-skeleton',
  templateUrl: './task-skeleton.component.html',
})
export class TaskSkeletonComponent {
  @Input() isLoading: boolean;

  constructor() {
    this.isLoading = true;
  }
}

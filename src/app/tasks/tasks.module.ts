import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { EditableDirective } from '../directives/editable/editable.directive';
import { TaskSkeletonComponent } from './components/task/task-skeleton/task-skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  exports: [TaskComponent, TaskSkeletonComponent],
  declarations: [
    TaskComponent,
    TaskSkeletonComponent
  ],
  imports: [
    CommonModule,
    EditableDirective,
    NgxSkeletonLoaderModule
  ]
})
export class TasksModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistComponent } from './components/todolist/todolist.component';
import { FilterTasksPipe } from './pipes/filter-tasks.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksModule } from '../tasks/tasks.module';
import { AddItemFormComponent } from '../components/add-item-form/add-item-form.component';
import { EditableDirective } from '../directives/editable.directive';
import { TodolistSkeletonComponent } from './components/todolist/todolist-skeleton/todolist-skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  exports: [
    TodolistComponent,
    TodolistSkeletonComponent
  ],
  declarations: [
    TodolistComponent,
    FilterTasksPipe,
    TodolistSkeletonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EditableDirective,
    TasksModule,
    ReactiveFormsModule,
    AddItemFormComponent,
    NgxSkeletonLoaderModule
  ]
})
export class TodolistsModule {
}

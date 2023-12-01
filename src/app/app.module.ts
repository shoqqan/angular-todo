import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TodolistComponent} from './components/todolist/todolist.component';
import {TaskComponent} from './components/task/task.component';
import {AddItemFormComponent} from './components/add-item-form/add-item-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditableDirective} from './directives/editable.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    TaskComponent,
    AddItemFormComponent,
    EditableDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

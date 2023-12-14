import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { TaskComponent } from './components/task/task.component';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditableDirective } from './directives/editable.directive';
import { FilterTasksPipe } from './pipe/filter-tasks.pipe';
import { TodolistsPageComponent } from './pages/todolists-page/todolists-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NumberRegexDirective } from './directives/number-regex.directive';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    TaskComponent,
    AddItemFormComponent,
    EditableDirective,
    FilterTasksPipe,
    TodolistsPageComponent,
    LoginPageComponent,
    NumberRegexDirective,
    RegistrationPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

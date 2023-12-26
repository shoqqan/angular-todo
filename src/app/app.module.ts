import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NumberRegexDirective } from './directives/number-regex.directive';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { TodolistsModule } from './todolists/todolists.module';
import { EditableDirective } from './directives/editable.directive';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
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
    NgxSkeletonLoaderModule,
    TodolistsModule,
    AddItemFormComponent,
    EditableDirective
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

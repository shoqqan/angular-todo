import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistsPageComponent } from './pages/todolists-page/todolists-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { loginGuard } from './guards/login.guard';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'login', component: LoginPageComponent},
  {path: 'home', component: TodolistsPageComponent, canActivate: [loginGuard]},
  {path: 'register', component: RegistrationPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

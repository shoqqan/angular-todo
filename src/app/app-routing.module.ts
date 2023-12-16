import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistsPageComponent } from './pages/todolists-page/todolists-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { notLoggedInGuard } from './guards/not-logged-in.guard';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { loggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: LoginPageComponent, canActivate: [loggedInGuard]},
  {path: 'home', component: TodolistsPageComponent, canActivate: [notLoggedInGuard]},
  {path: 'sign-up', component: RegistrationPageComponent, canActivate: [loggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

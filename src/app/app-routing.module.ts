import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { notLoggedInGuard } from './guards/not-logged-in/not-logged-in.guard';
import { loggedInGuard } from './guards/logged-in/logged-in.guard';
import { AuthResolver } from './resolvers/auth.resolver';

const routes: Routes = [
  {
    path: '', redirectTo: 'sign-in', pathMatch: 'full', resolve: {
      auth: AuthResolver
    }
  },
  {path: 'sign-in', component: LoginPageComponent, canActivate: [loggedInGuard]},
  {path: 'home', component: HomePageComponent, canActivate: [notLoggedInGuard]},
  {path: 'sign-up', component: RegistrationPageComponent, canActivate: [loggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

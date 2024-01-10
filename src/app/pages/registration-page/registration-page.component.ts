import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
})
export class RegistrationPageComponent {
  form = new FormGroup({
    telegram_id: new FormControl<string>('', [
      Validators.required
    ]),
    login: new FormControl<string>('', [
      Validators.required,
    ]),
    password: new FormControl<string>('', [
      Validators.required
    ]),
    secondPassword: new FormControl<string>('', [
      Validators.required
    ])
  });
  signUpBtnClicked = false;
  errorMessage = '';
  private destroyRef = inject(DestroyRef);

  constructor(private authService: AuthService, private router: Router) {
  }

  private get telegram_id() {
    return this.form.getRawValue().telegram_id;
  }

  private get login() {
    return this.form.getRawValue().login;
  }

  private get password() {
    return this.form.getRawValue().password;
  }

  private get secondPassword() {
    return this.form.getRawValue().secondPassword;
  }

  onRegister() {
    this.signUpBtnClicked = true;
    if (this.form.valid) {
      if (this.password === this.secondPassword) {
        this.authService.registration(Number(this.telegram_id), this.login!, this.password!).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            this.authService.setUser(result);
            this.router.navigateByUrl('/home');
          },
          error => {
            this.errorMessage = error.message;
          }
        );
      } else {
        this.errorMessage = 'Passwords are not the same.';
      }

    }

  }

  redirectToSignIn() {
    this.router.navigateByUrl('sign-in');
  }


}

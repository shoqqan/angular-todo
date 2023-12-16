import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  form = new FormGroup({
    telegram_id: new FormControl<string>('', [
      Validators.required
    ]),
    login: new FormControl<string>('', [
      Validators.required,
    ]),
    password: new FormControl<string>('', [
      Validators.required
    ])
  });
  loginBtnClicked = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    this.form.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(() => {
      this.errorMessage = '';
    });
  }


  onLogin() {
    this.loginBtnClicked = true;
    if (this.form.valid)
      this.authService.login(Number(this.form.getRawValue().telegram_id), this.form.getRawValue().login!, this.form.getRawValue().password!).subscribe(() => {
          this.router.navigateByUrl('/home');
        },
        () => {
          this.errorMessage = 'Wrong password or login. Please try again.';
        }
      );
  }

  redirectToSignUp() {
    this.router.navigateByUrl('/sign-up');
  }


}

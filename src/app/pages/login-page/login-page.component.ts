import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
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
  errorMessage = '';
  loginBtnClicked = false;
  private destroyRef = inject(DestroyRef);

  constructor(private authService: AuthService, private router: Router) {

  }

  private get telegram_id() {
    return Number(this.form.getRawValue().telegram_id);
  }

  private get login() {
    return this.form.getRawValue().login;
  }

  private get password() {
    return this.form.getRawValue().password;
  }


  onLogin() {
    this.loginBtnClicked = true;
    if (this.form.valid)
      this.authService.login(this.telegram_id, this.login!, this.password!).subscribe(() => {
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

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.errorMessage = '';
    });
  }


}

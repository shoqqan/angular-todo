import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  loginBtnClicked = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  get telegram_id() {
    return this.form.get('telegram_id')!.value!;
  }

  get login() {
    return this.form.get('login')!.value!;
  }

  get password() {
    return this.form.get('password')!.value!;
  }

  onLogin() {
    this.loginBtnClicked = true;
    if (this.form.valid)
      this.authService.login(Number(this.telegram_id), this.login, this.password).subscribe(result => {
          localStorage.setItem('token', result);
          this.authService.currentUserSig.set(result);
          this.router.navigateByUrl('/home');
        },
        error => {
          this.errorMessage = 'Wrong password or login. Please try again.';
        }
      );
  }

  redirectToSignUp() {
    this.router.navigateByUrl('/sign-up');
  }

  ngOnInit() {
    localStorage.clear();
    this.authService.currentUserSig.set(null);
  }

}

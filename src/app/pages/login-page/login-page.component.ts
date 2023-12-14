import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    this.authService.login(Number(this.telegram_id), this.login, this.password).subscribe(result => {
        localStorage.setItem('token', result);
        this.authService.currentUserSig.set(result);
        this.router.navigateByUrl('/home');
      }
    );
  }
}

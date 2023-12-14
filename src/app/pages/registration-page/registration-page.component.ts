import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
})
export class RegistrationPageComponent implements OnInit {

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

  get secondPassword() {
    return this.form.get('secondPassword')!.value;
  }

  onRegister() {
    this.signUpBtnClicked = true;
    if (this.form.valid) {
      if (this.password === this.secondPassword) {
        this.authService.registration(Number(this.telegram_id), this.login, this.password).subscribe(result => {
            localStorage.setItem('token', result);
            this.authService.currentUserSig.set(result);
            this.router.navigateByUrl('/home');
          },
          error => {
            this.errorMessage = error;
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

  ngOnInit() {
    localStorage.clear();
    this.authService.currentUserSig.set(null);
  }
}

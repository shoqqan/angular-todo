import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<boolean> {
  constructor(private authService: AuthService, private router: Router) {
  }

  resolve(): Observable<boolean> | boolean {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.currentUserSig()) {
    return true;
  } else {
    router.navigateByUrl('/sign-in');
    return false;
  }
};

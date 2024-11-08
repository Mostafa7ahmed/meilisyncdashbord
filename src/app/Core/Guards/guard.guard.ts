import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { inject } from '@angular/core';

export const guardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser.getValue() !== null) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};

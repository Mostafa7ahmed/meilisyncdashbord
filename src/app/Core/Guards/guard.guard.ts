import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { inject } from '@angular/core';

export const guardGuard: CanActivateFn = (route, state) => {
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);

  if (_AuthService.currentUser.getValue() !== null) { return true; }
  else {
    _Router.navigate(['/loghomein'])
    return false;
  }
};

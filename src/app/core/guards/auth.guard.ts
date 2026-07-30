import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AppStateService } from '../state/app-state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const appState = inject(AppStateService);
  const router = inject(Router);

  if (appState.isAuthenticated()) {
    return true;
  }

  // Redirect to home if unauthenticated
  router.navigate(['/']);
  return false;
};

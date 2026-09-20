import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

async function waitUntilReady(auth: AuthService): Promise<void> {
  while (!auth.isReady()) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await waitUntilReady(auth);

  return auth.isLoggedIn() ? true : router.parseUrl('/admin/login');
};

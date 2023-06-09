import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const authservice = inject(AuthService);
  const router: Router = inject(Router);

  const user = await authservice.userSubject;

  if (user) {
    return true
  }else {
    // router.navigate('home') guardare repo andrea
    return false
  }
};


// crea con ng generate guard name

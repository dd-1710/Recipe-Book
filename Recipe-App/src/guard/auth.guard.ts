import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  if(auth.isLoggedIn$){
     return true;
  }else{
    router.navigate(['/login'])
    return false;
  }

};

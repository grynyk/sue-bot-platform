import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private readonly router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('current_user')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

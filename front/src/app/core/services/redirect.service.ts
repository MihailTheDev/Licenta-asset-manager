import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  constructor(private router: Router) {}

  public toLogin() {
    this.router.navigate(['/auth/login']);
  }

  public toRegister() {
    this.router.navigate(['/auth/register']);
  }
  public toHome() {
    this.router.navigate(['/home']);
  }
}

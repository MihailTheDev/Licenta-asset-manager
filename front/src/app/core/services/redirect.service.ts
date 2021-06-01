import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  constructor(private router: Router) {}

  public toLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  public toRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  public toHome(): void {
    this.router.navigate(['/home']);
  }

  public toCreate(): void {
    this.router.navigate(['/create']);
  }

  public toTickets(): void {
    this.router.navigate(['/ticket']);
  }

  public toEditAsset(id: any): void {
    this.router.navigate(['/edit/' + id]);
  }
}

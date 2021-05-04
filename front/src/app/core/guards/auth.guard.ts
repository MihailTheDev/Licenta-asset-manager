import { CanActivate } from '@angular/router';

export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    const storageItem: string | null = sessionStorage.getItem('loggedIn');
    if (!storageItem) {
      return false;
    }

    const loggedIn = JSON.parse(storageItem);
    if (loggedIn) {
      return true;
    }

    return false;
  }
}

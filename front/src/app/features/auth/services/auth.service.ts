import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public login(loginObject: any): Observable<any> {
    return of(loginObject);
  }

  public register(registerObject: any): Observable<any> {
    return of(registerObject);
  }
}

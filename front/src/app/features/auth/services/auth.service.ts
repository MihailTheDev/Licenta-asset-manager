import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RegisterModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8000/register';

  constructor(private http: HttpClient) {}

  public login(loginObject: any): Observable<any> {
    return of(loginObject);
  }

  public register(registerObject: RegisterModel): Observable<any> {
    return this.http.post(this.url, registerObject);
  }
}

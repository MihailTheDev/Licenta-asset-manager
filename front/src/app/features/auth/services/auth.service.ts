import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RegisterModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  public login(loginObject: any): Observable<any> {
    const params = new HttpParams()
      .set('username', loginObject.username)
      .set('password', loginObject.password);

    return this.http.get(this.url + '/login', { params });
  }

  public register(registerObject: RegisterModel): Observable<any> {
    return this.http.post(this.url + '/register', registerObject);
  }
}

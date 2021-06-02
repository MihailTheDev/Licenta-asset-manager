import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private url = 'http://localhost:8000/statistics';
  constructor(private http: HttpClient) {}

  public getTickets(user: any): Observable<any> {
    const params: HttpParams = new HttpParams().set('user', user);

    return this.http.get(this.url + '/ticket', { params });
  }

  public getAssigns(user: any): Observable<any> {
    const params: HttpParams = new HttpParams().set('user', user);

    return this.http.get(this.url + '/assign', { params });
  }

  public getObjects(user: any): Observable<any> {
    const params: HttpParams = new HttpParams().set('user', user);

    return this.http.get(this.url + '/object', { params });
  }
}

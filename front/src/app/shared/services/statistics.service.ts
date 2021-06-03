import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private url = environment.API_URL + '/statistics';
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

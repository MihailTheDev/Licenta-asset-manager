import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignService {
  private url = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  public getUserAssigns(user: string, status?: string): Observable<any> {
    const params: HttpParams = new HttpParams().set('role', 'user').set('user', user);
    if (status) {
      params.set('status', status);
    }
    return this.http.get(this.url + '/assign', { params });
  }

  public getAdminAssigns(pageSize: any, pageNumber: any, status?: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('role', 'admin')
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    if (status) {
      params.set('status', status);
    }

    return this.http.get(this.url + '/assign', { params });
  }

  public updateStatus(assignId: any, status: string): Observable<any> {
    return this.http.patch(this.url + '/assign/' + assignId, { status });
  }
}

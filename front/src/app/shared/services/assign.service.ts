import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignService {
  private url = 'http://localhost:8000/assign';

  constructor(private http: HttpClient) {}

  public createAssign(bodyObject: any): Observable<any> {
    return this.http.post(`${this.url}`, bodyObject);
  }

  public getAdminAssigns(pageSize: any, pageNumber: any, status?: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('role', 'admin')
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    if (status) {
      params.set('status', status);
    }

    return this.http.get(this.url, { params });
  }

  public getUserAssigns(
    user: string,
    pageSize: any,
    pageNumber: any,
    status?: string,
  ): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('role', 'user')
      .set('user', user)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    if (status) {
      params.set('status', status);
    }
    return this.http.get(this.url, { params });
  }

  public updateStatus(assignId: any, status: string): Observable<any> {
    return this.http.patch(this.url + assignId, { status });
  }
}

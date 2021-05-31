import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private url = 'http://localhost:8000/ticket';

  constructor(private http: HttpClient) {}

  public createTicket(bodyObject: any): Observable<any> {
    return this.http.post(`${this.url}`, bodyObject);
  }

  public getAdminTickets(pageSize: any, pageNumber: any, status?: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('role', 'admin')
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    if (status !== undefined) {
      params.set('status', status);
    }

    return this.http.get(this.url, { params });
  }

  public getUserTicket(
    user: string,
    pageSize: any,
    pageNumber: any,
    status?: string,
  ): Observable<any> {
    let params: HttpParams = new HttpParams()
      .set('role', 'user')
      .set('user', user)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    console.log(status);

    if (status !== undefined) {
      params = params.set('status', status);
      console.log('status good');
    }
    return this.http.get(this.url, { params });
  }

  // public updateStatus(assignId: any, status: string): Observable<any> {
  //   return this.http.patch(this.url + assignId, { status });
  // }
}

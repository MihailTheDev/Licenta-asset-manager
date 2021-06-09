import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SavedLinkService {
  private url = environment.API_URL + '/saved-link';

  constructor(private http: HttpClient) {}

  public saveLink(assetId: string, assetName: string) {
    const username = sessionStorage.getItem('username');
    return this.http.post(this.url, {
      assetId: assetId,
      assetName: assetName,
      user: sessionStorage.getItem('username')?.trim(),
    });
  }

  public getLinks(): Observable<{ savedLink: any[] }> {
    const username = sessionStorage.getItem('username')?.trim() ?? '';
    return this.http.get(`${this.url}/${username}`) as Observable<{ savedLink: any[] }>;
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private url = environment.API_URL + '/asset';

  constructor(private http: HttpClient) {
    console.log(this.url, 13);
  }

  public getAssets(pageNumber: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get(this.url, { params });
  }

  public createAsset(asset: any): Observable<any> {
    return this.http.post(this.url, asset);
  }

  public updateAsset(asset: any, id: any): Observable<any> {
    return this.http.put(this.url + '/' + id, asset);
  }

  public getAssetById(id: any): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalcrudService } from './globalcrud.service';
import { Isync } from '../Interfaces/isync';
import { environment } from '../../../Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  private syncUrl: string;

  constructor(private http: HttpClient) {
    this.syncUrl = `${environment.baseUrl}${environment.syncRoute}`;
  }
  getAll(
    numpage: number = 1,
    pageSize: number = 10,
    search: string
  ): Observable<any> {
    return new GlobalcrudService<Isync>(this.http).getAll(
      this.syncUrl,
      numpage,
      pageSize,
      search
    );
  }

  getSynceById(SynceId: string): Observable<any> {
    return new GlobalcrudService<Isync>(this.http).getById(
      this.syncUrl,
      SynceId
    );
  }

  deleteSynce(SynceId: string): Observable<any> {
    return new GlobalcrudService<Isync>(this.http).delete(
      this.syncUrl,
      SynceId
    );
  }

  addSynce(dataSynce: any): Observable<any> {
    return new GlobalcrudService<Isync>(this.http).add(this.syncUrl, dataSynce);
  }

  updateSynce(dataSynce: any): Observable<any> {
    return new GlobalcrudService<Isync>(this.http).update(
      this.syncUrl,
      dataSynce
    );
  }
}

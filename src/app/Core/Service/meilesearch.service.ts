import { Injectable } from '@angular/core';
import { environment } from '../../../Environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Meilesearch } from '../Interfaces/meilesearch';
import { GlobalcrudService } from './globalcrud.service';

@Injectable({
  providedIn: 'root'
})
export class MeilesearchService {


  private MelieUrl: string;

  constructor( private http: HttpClient) {
    this.MelieUrl = `${environment.baseUrl}${environment.meilisearchRoute}`;
  }

  getAll(numpage: number = 1, pageSize: number = 10 ,search:string): Observable<any> {
    return new GlobalcrudService<Meilesearch>(this.http).getAll(this.MelieUrl, numpage, pageSize, search);
  }

  getMelieById(MelieId: string): Observable<any> {
    return new GlobalcrudService<Meilesearch>(this.http).getById(this.MelieUrl, MelieId);
  }

  deleteMelie(MelieId: string): Observable<any> {
    return new GlobalcrudService<Meilesearch>(this.http).delete(this.MelieUrl, MelieId);
  }

  addMelie(dataMelie: any): Observable<any> {
    return new GlobalcrudService<Meilesearch>(this.http).add(this.MelieUrl, dataMelie);
  }

  updateMelie(dataMelie: any): Observable<any> {
    return new GlobalcrudService<Meilesearch>(this.http).update(this.MelieUrl, dataMelie);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalcrudService<T> {

  constructor(private _HttpClient: HttpClient) {}

  getAll(url: string, numpage: number = 1, pageSize: number = 10, search: string): Observable<T[]> {
    return this._HttpClient.get<T[]>(`${url}/paginate?pageNumber=${numpage}&pageSize=${pageSize}&search=${search}`);
  }

  getById(url: string, id: string): Observable<T> {
    return this._HttpClient.get<T>(`${url}?id=${id}`);
  }

  delete(url: string, id: string): Observable<any> {
    return this._HttpClient.delete(`${url}?id=${id}`);
  }

  add(url: string, data: T): Observable<T> {
    return this._HttpClient.post<T>(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  update(url: string, data: T): Observable<T> {
    return this._HttpClient.put<T>(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }}

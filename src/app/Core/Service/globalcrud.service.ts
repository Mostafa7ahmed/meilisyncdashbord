import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalcrudService<T> {
  token  =localStorage.getItem('TokenMelie')

  constructor(private _HttpClient: HttpClient) {}

  getAll(url: string, numpage?: number , pageSize?: number , search?: string): Observable<T[]> {
    return this._HttpClient.get<T[]>(`${url}/paginate?pageNumber=${numpage}&pageSize=${pageSize}&search=${search}`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}` 
         }
   } );
  }

  getById(url: string, id: string): Observable<T> {
    return this._HttpClient.get<T>(`${url}?id=${id}`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`      }
   } );
  }

  delete(url: string, id: string): Observable<any> {
    return this._HttpClient.delete(`${url}?id=${id}`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`      }
   } );
  }

  add(url: string, data: T): Observable<T> {
    return this._HttpClient.post<T>(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`      }
    });
  }

  update(url: string, data: T): Observable<T> {
    return this._HttpClient.put<T>(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    });
  }}

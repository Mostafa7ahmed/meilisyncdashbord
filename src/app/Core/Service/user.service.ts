import { Injectable } from '@angular/core';
import { GlobalcrudService } from './globalcrud.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../Environment/environment';
import { Iuser } from '../Interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string;


  constructor(private http: HttpClient) {
    this.userUrl = `${environment.baseUrl}${environment.userRoute}`;

  }
  getAll(
    numpage: number = 1,
    pageSize: number = 10,
    search: string
  ): Observable<any> {
    return new GlobalcrudService<Iuser>(this.http).getAll(
      this.userUrl,
      numpage,
      pageSize,
      search
    );
  }

  getUserById(UserId: string): Observable<any> {
    return new GlobalcrudService<Iuser>(this.http).getById(
      this.userUrl,
      UserId
    );
  }

  deleteUser(UserId: string): Observable<any> {
    return new GlobalcrudService<Iuser>(this.http).delete(
      this.userUrl,
      UserId
    );
  }

  addUser(dataUser: any): Observable<any> {
    return new GlobalcrudService<Iuser>(this.http).add(this.userUrl, dataUser);
  }

  updateUser(dataUser: any): Observable<any> {
    return new GlobalcrudService<Iuser>(this.http).update(
      this.userUrl,
      dataUser
    );
  }}

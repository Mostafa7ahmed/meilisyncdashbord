import { Injectable } from '@angular/core';
import { GlobalcrudService } from './globalcrud.service';
import { Observable } from 'rxjs';
import { Isync } from '../Interfaces/isync';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../Environment/environment';
import { IRole } from '../Interfaces/irole';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private roleUrl: string;

  constructor(private http: HttpClient) {
    this.roleUrl = `${environment.baseUrl}${environment.roleRoute}`;
  }
  getAll(
    numpage: number = 1,
    pageSize: number = 10,
    search: string
  ): Observable<any> {
    return new GlobalcrudService<IRole>(this.http).getAll(
      this.roleUrl,
      numpage,
      pageSize,
      search
    );
  }

  getRoleById(RoleId: string): Observable<any> {
    return new GlobalcrudService<Isync>(this.http).getById(
      this.roleUrl,
      RoleId
    );
  }

  deleteRole(RoleId: string): Observable<any> {
    return new GlobalcrudService<Isync>(this.http).delete(
      this.roleUrl,
      RoleId
    );
  }

  addRole(dataRole: any): Observable<any> {
    return new GlobalcrudService<Isync>(this.http).add(this.roleUrl, dataRole);
  }

  updateRole(dataRole: any): Observable<any> {
    return new GlobalcrudService<Isync>(this.http).update(
      this.roleUrl,
      dataRole
    );}
  
  }

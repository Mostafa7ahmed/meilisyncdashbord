import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../Environment/environment';
import { SignIn } from '../Interfaces/auth';
import { jwtDecode } from 'jwt-decode';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient , private _Router:Router) { 
    if (localStorage.getItem('TokenMelie') !== null) {
      this.saveCurrentUser();
    }
  }
  currentUser = new BehaviorSubject(null);

  saveCurrentUser() {
    const token = localStorage.getItem('TokenMelie');
    if (token) {
      this.currentUser.next(jwtDecode(token));
    }
  }

  checkToken() {
    const token: any = localStorage.getItem('TokenMelie');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp! < Date.now() / 1000) {
      this.logout()
    }
  }


  Signin(user: SignIn):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}${environment.loginRoute}`,user,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  logout() {
    localStorage.removeItem('TokenMelie');
    this.currentUser.next(null);
    this._Router.navigate(['/loghomein'])
  }
 
}

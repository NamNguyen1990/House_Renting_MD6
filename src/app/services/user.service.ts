import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {ResponseBody} from "../models/response-body";
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  register(user: User): Observable<ResponseBody> {
    return this.http.post<ResponseBody>(API_URL + '/register', user);
  }

  registerSuccess(token: string): Observable<any> {
    return this.http.get<any>(API_URL + '/confirm-account?token=' + token);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/login', user);
  }

  updatePassword(id: any ,user: User): Observable<User> {
    console.log(user)
    return this.http.put<User>(API_URL + `/users/update-password/${id}`, user);
  }

  userDetail(id: string): Observable<User> {
    return this.http.get<User>(API_URL + `/users/${id}`);
  }

  getUserProfile(id: any): Observable<User> {
    return this.http.get<User>(API_URL + `/users/${id}`);
  }

  updateUserProfile(id: any, user: User): Observable<User> {
    return this.http.put<User>(API_URL + `/users/update-profile/${id}`, user);
  }

  logout() {
    localStorage.removeItem('token');
  }


}

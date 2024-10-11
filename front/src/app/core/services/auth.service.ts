import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.prod";
import {RegisterRequest} from "../models/register-request";
import {LoginRequest} from "../models/login-request";
import {AuthSuccess} from "../models/auth-success";
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathService = '/auth';

  constructor(private httpClient: HttpClient) { }

  public register(registerRequest: RegisterRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${environment.apiCst}${this.pathService}/register`, registerRequest);
  }

  public login(loginRequest: LoginRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${environment.apiCst}${this.pathService}/login`, loginRequest);
  }

  public me(): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiCst}${this.pathService}/me`);
  }

  public updateMe(user: User): Observable<User> {
    return this.httpClient.put<User>(`${environment.apiCst}${this.pathService}/me`, user);
  }
  public logout(): Observable<String> {
    return this.httpClient.delete<String>(`${environment.apiCst}${this.pathService}/logout`, {});
  }
}

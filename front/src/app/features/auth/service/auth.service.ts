import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment.prod";
import {RegisterRequest} from "../../../core/models/register-request";
import {LoginRequest} from "../../../core/models/login-request";
import {AuthSuccess} from "../../../core/models/auth-success";
import {User} from "../../../core/models/user";


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

  public updateMe(user: User): Observable<string> {
    return this.httpClient.put<string>(`${environment.apiCst}${this.pathService}/me`, user, {responseType: 'text' as 'json'});
  }
  public logout(): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiCst}${this.pathService}/logout`, {
      responseType: 'text' as 'json'
    });
  }
}

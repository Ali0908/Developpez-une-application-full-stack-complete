import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {SessionInformation} from "../core/models/session-information";
import {AuthService} from "../features/auth/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public isLogged = false;
  public sessionInformation: SessionInformation | undefined;

  constructor( private authService: AuthService) {
  }

  isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

   logIn(user: SessionInformation): void {
    this.sessionInformation = user;
    this.isLogged = true;
    localStorage.setItem('sessionInformation', JSON.stringify(user));
    // this.next();
  }

   logOut(): void {
    this.sessionInformation = undefined;
    this.isLogged = false;
    this.authService.logout().subscribe();
    // this.next();
  }

  // private next(): void {
  //   this.isLoggedSubject.next(this.isLogged);
  // }
}

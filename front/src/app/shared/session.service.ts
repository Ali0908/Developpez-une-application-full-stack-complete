import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {SessionInformation} from "../core/models/session-information";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public isLogged = false;
  public sessionInformation: SessionInformation | undefined;

  isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public logIn(user: SessionInformation): void {
    this.sessionInformation = user;
    this.isLogged = true;
    this.next();
  }

  public logOut(): void {
    this.sessionInformation = undefined;
    this.isLogged = false;
    this.next();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
}

import { Injectable } from '@angular/core';
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

   logIn(user: SessionInformation): void {
    this.sessionInformation = user;
    this.isLogged = true;
    localStorage.setItem('sessionInformation', JSON.stringify(user));
  }

   logOut(): void {
    this.sessionInformation = undefined;
    this.isLogged = false;
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('sessionInformation');
      },
      error: (message: string) => {
        localStorage.removeItem('sessionInformation');
        console.error(message);
      },
    });
  }
}

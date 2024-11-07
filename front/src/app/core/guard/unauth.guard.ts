import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import { SessionService } from "../session/session.service";

@Injectable({providedIn: 'root'})
export class UnauthGuard implements CanActivate {

  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) {
  }

  public canActivate(): boolean {
    if (this.sessionService.isLogged) {
      this.router.navigate(['posts/feed']);
      return false;
    }
    return true;
  }
}

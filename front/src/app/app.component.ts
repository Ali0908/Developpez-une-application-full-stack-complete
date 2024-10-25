import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SessionService} from "./shared/session.service";
import {Observable} from "rxjs";
import {AuthService} from "./features/auth/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  hideHeader = true;

  constructor(private sessionService: SessionService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }


}

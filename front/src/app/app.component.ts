import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SessionInformation} from "./core/models/session-information";
import {SessionService} from "./shared/session.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  hideHeader = true;

  constructor(private sessionSrv: SessionService) {
  }

  ngOnInit(): void {
  }
}

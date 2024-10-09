import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SharedService} from "./shared/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'front';
  userConnected = false;
  showButtons = false;
  hideHeader = false;
  constructor( private  sharedSrv: SharedService) {
    this.sharedSrv.userConnected$.subscribe({
      next: (userConnected: boolean) => {
        this.userConnected = userConnected;
      },
      error: () => this.userConnected = false
    });
    this.sharedSrv.showButtons$.subscribe({
      next: (showButtons: boolean) => {
        this.showButtons = showButtons;
      },
      error: () => this.showButtons = false
    });
    this.sharedSrv.hideHeader$.subscribe({
      next: (hideHeader: boolean) => {
        this.hideHeader = hideHeader;
      },
      error: () => this.showButtons = false
    });
    }
}

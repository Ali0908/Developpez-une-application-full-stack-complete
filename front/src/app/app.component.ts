import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {SharedService} from "./shared/shared.service";
import {MatAccordion} from "@angular/material/expansion";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  title = 'front';
  userConnected = false;
  showButtons = false;
  hideHeader = false;
  openAccordion = false;
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


  toggleOpening() {
    this.openAccordion = !this.openAccordion;  // Toggle openAccordion state
    if (this.openAccordion) {
      this.accordion.openAll();
    } else {
      this.accordion.closeAll();
    }
  }
}

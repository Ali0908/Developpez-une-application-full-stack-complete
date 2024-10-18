import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  title = 'front';
  userConnected = false;
  showButtons = false;
  hideHeader = false;
  openAccordion = false;
  showFiller = false;
  visibleSidebar = false;
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
  ngOnInit() {
  }
  toggle(){
    this.visibleSidebar = !this.visibleSidebar;
  }
}

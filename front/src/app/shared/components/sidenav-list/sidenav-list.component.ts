import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent {

  @Input() sidenav!: MatSidenav;

  constructor() {
  }

  public onSidenavClose = (): void => {
    //this.sidenavClose.emit();
  }

}

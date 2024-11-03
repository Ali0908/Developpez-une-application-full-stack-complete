import {Component, Input} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() sidenav!: MatSidenav;
  @Input() showHeaderLinks!:boolean;
  @Input() changeColorLink!:boolean;

}

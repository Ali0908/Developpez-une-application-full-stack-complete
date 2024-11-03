import {
  ChangeDetectorRef,
  Component, HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {filter} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  public showMenu: boolean = false;
  public showHeaderLinks: boolean = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  private navEvent!: NavigationEnd;

  constructor( private router: Router, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filter for NavigationEnd events
    ).subscribe(event => {
      // Cast the event to NavigationEnd
       this.navEvent = event as NavigationEnd;
      // Hide the menu if on auth routes
      this.updateHeaderVisibility(this.navEvent.url);
    });
  }
  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateHeaderVisibility(this.navEvent.url);
  }

  private updateHeaderVisibility(url: string): void {
    // Check for mobile screen size
    const isMobileScreen = window.innerWidth < 800;
    if (url === '/') {
      this.showMenu = false;
      this.showHeaderLinks = false;
    } else if ((url === '/login' || url === '/register') && !isMobileScreen) {
      this.showMenu = true;
      this.showHeaderLinks = false;
    } else if ((url === '/login' || url === '/register') && isMobileScreen) {
      this.showMenu = false;
      this.showHeaderLinks = false;
    } else {
      this.showMenu = true;
      this.showHeaderLinks = true;
    }
    this.cd.detectChanges();
  }
}

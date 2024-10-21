import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  openAccordion = false;
  showHeaderLogo = false;
  showHeaderLinks = false;
  showVerticalLine = false;
  showHeaderMobileContent = false;
  isMobile = false;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
             private elementRef: ElementRef) {
  }

  // Detect window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

      // Check if the screen width is less than 500px
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 500;
  }


  toggleHeader() {
    this.openAccordion = !this.openAccordion; }

  ngOnInit() {
    this.checkScreenSize();
    this.detectRouteChange();
  }
  detectRouteChange() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let currentRoute = this.activatedRoute;

        // Traverse to the deepest active route
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }

        // Store the URL using the current activated route
        const currentUrl = this.router.url;  // You can store this URL

        if (!this.isMobile) {
          if (currentUrl === '/') {
            this.showHeaderLogo = false;
            this.showHeaderLinks = false;
            this.showVerticalLine = false;
          } else if (currentUrl === '/login') {
            this.showHeaderLogo = true;
            this.showVerticalLine = true;
            this.showHeaderLinks = false;
          } else if (currentUrl === '/login') {
            this.showHeaderLogo = false;
            this.showHeaderLinks = false;
            this.showVerticalLine = false;
          } else {
            this.showHeaderLogo = true;
            this.showHeaderLinks = true;
            this.showVerticalLine = true;
          }
        }

        if(this.isMobile) {
          if (currentUrl === '/') {
            this.showHeaderMobileContent = false;
          } else if(currentUrl === '/feed') {
            this.showHeaderMobileContent = true;
            this.showHeaderLogo = true;
          }
        }
      }
    });
  }

  closeAccordion() {
    this.openAccordion = false;
  }
}

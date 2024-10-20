import {Component, HostListener, OnInit} from '@angular/core';
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
  isMobile = false;
  constructor(private router: Router, private  activatedRoute: ActivatedRoute) {
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

        if(currentUrl === '/'){
          this.showHeaderLogo = false;
          this.showHeaderLinks = false;
          this.showVerticalLine = false;
        } else if (currentUrl === '/login'){
          this.showHeaderLogo = true;
          this.showVerticalLine = true;
          this.showHeaderLinks = false;
        } else {
          this.showHeaderLogo = true;
          this.showHeaderLinks = true;
          this.showVerticalLine = true;
        }
      }
    });
  }


  closeAccordion() {
    this.openAccordion = false;
  }
}
//
// this.router.events.subscribe(event => {
//   if (event instanceof NavigationEnd) {
//     this.activatedRoute?.title.subscribe({
//       next: (title: string | undefined) => {
//         if (title !== undefined) {
//           currentTitle = title;
//           this.isHomePage = currentTitle === 'Home';
//           this.isLoginPage = currentTitle === 'Login';
//         }
//       }
//     });
//   }
// });

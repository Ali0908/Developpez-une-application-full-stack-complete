import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {AuthSuccess} from "../../core/models/auth-success";
import {LoginRequest} from "../../core/models/login-request";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public onError = false;
  public hideHeader = false;

  public form = this.fb.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  showLogo = false;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private sharedSrv: SharedService,
              ) {
    this.sharedSrv.setUserConnected(true);
    this.sharedSrv.setShowButtons(false);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenWidth();
  }
  ngOnInit() {
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
    this.showLogo = window.innerWidth <= 500;
    this.hideHeader = window.innerWidth <= 500;
    this.sharedSrv.setShowHeader(this.hideHeader);
  }

  public submit(): void {
    const loginRequest = this.form.value as LoginRequest;
    this.authService.login(loginRequest).subscribe({
      next: (response: AuthSuccess) => {
        localStorage.setItem('token', response.token);
        this.sharedSrv.setUserConnected(true);
        this.sharedSrv.setShowButtons(true);
        this.router.navigate(['/feed']);
      },
      error: () => this.onError = true
    });
  }

}

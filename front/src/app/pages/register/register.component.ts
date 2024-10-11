import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {RegisterRequest} from "../../core/models/register-request";
import {AuthSuccess} from "../../core/models/auth-success";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required,Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[!@#$%^&*()_+\-=\[\]{};',.:\/?]).{8,}$/)]]
  });
  public  showLogo = false;
  public hideHeader = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private sharedSrv: SharedService
  ) {
    this.sharedSrv.setUserConnected(true);
    this.sharedSrv.setShowButtons(false);
  }


  public submit(): void {
    const registerRequest = this.form.value as RegisterRequest;
    this.authService.register(registerRequest).subscribe({
        next: (response: AuthSuccess) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['']);
          window.alert('Inscription réussie');
        },
        error: () => {
          window.alert('Inscription échouée');
        },
      });
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

}

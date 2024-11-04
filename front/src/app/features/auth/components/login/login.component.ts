import {ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import { Router} from "@angular/router";
import {AuthSuccess} from "../../../../core/models/auth-success";
import {LoginRequest} from "../../../../core/models/login-request";
import {SessionInformation} from "../../../../core/models/session-information";
import {SessionService} from "../../../../shared/session.service";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public hide: boolean = true;
  public onError: boolean = false;

  public form = this.fb.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  public showLogo: boolean = false;
  private loginSubscription!: Subscription;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private sessionService: SessionService,
              private cd: ChangeDetectorRef,
              private matSnackBar: MatSnackBar
              ) {
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }
  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.showLogo = window.innerWidth < 800;
    this.cd.detectChanges();
  }

  public submit(): void {
    const loginRequest = this.form.value as LoginRequest;
     this.loginSubscription = this.authService.login(loginRequest).subscribe({
      next: (response: AuthSuccess) => {
        localStorage.setItem('token', response.token);
        this.authService.me().subscribe({
          next: (user: SessionInformation) => {
            this.sessionService.logIn(user);
            this.router.navigate(['/posts/feed']);
            this.matSnackBar.open('Connexion réussie', 'Fermer', { duration: 2000 });
          },
          error: () => {
            this.matSnackBar.open('Erreur lors de la connexion', 'Fermer', { duration: 2000 });
          }
        });

      }
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}

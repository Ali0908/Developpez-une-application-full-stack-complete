import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import { Router} from "@angular/router";
import {AuthSuccess} from "../../../../core/models/auth-success";
import {LoginRequest} from "../../../../core/models/login-request";
import {SessionInformation} from "../../../../core/models/session-information";
import {SessionService} from "../../../../shared/session.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public hide = true;
  public onError = false;
  public hideHeader = false;

  public form = this.fb.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  showLogo = false;
  private loginSubscription!: Subscription;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private sessionService: SessionService
              ) {
  }

  ngOnInit() {
  }


  public submit(): void {
    const loginRequest = this.form.value as LoginRequest;
     this.loginSubscription = this.authService.login(loginRequest).subscribe({
      next: (response: AuthSuccess) => {
        localStorage.setItem('token', response.token);
        this.authService.me().subscribe({
          next: (user: SessionInformation) => {
            this.sessionService.logIn(user);
            this.router.navigate(['/feed']);
          }
        });
        error: () => this.onError = true
      }
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}

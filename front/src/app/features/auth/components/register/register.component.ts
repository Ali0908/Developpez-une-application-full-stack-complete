import {ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {RegisterRequest} from "../../../../core/models/register-request";
import {AuthSuccess} from "../../../../core/models/auth-success";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required,Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[!@#$%^&*()_+\-=\[\]{};',.:\/?]).{8,}$/)]]
  });
  public showLogo: boolean = false;
  private registerSubscription!: Subscription;
  public hide = true;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ) {
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
    const registerRequest = this.form.value as RegisterRequest;
    this.registerSubscription = this.authService.register(registerRequest).subscribe({
        next: (response: AuthSuccess) => {
         this.matSnackBar.open(response.toString(), 'Fermer', { duration: 2000 });
          this.router.navigate(['/login']);
        },
        error: () => {
          this.matSnackBar.open('Inscription échouée', 'Fermer', { duration: 2000 });
        },
      });
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }

}

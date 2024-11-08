import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth/service/auth.service";
import {Observable, Subscription} from "rxjs";
import {User} from "../../core/models/user";
import {Router} from "@angular/router";
import {Topic} from "../../core/models/topic";
import {TopicService} from "../subjects/services/topic.service";
import {SessionService} from "../../core/session/session.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  public form = this.fb.group({
    email: ['', [Validators.email]],
    username: ['',],
    password: ['', [Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[!@#$%^&*()_+\-=\[\]{};',.:\/?]).{8,}$/)]]
  });
  private userId!: number;
  public username!: string;
  public email!: string;
  public topicsSubscribed$!: Observable<Topic[]>;
  private updateMeSubscription!: Subscription;
  private unsubscribeTopicSubscription!: Subscription;
  public hide: boolean = true;

  constructor(private fb: FormBuilder,
              private authSrv: AuthService,
              private router: Router,
              private topicSrv: TopicService,
              private sessionService: SessionService,
              private matSnackBar: MatSnackBar,
              private cd: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    const savedSession = localStorage.getItem('sessionInformation');
    if (savedSession) {
      this.sessionService.sessionInformation = JSON.parse(savedSession);
      this.userId = this.sessionService?.sessionInformation?.userId as number;
      this.username = this.sessionService?.sessionInformation?.username as string;
      this.email = this.sessionService?.sessionInformation?.email as string;
      this.topicsSubscribed$ = this.topicSrv.getAllTopicsSubscribedByUserId(this.userId);
    }
  }

  submit(): void {
    const modifiedUser = this.form.value as User
    this.updateMeSubscription= this.authSrv.updateMe(modifiedUser).subscribe({
      next: () => {
        this.matSnackBar.open('Compte mis à jour', 'Fermer', { duration: 2000 });
        this.form.reset();
        this.sessionService.logOut();
        this.router.navigate(['login']);
      },
      error: () => {
        this.matSnackBar.open('Erreur lors de la mise à jour', 'Fermer', { duration: 2000 });
      },
    });
  }

  logout(): void {
    this.sessionService.logOut();
    localStorage.removeItem('token');
    localStorage.removeItem('selectedPost');
    this.matSnackBar.open('Déconnexion réussie', 'Fermer', { duration: 2000 });
    this.router.navigate(['']);
  }

  unsubscribe(topicId: number): void {
    this.unsubscribeTopicSubscription =  this.topicSrv.unsubscribeToTopic({userId: this.userId, topicId: topicId}).subscribe({
      next: () => {
        this.matSnackBar.open('Désabonnement réussi', 'Fermer', { duration: 2000 });
        this.topicsSubscribed$ = this.topicSrv.getAllTopicsSubscribedByUserId(this.userId);
        this.cd.detectChanges();
      },
      error: () => {
        this.matSnackBar.open('Erreur lors du désabonnement', 'Fermer', { duration: 2000 });
      }
    });
    }

  isAnyFieldValid(): boolean {
    return Object.values(this.form.controls).some(control => control.valid);
  }

  ngOnDestroy(): void {
    this.updateMeSubscription?.unsubscribe();
    this.unsubscribeTopicSubscription?.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../shared/shared.service";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../features/auth/service/auth.service";
import {Observable} from "rxjs";
import {User} from "../../core/models/user";
import {Router} from "@angular/router";
import {Topic} from "../../core/models/topic";
import {TopicService} from "../../core/services/topic.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required,Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[!@#$%^&*()_+\-=\[\]{};',.:\/?]).{8,}$/)]]
  });
  userId!: number;
  username!: string;
  email!: string;
  topicsSubscribed$!: Observable<Topic[]>;

  constructor(private fb: FormBuilder,
              private authSrv: AuthService,
              private router: Router,
              private sharedSrv: SharedService,
              private topicSrv: TopicService) {
    this.sharedSrv.loadUser().subscribe({
      next: (data: { userId: number, username: string, email: string }) => {
        this.userId = data.userId;
        this.username = data.username;
        this.email = data.email;
        this.topicsSubscribed$ = this.topicSrv.getAllTopicsSubscribedByUserId(this.userId);
      }
    });
    this.sharedSrv.setUserConnected(true);
    this.sharedSrv.setShowButtons(true);
  }
  ngOnInit(): void {}

  submit() {
    const modifiedUser = this.form.value as User;
    this.authSrv.updateMe(modifiedUser).subscribe({
      next: () => {
        window.alert('Compte mis à jour');
      },
      error: () => {
        window.alert('Erreur lors de la mise à jour');
      },
    });
  }

  logout() {
    this.authSrv.logout();
    window.alert('Déconnexion réussie');
    localStorage.removeItem('token');
    localStorage.removeItem('userConnected');
    this.router.navigate(['']);
  }

  unsubscribe(topicId: number) {
    this.topicSrv.unsubscribeToTopic({userId: this.userId, topicId: topicId}).subscribe({
      next: () => {
        window.alert('Désabonnement réussi');
        location.reload();
      },
      error: () => {
        window.alert('Erreur lors du désabonnement');
      }
    });
    }
}

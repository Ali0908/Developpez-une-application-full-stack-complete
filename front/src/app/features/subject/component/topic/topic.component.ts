import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, Subscription, window} from "rxjs";
import {Topic} from "../../../../core/models/topic";
import {TopicService} from "../../service/topic.service";
import {SharedService} from "../../../../shared/shared.service";
import {SubscriptionTopic} from "../../../../core/models/subscription-topic";
import {SessionService} from "../../../../shared/session.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit, OnDestroy {
  topics$: Observable<Topic[]> = this.topicSrv.getAll();
  topicsByUser$!: Observable<Topic[]>;
  userId!: number;
  private topicSubscription!: Subscription;
  subscribedTopics: Map<number, boolean> = new Map();
  constructor( private topicSrv: TopicService,
               private sessionService: SessionService,
               private matSnackBar: MatSnackBar,
               private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const savedSession = localStorage.getItem('sessionInformation');
    if (savedSession) {
      this.sessionService.sessionInformation = JSON.parse(savedSession);
      this.userId = this.sessionService?.sessionInformation?.userId as number;
      this.topicsByUser$ = this.topicSrv.getAllTopicsSubscribedByUserId(this.userId);
      this.getTopicSubscribed();
    }
  }

  subscribe(topicId: number): void {
    const subscribeObject: SubscriptionTopic = {
      topicId,
      userId: this.userId
    }
    this.topicSubscription = this.topicSrv.subscribeToTopic(subscribeObject).subscribe({
      next: (message: string) => {
        this.matSnackBar.open(message, 'Fermer', { duration: 2000 });
        this.getTopicSubscribed();
      },
      error: () => {
        this.matSnackBar.open('Erreur lors de l\'abonnement', 'Fermer', { duration: 2000 });
      },
    });

  }

  ngOnDestroy(): void {
    this.topicSubscription?.unsubscribe();
  }
  getTopicSubscribed(): void {
    combineLatest([this.topics$, this.topicsByUser$]).subscribe(([allTopics, userTopics]) => {
      userTopics.forEach((userTopic) => {
        this.subscribedTopics.set(userTopic.id, true);
        this.cd.detectChanges()// Mark subscribed topics
      });
    });
  }
}

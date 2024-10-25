import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, window} from "rxjs";
import {Topic} from "../../../../core/models/topic";
import {TopicService} from "../../service/topic.service";
import {SharedService} from "../../../../shared/shared.service";
import {SubscriptionTopic} from "../../../../core/models/subscription-topic";
import {SessionService} from "../../../../shared/session.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit, OnDestroy {
  public topics$: Observable<Topic[]> = this.topicSrv.getAll();
  userId!: number;
  private topicSubscription!: Subscription;
  constructor( private topicSrv: TopicService,
               private sessionService: SessionService,
               private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userId = this.sessionService?.sessionInformation?.userId as number;

  }

  subscribe(topicId: number): void {
    const subscribeObject: SubscriptionTopic = {
      topicId,
      userId: this.userId
    }
    this.topicSubscription = this.topicSrv.subscribeToTopic(subscribeObject).subscribe({
      next: (message: string) => {
        this.matSnackBar.open(message, 'Fermer', { duration: 2000 });
      },
      error: () => {
        this.matSnackBar.open('Erreur lors de l\'abonnement', 'Fermer', { duration: 2000 });
      },
    });

  }

  ngOnDestroy(): void {
    this.topicSubscription?.unsubscribe();
  }
}

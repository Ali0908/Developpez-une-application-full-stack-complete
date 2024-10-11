import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Topic} from "../../core/models/topic";
import {TopicService} from "../../core/services/topic.service";
import {SharedService} from "../../shared/shared.service";
import {SubscriptionTopic} from "../../core/models/subscription-topic";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  public topics$: Observable<Topic[]> = this.topicSrv.getAll();
  userId!: number;
  constructor( private topicSrv: TopicService,
               private sharedSrv: SharedService) {
    this.sharedSrv.loadUser().subscribe({
      next: (data: { userId: number, username: string, email: string }) => {
        this.userId = data.userId;
      }
    });
    this.sharedSrv.setUserConnected(true);
    this.sharedSrv.setShowButtons(true);
  }

  ngOnInit(): void {}

  subscribe(topicId: number): void {
    const subscribeObject: SubscriptionTopic = {
      topicId,
      userId: this.userId
    }
    this.topicSrv.subscribeToTopic(subscribeObject).subscribe({
      next: (message: string) => {
        window.alert(message);
      },
      error: () => {
        window.alert('Erreur lors de l\'abonnement');
      },
    });

  }
}

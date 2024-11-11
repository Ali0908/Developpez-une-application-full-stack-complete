import { Component, OnInit} from '@angular/core';
import {Feed} from "../../../../core/models/feed";
import {Observable} from "rxjs";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {SessionService} from "../../../../core/session/session.service";
import {TopicService} from "../../../subjects/services/topic.service";
import {Topic} from "../../../../core/models/topic";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  private userId!: number;
  public feed$!: Observable<Feed[]>;
  public arrowDownward: boolean = true;
  public arrowUpward: boolean = false;
  public topicsSubscribed$!: Observable<Topic[]>;

  constructor(  private postSrv: PostService,
               private router: Router,
               private sessionService: SessionService,
                private topicSrv: TopicService) {
  }

  ngOnInit(): void {

    const savedSession = localStorage.getItem('sessionInformation');
    if (savedSession) {
      this.sessionService.sessionInformation = JSON.parse(savedSession);
      this.userId = this.sessionService?.sessionInformation?.userId as number;
      this.topicsSubscribed$ = this.topicSrv.getAllTopicsSubscribedByUserId(this.userId);
      this.feed$ = this.postSrv.getFeed(this.userId);
      // Filter feed by topic
      this.topicsSubscribed$.subscribe((topics) => {
        this.feed$ = this.feed$.pipe(
          map((feed: Feed[]) => feed.filter((post) => {
            return topics.some((topic) => topic.id === post.topicId);
          }))
        );
    });
  }
    }

  navigateToCreatePost(): void {
    this.router.navigate(['/posts/create']);
  }

  navigateToDetailPost(post: Feed): void {
    localStorage.setItem('selectedPost', JSON.stringify(post));
    this.router.navigate(['/posts', post.id]);
  }

  toggleSort(): void {
    // Assurez-vous que `topicsSubscribed$` a bien émis avant d'accéder aux topics
    this.topicsSubscribed$.subscribe((topics) => {
      if (this.arrowDownward) {
        // Filtrer les articles par thèmes puis trier par date ascendante
        this.feed$ = this.postSrv.getFeed(this.userId).pipe(
          map((feed: Feed[]) =>
            feed
              .filter((post) => topics.some((topic) => topic.id === post.topicId))
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          )
        );
        this.arrowDownward = false;
        this.arrowUpward = true;
      } else {
        // Filtrer les articles par thèmes puis trier par date descendante
        this.feed$ = this.postSrv.getFeed(this.userId).pipe(
          map((feed: Feed[]) =>
            feed
              .filter((post) => topics.some((topic) => topic.id === post.topicId))
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          )
        );
        this.arrowDownward = true;
        this.arrowUpward = false;
      }
    });
  }

}

import { Component, OnInit} from '@angular/core';
import {Feed} from "../../../../core/models/feed";
import {Observable} from "rxjs";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {SessionService} from "../../../../shared/session.service";

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

  constructor(  private postSrv: PostService,
               private router: Router,
               private sessionService: SessionService) {
  }

  ngOnInit(): void {

    const savedSession = localStorage.getItem('sessionInformation');
    if (savedSession) {
      this.sessionService.sessionInformation = JSON.parse(savedSession);
      this.userId = this.sessionService?.sessionInformation?.userId as number;
      this.feed$ = this.postSrv.getFeed(this.userId);
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
    if (this.arrowDownward) {
      this.feed$ = this.postSrv.getFeed(this.userId).pipe(
        map((feed: Feed[]) => feed.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }))
      );
      this.arrowDownward = false;
      this.arrowUpward = true;
    } else {
      this.feed$ = this.postSrv.getFeed(this.userId).pipe(
        map((feed: Feed[]) => feed.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }))
      );
      this.arrowDownward = true;
      this.arrowUpward = false;
    }
  }
}

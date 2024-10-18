import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SharedService} from "../../shared/shared.service";
import {Feed} from "../../core/models/feed";
import {Observable} from "rxjs";
import {PostService} from "../../core/services/post.service";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  userId!: number;
  feed$!: Observable<Feed[]>;
  arrowDownward = true;
  arrowUpward = false;

  constructor( private sharedSrv: SharedService,
               private postSrv: PostService,
               private router: Router,
               private cd: ChangeDetectorRef) {
    this.sharedSrv.setUserConnected(true);
    this.sharedSrv.setShowButtons(true);
  }

  ngOnInit(): void {
    this.sharedSrv.loadUser().subscribe({
      next: (data: { userId: number, username: string, email: string }) => {
        this.userId = data.userId;
        console.log(data);
        this.feed$ = this.postSrv.getFeed(this.userId);
        this.cd.detectChanges();
      }
    });
  }

  navigateToCreatePost() {
    this.router.navigate(['/post']);
  }

  navigateToDetailPost(post: Feed) {
    this.sharedSrv.getDetailPost(post);
    this.router.navigate(['/detail-post/' + post.id]);
  }

  toggleSort() {
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

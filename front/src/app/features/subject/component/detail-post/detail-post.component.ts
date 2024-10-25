import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from "../../../../shared/shared.service";
import {CommentService} from "../../service/comment.service";
import {map} from "rxjs/operators";
import {Observable, Subscription, window} from "rxjs";
import {Comment} from "../../../../core/models/comment";
import {FormBuilder, Validators} from "@angular/forms";
import {CommentRequest} from "../../../../core/models/comment-request";
import {SessionService} from "../../../../shared/session.service";
import {Feed} from "../../../../core/models/feed";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit, OnDestroy {

  post$ = this.sharedSrv.postDetail$;
  comments$!: Observable<Comment[]>;
  form = this.fb.group({
    comment: ['', [Validators.required]]
  });
  userId!: number;
  private postSubcription!: Subscription;
  private commentSubscription!: Subscription;

  constructor(private sharedSrv: SharedService,
              private commentSrv: CommentService,
              private fb: FormBuilder,
              private sessionService: SessionService,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const savedSession = localStorage.getItem('sessionInformation');
    if (savedSession) {
      this.sessionService.sessionInformation = JSON.parse(savedSession);
      this.userId = this.sessionService?.sessionInformation?.userId as number;
    }

    // Récupère le post depuis localStorage si `post$` est undefined
    const savedPost = localStorage.getItem('selectedPost');
    if (!this.post$ && savedPost) {
      const post = JSON.parse(savedPost) as Feed;
      this.post$ = new Observable<Feed>((subscriber) => {
        subscriber.next(post);
      });
    }
     this.postSubcription = this.post$.pipe(
      map((post) => {
        this.comments$ = this.commentSrv.getComments(post.id);
      })).subscribe();

    this.comments$.subscribe({
      next: () => {}
    });
    }

  submit(postId: number) {
    const comment: CommentRequest = <CommentRequest>{
      content: this.form.value.comment,
      date: new Date(),
      postId: postId,
      authorId: this.userId
    };
    this.commentSubscription = this.commentSrv.create(comment).subscribe({
      next: (message: string) => {
        this.matSnackBar.open(message, 'Fermer', { duration: 2000 });
        location.reload();
      },
      error: () => {
        this.matSnackBar.open('Commentaire non créé', 'Fermer', { duration: 2000 });
      }
    });
  }

  ngOnDestroy(): void {
    this.postSubcription?.unsubscribe();
    this.commentSubscription?.unsubscribe();
  }
}

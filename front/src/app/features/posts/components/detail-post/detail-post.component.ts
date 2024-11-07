import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CommentService} from "../../services/comment.service";
import {Observable, Subscription} from "rxjs";
import {Comment} from "../../../../core/models/comment";
import {FormBuilder, Validators} from "@angular/forms";
import {CommentRequest} from "../../../../core/models/comment-request";
import {SessionService} from "../../../../core/session/session.service";
import {Feed} from "../../../../core/models/feed";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit, OnDestroy {

  public post!: Feed;
  public comments$!: Observable<Comment[]>;
  public form = this.fb.group({
    comment: ['', [Validators.required]]
  });
  private userId!: number;
  private commentSubscription!: Subscription;
  private commentCreateSubscription!: Subscription;

  constructor(
              private commentSrv: CommentService,
              private fb: FormBuilder,
              private sessionService: SessionService,
              private matSnackBar: MatSnackBar,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    const savedSession = localStorage.getItem('sessionInformation');
    if (savedSession) {
      this.sessionService.sessionInformation = JSON.parse(savedSession);
      this.userId = this.sessionService?.sessionInformation?.userId as number;
    }

    const savedPost = localStorage.getItem('selectedPost');
    if(savedPost){
      this.post = JSON.parse(savedPost) as Feed;
      this.comments$ = this.commentSrv.getComments(this.post.id);
    }

    this.commentSubscription = this.comments$.subscribe({
      next: () => {}
    });
    }

  submit(postId: number): void {
    const comment: CommentRequest = <CommentRequest>{
      content: this.form.value.comment,
      date: new Date(),
      postId: postId,
      authorId: this.userId
    };
    this.commentCreateSubscription = this.commentSrv.create(comment).subscribe({
      next: (message: string) => {
        this.matSnackBar.open(message, 'Fermer', { duration: 2000 });
        location.reload();
      },
      error: () => {
        this.matSnackBar.open('Commentaire non créé', 'Fermer', { duration: 2000 });
      },
    });
  }

  ngOnDestroy(): void {
    this.commentSubscription?.unsubscribe();
    this.commentCreateSubscription?.unsubscribe();
  }
}

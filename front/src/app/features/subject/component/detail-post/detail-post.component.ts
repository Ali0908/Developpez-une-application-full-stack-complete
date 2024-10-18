import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../../../shared/shared.service";
import {CommentService} from "../../../../core/services/comment.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Comment} from "../../../../core/models/comment";
import {FormBuilder, Validators} from "@angular/forms";
import {CommentRequest} from "../../../../core/models/comment-request";

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {

  post$ = this.sharedSrv.postDetail$;
  comments$!: Observable<Comment[]>;
  form = this.fb.group({
    comment: ['', [Validators.required]]
  });
  userId!: number;

  constructor(private sharedSrv: SharedService,
              private commentSrv: CommentService,
              private fb: FormBuilder) {
    this.sharedSrv.loadUser().subscribe({
      next: (data: { userId: number, username: string, email: string }) => {
        this.userId = data.userId;
      }
    });
    this.sharedSrv.setUserConnected(true);
    this.sharedSrv.setShowButtons(true);
  }

  ngOnInit(): void {
    this.post$.pipe(
      map((post) => {
        this.comments$ = this.commentSrv.getComments(post.id);
      })).subscribe();

    this.comments$.subscribe({
      next: (comments: Comment[]) => {
        console.log(comments);
      }
    });
    }

  submit(postId: number) {
    const comment: CommentRequest = <CommentRequest>{
      content: this.form.value.comment,
      date: new Date(),
      postId: postId,
      authorId: this.userId
    };
    this.commentSrv.create(comment).subscribe({
      next: (message: string) => {
        window.alert(message);
        location.reload();
      },
      error: () => {
        window.alert('Commentaire non créé');
      }
    });
  }
}

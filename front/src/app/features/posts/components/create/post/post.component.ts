import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Topic} from "../../../../../core/models/topic";
import {TopicService} from "../../../../subjects/services/topic.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Post} from "../../../../../core/models/post";
import {PostService} from "../../../services/post.service";
import {Router} from "@angular/router";
import {SessionService} from "../../../../../core/session/session.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  public topics$: Observable<Topic[]> = this.topicSrv.getAll();
  public form = this.fb.group({
    topic: ['', [Validators.required]],
    postTitle: ['', [Validators.required]],
    postContent: ['', [Validators.required]]
  });
  private userId!: number;
  private postSubscription!: Subscription;

  constructor( private topicSrv: TopicService,
               private fb: FormBuilder,
               private postSrv: PostService,
               private router: Router,
               private sessionService: SessionService,
               private matSnackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.sessionService?.sessionInformation?.userId as number;

  }

  submit(): void {
    const postRequest: Post = <Post>{
      date: new Date(),
      topicId: Number(this.form.value.topic)!,
      title: this.form.value.postTitle!,
      authorId: this.userId,
      content: this.form.value.postContent!,
    }
    this.postSubscription = this.postSrv.create(postRequest).subscribe({
      next: (message: string) => {
        this.matSnackBar.open(message, 'Fermer', { duration: 2000 });
        this.router.navigate(['/feed']);
      },
      error: () => {
        this.matSnackBar.open('Post non créé', 'Fermer', { duration: 2000 });
      }
    });
    }

  ngOnDestroy(): void {
    this.postSubscription?.unsubscribe();
  }
}

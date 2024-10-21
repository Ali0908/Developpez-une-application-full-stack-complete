import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Topic} from "../../../../core/models/topic";
import {TopicService} from "../../service/topic.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Post} from "../../../../core/models/post";
import {SharedService} from "../../../../shared/shared.service";
import {PostService} from "../../service/post.service";
import {Router} from "@angular/router";
import {SessionService} from "../../../../shared/session.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public topics$: Observable<Topic[]> = this.topicSrv.getAll();
  form = this.fb.group({
    topic: ['', [Validators.required]],
    postTitle: ['', [Validators.required]],
    postContent: ['', [Validators.required]]
  });
  userId!: number;

  constructor( private topicSrv: TopicService,
               private fb: FormBuilder,
               private sharedSrv: SharedService,
               private postSrv: PostService,
               private router: Router,
               private sessionService: SessionService
  ) {
    this.sharedSrv.setUserConnected(true);
    this.sharedSrv.setShowButtons(true);
  }

  ngOnInit(): void {
    this.userId = this.sessionService?.sessionInformation?.userId as number;

  }

  submit() {
    const postRequest: Post = <Post>{
      date: new Date(),
      topicId: Number(this.form.value.topic)!,
      title: this.form.value.postTitle!,
      authorId: this.userId,
      content: this.form.value.postContent!,
    }
          this.postSrv.create(postRequest).subscribe({
      next: (message: string) => {
        window.alert(message);
        this.router.navigate(['/feed']);
      },
      error: () => {
        window.alert('Post non créé');
      }
    });
    }
}

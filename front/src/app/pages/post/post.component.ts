import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Topic} from "../../core/models/topic";
import {TopicService} from "../../core/services/topic.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Post} from "../../core/models/post";
import {SharedService} from "../../shared/shared.service";
import {PostService} from "../../core/services/post.service";
import {Router} from "@angular/router";

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
                private router: Router
  ) {
    this.sharedSrv.loadUser().subscribe({
      next: (data: { userId: number, username: string, email: string }) => {
        this.userId = data.userId;
      }
    });
    this.sharedSrv.setUserConnected(true);
    this.sharedSrv.setShowButtons(true);
  }

  ngOnInit(): void {
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

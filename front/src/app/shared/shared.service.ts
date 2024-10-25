import { Injectable } from '@angular/core';
import { User } from './../core/models/user';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {AuthService} from "../features/auth/service/auth.service";
import {Feed} from "../core/models/feed";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  postDetail$!: Observable<Feed>;
  getDetailPost(post: Feed): Observable<Feed> {
    return this.postDetail$ = new Observable<Feed>(subscriber => {
      subscriber.next(post);
    });
  }
}

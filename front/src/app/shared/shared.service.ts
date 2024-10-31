import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
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

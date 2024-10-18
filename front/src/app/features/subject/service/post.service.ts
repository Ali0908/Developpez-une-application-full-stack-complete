import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Feed} from "../../../core/models/feed";
import {Post} from "../../../core/models/post";


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private pathService = '/posts';

  constructor(private httpClient: HttpClient) { }

  getFeed(userId: number): Observable<Feed[]> {
    return this.httpClient.get<Feed[]>(`${environment.apiCst}${this.pathService}/${userId}`);
  }

    create(post: Post): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiCst}${this.pathService}/create`,
      post,
      {responseType: 'text' as 'json'});
  }
}

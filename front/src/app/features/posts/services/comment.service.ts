import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment.prod";
import {Comment} from "../../../core/models/comment";
import {CommentRequest} from "../../../core/models/comment-request";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private pathService = '/comments';


  constructor(private httpClient: HttpClient) { }

  getComments(postId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${environment.apiCst}${this.pathService}/${postId}`);
  }

  create(comment: CommentRequest): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiCst}${this.pathService}/create`,
      comment,
      {responseType: 'text' as 'json'});
  }
}

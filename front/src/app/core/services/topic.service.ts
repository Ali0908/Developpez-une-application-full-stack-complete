import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Topic} from "../models/topic";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {SubscriptionTopic} from "../models/subscription-topic";
@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private pathService = '/topics';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(`${environment.apiCst}${this.pathService}`);
  }

  getAllTopicsSubscribedByUserId(userId: number): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(`${environment.apiCst}${this.pathService}/subscribe/${userId}`);
  }

  unsubscribeToTopic(unsubscribeDto: SubscriptionTopic): Observable<any> {
    return this.httpClient.delete(`${environment.apiCst}${this.pathService}/unsubscribe`, {body: unsubscribeDto});
  }

  subscribeToTopic(subscribeDto: SubscriptionTopic): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiCst}${this.pathService}/subscribe`,
      subscribeDto,
    { responseType: 'text' as 'json' });
  }
}

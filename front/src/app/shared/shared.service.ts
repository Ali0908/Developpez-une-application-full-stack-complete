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
  private storeUserConnected!: any;
  private storeShowButtons!: any;
  private storeHideHeader!: any;
  private userConnectedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private showButtonsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private hideHeaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // Initialize here
  postDetail$!: Observable<Feed>;
  userConnected$: Observable<boolean> = this.userConnectedSubject.asObservable();
  showButtons$: Observable<boolean>= this.showButtonsSubject.asObservable();
  hideHeader$: Observable<boolean>= this.hideHeaderSubject.asObservable();
   constructor( private authSrv: AuthService) {
  }

  setUserConnected(userConnected: boolean): void {
    this.storeUserConnected  = localStorage.setItem('userConnected', String(userConnected));
    this.userConnectedSubject.next(userConnected);
  }
  setShowButtons(showButtons: boolean): void {
    this.storeShowButtons = localStorage.setItem('showButtons', String(showButtons));
    this.showButtonsSubject.next(showButtons);
  }

  setShowHeader(hideHeader: boolean): void {
    this.storeHideHeader = localStorage.setItem('hideHeader', String(hideHeader));
    this.hideHeaderSubject.next(hideHeader);
  }

  getDetailPost(post: Feed): Observable<Feed> {
    return this.postDetail$ = new Observable<Feed>(subscriber => {
      subscriber.next(post);
    });
  }
}

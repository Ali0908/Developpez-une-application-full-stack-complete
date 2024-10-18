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
  private authenticatedUser$!: Observable<User>;
  private userConnectedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private showButtonsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private hideHeaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // Initialize here
  postDetail$!: Observable<Feed>;
  userConnected$: Observable<boolean> = this.userConnectedSubject.asObservable();
  showButtons$: Observable<boolean>= this.showButtonsSubject.asObservable();
  hideHeader$: Observable<boolean>= this.hideHeaderSubject.asObservable();
  constructor( private authSrv: AuthService) {
    this.authenticatedUser$ = this.authSrv.me();
  }


  loadUser(): Observable<{ userId: number, username: string, email: string }> {
    return this.authenticatedUser$.pipe(
      map((user: User) => ({
        userId: user.userId,
        username: user.username,
        email: user.email,
      }))
    );
  }

  setUserConnected(userConnected: boolean): void {
    this.storeUserConnected  = localStorage.setItem('userConnected', String(userConnected));
    console.log(typeof this.storeUserConnected);
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

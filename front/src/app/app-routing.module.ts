import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {TopicComponent} from "./pages/topic/topic.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {authGuard} from "./guard/auth.guard";
import {AccountComponent} from "./pages/account/account.component";
import {FeedComponent} from "./pages/feed/feed.component";
import {PostComponent} from "./pages/post/post.component";
import {DetailPostComponent} from "./pages/detail-post/detail-post.component";

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'topics',
    component : TopicComponent,
  canActivate: [authGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account',
    component: AccountComponent,
    canActivate: [authGuard]
  },
  {path: 'feed',
    component: FeedComponent,
    canActivate: [authGuard]
},
{
  path: 'post',
  component: PostComponent,
  canActivate: [authGuard]
},
  {
    path: 'detail-post/:id',
    component: DetailPostComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

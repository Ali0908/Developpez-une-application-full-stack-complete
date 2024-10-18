import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TopicComponent} from "./pages/topic/topic.component";
import {RegisterComponent} from "./features/auth/components/register/register.component";
import {LoginComponent} from "./features/auth/components/login/login.component";
import {authGuard} from "./guard/auth.guard";
import {AccountComponent} from "./pages/account/account.component";
import {FeedComponent} from "./pages/feed/feed.component";
import {PostComponent} from "./pages/post/post.component";
import {DetailPostComponent} from "./pages/detail-post/detail-post.component";
import {UnauthGuard} from "./guard/unauth.guard";

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { path: '',
    canActivate: [UnauthGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "./core/guard/auth.guard";
import {AccountComponent} from "./features/account/account.component";
import {UnauthGuard} from "./core/guard/unauth.guard";

const routes: Routes = [
  { path: '',
    canActivate: [UnauthGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {path: 'subject',
  canActivate: [authGuard],
  loadChildren: () => import('./features/subjects/subject.module').then(m => m.SubjectModule)
  },
  {path: 'posts',
    canActivate: [authGuard],
    loadChildren: () => import('./features/posts/post.module').then(m => m.PostModule)
  },
  {path: 'account',
    canActivate: [authGuard],
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "./guard/auth.guard";
import {AccountComponent} from "./features/account/account.component";
import {UnauthGuard} from "./guard/unauth.guard";

const routes: Routes = [
  { path: '',
    canActivate: [UnauthGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {path: 'subject',
  canActivate: [authGuard],
  loadChildren: () => import('./features/subject/subject.module').then(m => m.SubjectModule)
  },
  {path: 'account',
    component: AccountComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

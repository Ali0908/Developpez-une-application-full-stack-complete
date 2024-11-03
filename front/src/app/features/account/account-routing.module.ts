import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AccountComponent} from "./account.component";


const routes: Routes = [
  { title: 'Account', path: '', component: AccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";


const routes: Routes = [
  { title: 'Login', path: 'login', component: LoginComponent },
  { title: 'Register', path: 'register', component: RegisterComponent },
  {title: 'Home', path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

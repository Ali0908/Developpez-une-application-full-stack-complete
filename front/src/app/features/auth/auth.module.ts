import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {SubjectRoutingModule} from "../subject/subject-routing.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule
]

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    HomeComponent,
  ],
  exports: [
  ],
  imports: [
    AuthRoutingModule,
    SubjectRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
  ]
})
export class AuthModule { }

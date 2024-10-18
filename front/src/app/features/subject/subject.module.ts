import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgModule} from "@angular/core";
import {AuthRoutingModule} from "../auth/auth-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PostComponent} from "./component/post/post.component";
import {FeedComponent} from "./component/feed/feed.component";
import {DetailPostComponent} from "./component/detail-post/detail-post.component";
import {TopicComponent} from "./component/topic/topic.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";


const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
]

@NgModule({
  declarations: [
    PostComponent,
    FeedComponent,
    DetailPostComponent,
    TopicComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    MatSelectModule
  ]
})
export class SubjectModule { }

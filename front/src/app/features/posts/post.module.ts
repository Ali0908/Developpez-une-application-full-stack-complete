import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgModule} from "@angular/core";
import {FeedComponent} from "./components/feed/feed.component";
import {PostComponent} from "./components/create/post/post.component";
import {DetailPostComponent} from "./components/detail-post/detail-post.component";
import {PostRoutingModule} from "./post-routing.module";


const materialModule = [
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatDividerModule,
  MatButtonModule,
  MatSelectModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [FeedComponent,PostComponent,DetailPostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    ReactiveFormsModule,
    ...materialModule
  ],
  exports: [],
  providers: []
})
export class PostModule {
}

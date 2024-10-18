import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PostComponent} from "./component/post/post.component";
import {FeedComponent} from "./component/feed/feed.component";
import {DetailPostComponent} from "./component/detail-post/detail-post.component";
import {TopicComponent} from "./component/topic/topic.component";

const routes: Routes = [
  { title: 'Post', path: 'post', component: PostComponent },
  { title: 'Feed', path: 'feed', component: FeedComponent },
  {title: 'Details Post', path: 'detail-post/:id', component: DetailPostComponent},
  {title: 'Topic', path: 'topics', component: TopicComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }

import {PostComponent} from "./components/create/post/post.component";
import {FeedComponent} from "./components/feed/feed.component";
import {DetailPostComponent} from "./components/detail-post/detail-post.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";


const routes: Routes = [
  {
    title: 'Feed',
    path: 'feed',
    component: FeedComponent
  },
  {
    title: 'Posts - create',
    path: 'create',
    component: PostComponent
  },
  {
    title: 'Details Post',
    path: ':id',
    component:  DetailPostComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}

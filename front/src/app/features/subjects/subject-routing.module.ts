import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TopicComponent} from "./components/list/topic/topic.component";

const routes: Routes = [
  {title: 'Topic', path: 'topics', component: TopicComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }

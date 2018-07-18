import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from "./home-dashboard/home-dashboard.component";
import { FullTrelloComponent } from "./full-trello/full-trello.component";
import { FullUserComponent } from "./full-user/full-user.component";
import { FullGithubComponent } from "./full-github/full-github.component";
import { EditWebsiteContentComponent } from './edit-website-content/edit-website-content.component';
import { WebServicesComponent } from './web-services/web-services.component';
import { BuildPipelineComponent } from './build-pipeline/build-pipeline.component';
import { TechnicalOperationsComponent } from './technical-operations/technical-operations.component';

const routes: Routes = [
  { path: '', component: HomeDashboardComponent },
  { path: 'sprint-info', component: FullTrelloComponent },
  { path: 'users/:id', component: FullUserComponent },
  { path: 'github-info', component: FullGithubComponent },
  { path: 'edit-website-content', component: EditWebsiteContentComponent },
  { path: 'web-services', component: WebServicesComponent },
  { path: 'build-pipeline', component: BuildPipelineComponent },
  { path: 'technical-operations', component: TechnicalOperationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

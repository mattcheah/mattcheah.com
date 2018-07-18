import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from './pipes/pipes.module';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule, ReactiveFormsModule } from  "@angular/forms";
import { MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ChartComponent } from './chart/chart.component';
import { TrelloDashboardCardComponent } from './trello-dashboard-card/trello-dashboard-card.component';
import { LoaderIconComponent } from './loader-icon/loader-icon.component';
import { GithubDashboardUserCommitsComponent } from './github-dashboard-user-commits/github-dashboard-user-commits.component';
import { GithubDashboardRecentCommitsComponent } from './github-dashboard-recent-commits/github-dashboard-recent-commits.component';
import { FullTrelloComponent } from './full-trello/full-trello.component';
import { SprintProgressBarComponent } from './sprint-progress-bar/sprint-progress-bar.component';
import { FullTrelloUserDataComponent } from './full-trello/full-trello-user-data/full-trello-user-data.component';
import { PriorityAlertComponent } from './priority-alert/priority-alert.component';
import { FullUserComponent } from './full-user/full-user.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { NewsletterCardComponent } from './newsletter-card/newsletter-card.component';
import { EditWebsiteContentComponent } from './edit-website-content/edit-website-content.component';
import { WebServicesComponent } from './web-services/web-services.component';
import { BuildPipelineComponent } from './build-pipeline/build-pipeline.component';
import { TechnicalOperationsComponent } from './technical-operations/technical-operations.component';
import { FullGithubComponent } from './full-github/full-github.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    PipesModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    // BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    LeftSidebarComponent,
    HomeDashboardComponent,
    ChartComponent,
    TrelloDashboardCardComponent,
    LoaderIconComponent,
    GithubDashboardUserCommitsComponent,
    GithubDashboardRecentCommitsComponent,
    FullTrelloComponent,
    SprintProgressBarComponent,
    FullTrelloUserDataComponent,
    PriorityAlertComponent,
    FullUserComponent,
    DatePickerComponent,
    NewsletterCardComponent,
    EditWebsiteContentComponent,
    WebServicesComponent,
    BuildPipelineComponent,
    TechnicalOperationsComponent,
    FullGithubComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

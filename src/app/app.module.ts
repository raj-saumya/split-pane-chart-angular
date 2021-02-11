import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularSplitModule } from 'angular-split';
import { SplitPanesComponent } from './components/split-panes/split-panes.component';
import { BarChartTemplateComponent } from './components/split-panes/bar-chart-template/bar-chart-template.component';
import { TrialComponent } from './components/trial/trial.component';
import { GenericBarChartComponent } from './components/generic-bar-chart/generic-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SplitPanesComponent,
    BarChartTemplateComponent,
    TrialComponent,
    GenericBarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularSplitModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

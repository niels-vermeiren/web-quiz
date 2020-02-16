import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './navigation/navigation.component';
import {RouterModule} from "@angular/router";
import {UnsavedChangesGuard} from "./shared/unsaved-changes-guard";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UnsavedChangesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

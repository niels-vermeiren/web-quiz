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
import {IsAuthenticatedGuard} from "./shared/is-authenticated-guard";
import {EnumToArrayPipe} from "./shared/enum-to-array-pipe";
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EnumToArrayPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UnsavedChangesGuard, IsAuthenticatedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

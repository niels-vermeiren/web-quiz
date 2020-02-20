import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './navigation/navigation.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {AuthenticationService} from "./user/shared/service/authentication.service";
import {AuthorizationHttpInterceptor} from "./shared/authorization-http-interceptor";
import {HttpClientTestingModule} from "@angular/common/http/testing";

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
    HttpClientTestingModule,
    HttpClientModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
  providers: [
    HttpClient,
    HttpClientModule,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationHttpInterceptor, multi: true }
  ]
})
export class AppModule { }

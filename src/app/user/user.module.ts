import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import {IsAuthenticatedGuard} from "../shared/is-authenticated-guard";

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: UserListComponent, canActivate: [ IsAuthenticatedGuard ] },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent, canActivate: [  IsAuthenticatedGuard ] }
    ]),
    ReactiveFormsModule
  ]
})
export class UserModule { }

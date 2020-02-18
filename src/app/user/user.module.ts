import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent }
    ]),
    ReactiveFormsModule
  ]
})
export class UserModule { }

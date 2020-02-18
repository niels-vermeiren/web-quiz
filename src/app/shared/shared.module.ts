import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnsavedChangesGuard} from "./unsaved-changes-guard";
import {EnumToArrayPipe} from "./enum-to-array-pipe";
import {IsAuthenticatedGuard} from "./is-authenticated-guard";

@NgModule({
  declarations: [EnumToArrayPipe],
  imports: [
    CommonModule
  ],
  providers: [UnsavedChangesGuard, IsAuthenticatedGuard],
  exports: [
    EnumToArrayPipe
  ],
})
export class SharedModule { }

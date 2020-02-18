import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionListComponent} from "./question-list/question-list.component";
import {QuestionFormComponent} from "./question-form/question-form.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {UnsavedChangesGuard} from "../shared/unsaved-changes-guard";
import {QuestionService} from "./shared/service/question.service";
import {EnumToArrayPipe} from "./shared/enum-to-array-pipe";

@NgModule({
  declarations: [QuestionListComponent, QuestionFormComponent, EnumToArrayPipe],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: QuestionListComponent },
      { path: 'new', component: QuestionFormComponent, canDeactivate: [UnsavedChangesGuard] },
      { path: 'edit/:id', component: QuestionFormComponent, canDeactivate: [UnsavedChangesGuard] },
    ]),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [QuestionService]
})
export class QuestionModule { }

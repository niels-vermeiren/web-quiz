import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionListComponent} from "./question/question-list/question-list.component";
import {QuestionFormComponent} from "./question/question-form/question-form.component";
import {QuizComponent} from "./quiz/quiz.component";
import {UnsavedChangesGuard} from "./shared/unsaved-changes-guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'questions' },
  { path: 'questions', component: QuestionListComponent },
  { path: 'questions/new', component: QuestionFormComponent, canDeactivate: [UnsavedChangesGuard] },
  { path: 'questions/edit/:id', component: QuestionFormComponent, canDeactivate: [UnsavedChangesGuard] },
  { path: 'quiz', component: QuizComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

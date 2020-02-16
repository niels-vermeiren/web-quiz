import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionModule} from "./question/question.module";
import {QuizModule} from "./quiz/quiz.module";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'questions' },
  { path: 'quiz', loadChildren: () => QuizModule },
  { path: 'questions', loadChildren: () => QuestionModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

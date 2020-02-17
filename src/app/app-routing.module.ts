import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'quiz', loadChildren: './quiz/quiz.module#QuizModule' },
  { path: 'questions', loadChildren: './question/question.module#QuestionModule'},
  { path: 'users', loadChildren: './user/user.module#UserModule'},
  { path: 'login', redirectTo: 'users/login' },
  { path: '', pathMatch: 'full', redirectTo: 'questions' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

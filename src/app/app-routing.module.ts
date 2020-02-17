import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IsAuthenticatedGuard} from "./shared/is-authenticated-guard";

const routes: Routes = [
  { path: 'quiz', loadChildren: './quiz/quiz.module#QuizModule' },
  { path: 'questions', loadChildren: './question/question.module#QuestionModule', canActivate: [IsAuthenticatedGuard]},
  { path: 'users', loadChildren: './user/user.module#UserModule'},
  { path: 'login', redirectTo: 'users/login' },
  { path: 'register', redirectTo: 'users/register' },
  { path: '', pathMatch: 'full', redirectTo: 'questions' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

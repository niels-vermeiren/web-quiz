import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuizComponent} from './quiz/quiz.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [QuizComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: QuizComponent }
    ]),
  ]
})
export class QuizModule { }

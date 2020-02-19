import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuizComponent} from './quiz/quiz.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { CountdownProgressBarComponent } from './countdown-progress-bar/countdown-progress-bar.component';

@NgModule({
  declarations: [QuizComponent, CountdownProgressBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: QuizComponent }
    ]),
  ]
})
export class QuizModule { }

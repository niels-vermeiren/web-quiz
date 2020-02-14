import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionService} from "../../shared/service/question.service";
import {Observable, Subscription} from "rxjs";
import {Question} from "../../shared/question";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.less']
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions$: Observable<Question>;
  subscription: Subscription;
  constructor(private service: QuestionService) {}

  ngOnInit() {
    this.subscription = new Subscription();
    this.loadQuestions()
  }

  loadQuestions() {
   this.questions$ = this.service.getQuestions();
  }

  removeQuestion(id:Number) {
    this.subscription = this.service.deleteQuestion(id).subscribe((d) => this.loadQuestions());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

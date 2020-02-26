import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Question} from '../shared/question';
import {QuestionService} from '../shared/service/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.less']
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions$: Observable<Question>;
  subscription: Subscription;
  constructor(private _service: QuestionService) {}

  ngOnInit() {
    this.subscription = new Subscription();
    this.loadQuestions();
  }

  loadQuestions() {
   this.questions$ = this._service.getQuestions();
  }

  removeQuestion(id: number) {
    this.subscription = this._service.deleteQuestion(id).subscribe((d) => this.loadQuestions());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

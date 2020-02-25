import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {QuizComponent} from './quiz.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {QuestionService} from '../../question/shared/service/question.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Question} from '../../question/shared/question';
import {CountdownProgressBarComponent} from '../countdown-progress-bar/countdown-progress-bar.component';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizComponent, CountdownProgressBarComponent ],
      imports: [ ReactiveFormsModule, RouterModule.forRoot([]), HttpClientTestingModule ],
      providers: [{
        provide: APP_BASE_HREF, useValue : '/'
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('first question is loaded after component initialization', inject([HttpTestingController, QuestionService],
    (httpMock: HttpTestingController, service: QuestionService) => {
      const questions: Question[] = [
        {id: 1, type: 'Normal', question: 'This is the first question', answer: '', answers: []},
        {id: 2, type: 'Normal', question: 'This is the second question', answer: '', answers: []}
      ];
      service.getQuestions().subscribe((data: {}) => {
        component.questions = data;
        component.nextQuestion();
        expect(component.currentQuestion.question).toEqual(questions[0].question);
        expect(component.currentQuestionIndex).toBe(1);
      });
      const req = httpMock.expectOne(service.apiUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(questions);
    }));

  it('score is incremented by one if the correct answer is given', inject([HttpTestingController, QuestionService],
    (httpMock: HttpTestingController, service: QuestionService) => {
      const questions: Question[] = [
        {id: 1, type: 'Normal', question: 'This is the first question', answer: 'the answer', answers: []},
      ];
      service.getQuestions().subscribe((data: {}) => {
        component.questions = data;
        component.nextQuestion();
        component.answer.markAsTouched();
        component.answer.setValue(questions[0].answer);
        component.nextQuestion();
      });
      const req = httpMock.expectOne(service.apiUrl);
      req.flush(questions);
      expect(component.score).toBe(1);
    }));

  it('reset timer after every question and stop timer when no more questions',
    inject([HttpTestingController, QuestionService], (httpMock: HttpTestingController, service: QuestionService) => {
      spyOn(component, 'resetTimer');
      spyOn(component, 'stopTimer');
      const questions: Question[] = [
        {id: 1, type: 'Normal', question: 'This is the first d question', answer: 'the answer', answers: []},
      ];
      service.getQuestions().subscribe((data: {}) => {
        component.questions = data;
        component.nextQuestion();
        expect(component.resetTimer).toHaveBeenCalledTimes(1);
        component.nextQuestion();
        expect(component.stopTimer).toHaveBeenCalledTimes(1);
      });
      const req = httpMock.expectOne(service.apiUrl);
      req.flush(questions);
    }));
});

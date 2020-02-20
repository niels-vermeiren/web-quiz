import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {QuestionListComponent} from './question-list.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {QuestionService} from "../shared/service/question.service";
import {Question} from "../shared/question";
import {RouterModule} from "@angular/router";

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionListComponent ],
      imports: [ RouterModule, HttpClientModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('questions are retrieved successfully', inject([HttpTestingController, QuestionService],
    (httpMock: HttpTestingController, service: QuestionService) => {
      let questions:Question[] = [
        {
          id: 1,
          type: 'Normal',
          question: 'This is a question',
          answer: 'The answer',
          answers: []
        }
      ];
      component.questions$.subscribe(question => {
        expect(question.question).toEqual(questions[0].question);
      });
      const req = httpMock.match(service.apiUrl);
      expect(req[0].request.method).toEqual('GET');
      req[0].flush(questions);
  }));
});

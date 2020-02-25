import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionFormComponent} from './question-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EnumToArrayPipe} from '../../shared/enum-to-array-pipe';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

describe('QuestionFormComponent', () => {
  let component: QuestionFormComponent;
  let fixture: ComponentFixture<QuestionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionFormComponent, EnumToArrayPipe ],
      imports: [ ReactiveFormsModule, RouterModule.forRoot([]), HttpClientModule ],
      providers: [{
        provide: APP_BASE_HREF, useValue : '/'
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when form fields contain errors', () => {
    expect(component.questionForm.valid).toBeFalsy();
    expect(component.question.errors.required).toBeTruthy();
    expect(component.answer.errors.required).toBeTruthy();
    component.answers.enable();
    expect(component.answers.errors.required).toBeTruthy();
    component.addAnswer();
    expect(component.answers.errors.minlength).toBeTruthy();
  });

  it('form should be valid when form fields contain no errors', () => {
    component.question.setValue('This a question');
    component.type.setValue('Multiple choice');
    component.answer.setValue('This is my answer');
    component.addAnswer();
    component.addAnswer();
    component.answers.enable();
    expect(component.question.errors).toBeNull();
    expect(component.answer.errors).toBeNull();
    expect(component.answers.errors).toBeNull();
    expect(component.answers.errors).toBeNull();
    expect(component.questionForm.valid).toBeTruthy();
  });
});

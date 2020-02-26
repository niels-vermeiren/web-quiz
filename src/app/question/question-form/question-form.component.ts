import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Question} from '../shared/question';
import {QuestionService} from '../shared/service/question.service';
import {QuestionType} from '../shared/question-type';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.less']
})
export class QuestionFormComponent implements OnInit, OnDestroy {
  editMode = false;
  questionForm: FormGroup;
  subscription = new Subscription();
  submitted = false;
  questionTypes = QuestionType;

  constructor(private _fb: FormBuilder, private _route: ActivatedRoute, private _service: QuestionService, private _router: Router) {
    this.questionForm = this._fb.group({
      id: this._fb.control(''),
      question: this._fb.control('', Validators.required),
      type: this._fb.control('', Validators.required),
      answer: this._fb.control('', Validators.required),
      answers: this._fb.array([], [
        Validators.required, Validators.minLength(2)
      ])
    });
  }

  ngOnInit() {
    this.answers.disable();
    this.subscription.add(this._route.params.subscribe(params => {
      this.editMode = params.id as boolean;
      if (!this.editMode) { return; }
      this.loadQuestion(params.id);
    }));
  }

  get id() { return this.questionForm.get('id'); }
  get question() { return this.questionForm.get('question'); }
  get type() { return this.questionForm.get('type'); }
  get answer() { return this.questionForm.get('answer'); }
  get answers(): FormArray { return this.questionForm.get('answers') as FormArray; }
  addAnswer() { this.answers.push(new FormControl('')); }
  removeAnswer(i: number) { this.answers.removeAt(i); }

  loadQuestion(id) {
    this.subscription.add(this._service.getQuestion(id).subscribe((data: {}) => {
      const question: any = data;
      this.questionToForm(question);
      this.changeType(question.type);
    }));
  }

  createQuestion(question: Question) {
    this.subscription.add(this._service.createQuestion(question).subscribe(() => {
      return this._router.navigate(['/questions']);
    }));
  }

  updateQuestion(question: Question) {
    this.subscription.add(this._service.updateQuestion(question.id, question).subscribe(() => {
      return this._router.navigate(['/questions']);
    }));
  }

  changeType(value: any) {
    return value === this.questionTypes.normal ? this.answers.disable() : this.answers.enable();
  }

  questionToForm(question: Question) {
    this.id.patchValue(question.id);
    this.question.patchValue(question.question);
    this.type.patchValue(question.type);
    this.answer.patchValue(question.answer);
    question.answers.forEach(x => this.answers.push(this._fb.control(x)));
  }

  formToQuestion(): Question {
    return {
      id: this.id.value,
      question: this.question.value,
      answer: this.answer.value,
      answers: this.answers.value,
      type: this.type.value
    };
  }

  onSubmit() {
    this.submitted = true;
    const question = this.formToQuestion();
    if (this.questionForm.invalid) { return false; }
    return this.editMode ? this.updateQuestion(question) : this.createQuestion(question);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

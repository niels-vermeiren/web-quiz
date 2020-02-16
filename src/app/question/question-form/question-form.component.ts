import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Question} from "../shared/question";
import {QuestionBuilder} from "../shared/question-builder";
import {QuestionService} from "../shared/service/question.service";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.less']
})
export class QuestionFormComponent implements OnInit, OnDestroy {

  questionTypes = ['Normal', 'Multiple choice'];
  editMode = false;
  showValidation = false;
  questionForm:FormGroup;
  subscription: Subscription = new Subscription();
  submitted = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: QuestionService, private router: Router) {
    this.questionForm = this.fb.group({
      id: this.fb.control(""),
      question: this.fb.control("", Validators.required),
      type: this.fb.control("", Validators.required),
      answer: this.fb.control("", Validators.required),
      answers: this.fb.array([], [
        Validators.required, Validators.minLength(2)
      ])
    });
  }

  get id() { return this.questionForm.get('id'); }
  get question() { return this.questionForm.get('question'); }
  get type() { return this.questionForm.get('type'); }
  get answer() { return this.questionForm.get('answer'); }
  get answers():FormArray { return this.questionForm.get('answers') as FormArray; }
  addAnswer() { this.answers.push(new FormControl(''))}
  removeAnswer(i: number) { this.answers.removeAt(i); }

  ngOnInit() {
    this.answers.disable();
    this.subscription.add(this.route.params.subscribe(params => {
      this.editMode = params['id'] as boolean;
      if (!this.editMode) return;
      this.loadQuestion(+params['id']);
    }));
  }

  loadQuestion(id) {
    this.subscription.add(this.service.getQuestion(id).subscribe((data: {}) => {
      const question:any = data;
      this.id.patchValue(question.id);
      this.question.patchValue(question.question);
      this.type.patchValue(question.type);
      this.answer.patchValue(question.answer);
      question.answers.forEach(x=> this.answers.push(this.fb.control(x)));
      this.changeType(question.type);
    }));
  }

  createQuestion(question:Question) {
    this.subscription.add(this.service.createQuestion(question).subscribe(() => {
      return this.router.navigate(['/questions']);
    }));
  }

  updateQuestion(question:Question) {
    this.subscription.add(this.service.updateQuestion(question.id, question).subscribe(() => {
      return this.router.navigate(['/questions']);
    }));
  }

  changeType(value: any) {
    if (value === 'Normal') {
      this.answers.disable();
      return;
    }
    this.answers.enable();
  }

  onSubmit() {
    this.submitted = true;
    const question:Question  = new QuestionBuilder()
      .id(this.id.value)
      .question(this.question.value)
      .answer(this.answer.value)
      .type(this.type.value)
      .answer(this.answer.value)
      .answers(this.answers.value)
      .build();

    if (this.editMode) this.updateQuestion(question);
    else this.createQuestion(question);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

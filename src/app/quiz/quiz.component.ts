import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Question} from "../question/shared/question";
import {QuestionService} from "../question/shared/question.service";


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.less']
})
export class QuizComponent implements OnInit, OnDestroy {

  questions:any = [];
  subscription: Subscription = new Subscription();
  currentQuestionIndex: number = 0;
  currentQuestion:Question;
  score: number = 0;
  time: number = 15;
  interval;
  questionForm:FormGroup;

  constructor(private service: QuestionService, private router:Router, private fb:FormBuilder) {
    this.questionForm = this.fb.group({
      answer: this.fb.control("")
    });
  }

  ngOnInit() {
  }

  get answer() {
    return this.questionForm.get("answer");
  }

  startQuiz() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.subscription.add(this.service.getQuestions().subscribe((data: {}) => {
      this.questions = data;
      this.nextQuestion();
    }));
  }

  nextQuestion() {
    this.currentQuestion = this.questions[this.currentQuestionIndex++];
    if(this.answerIsCorrect()) {
      this.score +=1;
    }
    this.time = 15;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.time--;
      if(this.time < 0) {
        this.time = 0;
        this.nextQuestion();
      }
    }, 1000);
  }

  answerIsCorrect():boolean {
    return this.currentQuestion.answer == this.answer.value;
  }

  onSubmit() {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

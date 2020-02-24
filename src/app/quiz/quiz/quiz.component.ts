import {Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Question} from "../../question/shared/question";
import {QuestionService} from "../../question/shared/service/question.service";
import {CountdownProgressBarComponent} from "../countdown-progress-bar/countdown-progress-bar.component";
import {QuestionType} from "../../question/shared/question-type";


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.less']
})
export class QuizComponent implements OnDestroy {

  questions:any = [];
  subscription = new Subscription();
  currentQuestionIndex = 0;
  currentQuestion:Question;
  score = 0;
  quizForm:FormGroup;
  @ViewChild(CountdownProgressBarComponent, { static: false })
  countdownComponent: CountdownProgressBarComponent;
  questionType = QuestionType;

  constructor(private service: QuestionService, private router:Router, private fb:FormBuilder) {
    this.quizForm = this.fb.group({
      answer: this.fb.control("")
    });
  }

  get answer() { return this.quizForm.get("answer"); }

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
    if(this.answer.touched && this.answerIsCorrect()) this.score +=1;
    this.currentQuestion = this.questions[this.currentQuestionIndex++];
    if (this.currentQuestionIndex - 1 == this.questions.length) {
      this.currentQuestion = undefined;
      if (this.countdownComponent) this.countdownComponent.stopTimer();
      return;
    }
    this.answer.patchValue("");
    if (this.countdownComponent) this.countdownComponent.resetTimer();
  }

  answerIsCorrect():boolean {
    return this.currentQuestion.answer == this.answer.value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import {Question} from "./question";

export class QuestionBuilder {
  readonly _question: Question;

  constructor () {
    this._question = new Question();
  }

  id(id: number): QuestionBuilder {
    this._question.id = id;
    return this;
  }

  question(question: String): QuestionBuilder {
    this._question.question = question;
    return this;
  }

  type(type: String): QuestionBuilder {
    this._question.type = type;
    return this;
  }

  answer(answer: String): QuestionBuilder {
    this._question.answer = answer;
    return this;
  }

  answers(answers: String[]): QuestionBuilder {
    this._question.answers = answers;
    return this;
  }

  build() {
    return this._question;
  }
}

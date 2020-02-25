import {EnumToArrayPipe} from './enum-to-array-pipe';
import {QuestionType} from "../question/shared/question-type";

describe('EnumToArrayPipe', () => {

  let pipe: EnumToArrayPipe;

  beforeEach(() => {
    pipe = new EnumToArrayPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('pipe transforms enum to an array of its values', () => {
    let values: string[] = pipe.transform(QuestionType);
    expect(values).toContain("Normal");
    expect(values).toContain("Multiple choice");
  });
});

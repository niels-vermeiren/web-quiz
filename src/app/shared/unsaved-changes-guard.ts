import {CanDeactivate} from "@angular/router";
import {QuestionFormComponent} from "../question/question-form/question-form.component";
import {Injectable} from "@angular/core";

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<QuestionFormComponent>{
  canDeactivate(component: QuestionFormComponent) {
    if (component.questionForm.dirty && !component.submitted) {
      return window.confirm("You have unsaved changes. Are you sure you want to leave?");
    }
    return true;
  }
}

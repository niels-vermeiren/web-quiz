import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {QuestionFormComponent} from "../question/question-form/question-form.component";

export class UnsavedChangesGuard implements CanDeactivate<QuestionFormComponent>{
  canDeactivate(component: QuestionFormComponent) {
    if (component.questionForm.dirty) {
      return window.confirm("You have unsaved changes. Are you sure you want to leave?");
    }
    return true;
  }
}

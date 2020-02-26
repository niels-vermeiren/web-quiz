import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../shared/service/user.service';
import {Subscription} from 'rxjs';
import {User} from '../shared/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup;
  showValidation = false;
  registeredSuccessfully = false;
  subscription = new Subscription();

  constructor(private _fb: FormBuilder, private _userService: UserService) {
    this.registerForm = this._fb.group({
      email: this._fb.control('', [Validators.required, Validators.email]),
      password: this._fb.control('', Validators.required)
    });
  }

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  onSubmit() {
    this.showValidation = true;
    const user: User = { id: 0, email: this.email.value, password: this.password.value };
    this.subscription = this._userService.createUser(user).subscribe(() => {
      this.registeredSuccessfully = true;
    }, () => {
      this.registeredSuccessfully = false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

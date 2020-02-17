import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../shared/service/user.service";
import {Subscription} from "rxjs";
import {User} from "../shared/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnDestroy{
  registerForm:FormGroup;
  showValidation = false;
  registeredSuccessfully = false;
  subscription = new Subscription();

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      email: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", Validators.required)
    });
  }

  get email () { return this.registerForm.get('email'); }
  get password () { return this.registerForm.get('password'); }

  onSubmit() {
    let user:User = {
      id: 0,
      email: this.email.value,
      password: this.password.value
    };
    this.subscription = this.userService.createUser(user).subscribe(() => {
      this.registeredSuccessfully = true
    }, () => {
      this.registeredSuccessfully = false;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

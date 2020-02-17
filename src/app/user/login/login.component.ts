import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../shared/service/authentication.service";
import {User} from "../shared/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  showValidation = false;
  errorMessage;

  constructor(private fb: FormBuilder, private authService:AuthenticationService, private router: Router) {
    this.loginForm = this.fb.group({
      email: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", Validators.required)
    });
  }

  ngOnInit() {
  }

  get email () { return this.loginForm.get('email'); }
  get password () { return this.loginForm.get('password'); }

  onSubmit() {
    this.errorMessage = undefined;
    let user:User = { id: 0, email: this.email.value, password: this.password.value };
    this.authService.login(user).subscribe(
      (data) => {
        localStorage.setItem('learnAngularToken', data.accessToken);
        this.router.navigate(["/"])
      },
      () => {
        this.errorMessage = "Wrong credentials."
      }
    );
  }
}

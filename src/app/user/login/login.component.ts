import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../shared/service/authentication.service';
import {User} from '../shared/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loginForm: FormGroup;
  showValidation = false;
  errorMessage;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required)
    });
  }

  private static setAuthorizationDataOnLocalStorage(accessToken) {
    localStorage.setItem('learnAngularUserId', LoginComponent.getUserIdFromToken(accessToken));
    localStorage.setItem('learnAngularToken', accessToken);
  }

  private static getUserIdFromToken(accessToken): string {
    return JSON.parse(atob(accessToken.split('.')[1])).sub;
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    const user: User = { id: 0, email: this.email.value, password: this.password.value };
    this.authService.login(user).subscribe((data) => {
        LoginComponent.setAuthorizationDataOnLocalStorage(data.accessToken);
        return this.router.navigate(['/']);
      }, () => { this.errorMessage = 'Wrong credentials.'; }
    );
  }
}

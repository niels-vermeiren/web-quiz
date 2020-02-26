import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent, fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule, RouterModule.forRoot([]), HttpClientModule ],
      providers: [{
        provide: APP_BASE_HREF, useValue : '/'
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when fields contain errors', () => {
    expect(component.loginForm.valid).toBeFalsy();
    expect(component.email.errors.required).toBeTruthy();
    expect(component.password.errors.required).toBeTruthy();
    component.email.setValue('TestUser');
    expect(component.email.errors.email).toBeTruthy();
  });

  it('form should be valid when fields contain no errors', () => {
    component.email.setValue('test@test.be');
    component.password.setValue('testPassword');
    expect(component.loginForm.valid).toBeTruthy();
  });
});

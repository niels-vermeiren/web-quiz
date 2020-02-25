import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {LoginComponent} from "../login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {APP_BASE_HREF} from "@angular/common";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ ReactiveFormsModule, RouterModule.forRoot([]), HttpClientModule ],
      providers: [{
        provide: APP_BASE_HREF, useValue : '/'
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when fields contain errors', () => {
    expect(component.registerForm.valid).toBeFalsy();
    expect(component.email.errors.required).toBeTruthy();
    expect(component.password.errors.required).toBeTruthy();
    component.email.setValue("TestUser");
    expect(component.email.errors.email).toBeTruthy();
  });

  it('form should be valid when fields contain no errors', () => {
    component.email.setValue("test@test.be");
    component.password.setValue("testPassword");
    expect(component.registerForm.valid).toBeTruthy();
  });
});

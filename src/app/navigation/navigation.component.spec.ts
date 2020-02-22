import {async, ComponentFixture, fakeAsync, inject, TestBed} from '@angular/core/testing';

import {NavigationComponent} from './navigation.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthenticationService} from "../user/shared/service/authentication.service";
import {AuthorizationHttpInterceptor} from "../shared/authorization-http-interceptor";

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationComponent ],
      imports: [ HttpClientModule, HttpClientTestingModule ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthorizationHttpInterceptor,
          multi: true
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial state isAuthenticated is false', () => {
    component.isAuthenticated$.subscribe( authenticated => {
      expect(authenticated).toBeFalsy();
    });
  });

  it('after login isAuthenticated is true', inject([HttpTestingController, AuthenticationService],
    (httpMock: HttpTestingController, service: AuthenticationService) => {
    service.isUserAuthenticated().subscribe((data: {}) => {
      expect(data['status']).toEqual('ok');
    });
    const req = httpMock.expectOne(service.apiUrl + '600/users/null');
    expect(req.request.method).toEqual('GET');
    req.flush({status: 'ok'});
    component.isAuthenticated$.subscribe( authenticated => {
      expect(authenticated).toBeTruthy();
    });
  }));
});

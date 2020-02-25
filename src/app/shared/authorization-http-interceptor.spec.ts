import { AuthorizationHttpInterceptor } from './authorization-http-interceptor';
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthenticationService} from "../user/shared/service/authentication.service";

describe('AuthorizationHttpInterceptor', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthorizationHttpInterceptor,
          multi: true,
        },
      ],
    });
    service = TestBed.get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add an Authorization header', () => {
    service.isUserAuthenticated().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(service.apiUrl+"600/users/null");
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
  });
});

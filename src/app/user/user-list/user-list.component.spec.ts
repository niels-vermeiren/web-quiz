import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {UserListComponent} from './user-list.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {User} from '../shared/user';
import {UserService} from '../shared/service/user.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      imports: [RouterModule, HttpClientModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('users are retrieved successfully', inject([HttpTestingController, UserService],
    (httpMock: HttpTestingController, service: UserService) => {
      const users: User[] = [
        { id: 1, email: 'niels@gmail.com', password: 'This is a question' }
      ];
      component.users$.subscribe(user => {
        expect(user.email).toEqual(users[0].email);
      });
      const req = httpMock.match(service.apiUrl);
      expect(req[0].request.method).toEqual('GET');
      req[0].flush(users);
    }));
});

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Question} from "../../question/shared/question";
import {QuestionService} from "../../question/shared/service/question.service";
import {UserService} from "../shared/service/user.service";
import {User} from "../shared/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit, OnDestroy {
  users$: Observable<User>;
  subscription: Subscription;
  constructor(private service: UserService) {}

  ngOnInit() {
    this.subscription = new Subscription();
    this.loadUsers()
  }

  loadUsers() {
    this.users$ = this.service.getUsers();
  }

  removeUser(id:Number) {
    this.subscription = this.service.deleteUser(id).subscribe((d) => this.loadUsers());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

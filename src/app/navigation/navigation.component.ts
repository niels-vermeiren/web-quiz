import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../user/shared/service/authentication.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent {
  navbarOpen = false;
  isAuthenticated$:Observable<boolean> = this.authService.isAuthenticated$;

  constructor(private authService: AuthenticationService) {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logOut () {
    localStorage.removeItem("learnAngularToken");
    localStorage.removeItem("learnAngularToken");
  }
}

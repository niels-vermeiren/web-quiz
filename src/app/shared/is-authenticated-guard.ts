import {CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "../user/shared/service/authentication.service";
import {Injectable, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

@Injectable()
export class IsAuthenticatedGuard implements CanActivate, OnDestroy{
  subscription = new Subscription();

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate() {
    let loggedIn = false;
    this.subscription = this.authService.isUserAuthenticated().subscribe(
      () => { loggedIn = true; },
      () => {
        console.log("Not authenticated");
        this.router.navigate(["login"]);
      }
    );
    return true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

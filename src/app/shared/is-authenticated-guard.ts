import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../user/shared/service/authentication.service';
import {Injectable, OnDestroy} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate, OnDestroy {
  subscription = new Subscription();
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate() {
    return this.authService.isUserAuthenticated().pipe(
      switchMap(() => {
        return of(true);
      }), catchError(() => {
        this.router.navigate(['login']);
        return of(false);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

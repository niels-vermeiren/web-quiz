import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../user/shared/service/authentication.service';
import {Injectable, OnDestroy} from '@angular/core';
import {of, Subscription} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate, OnDestroy {
  subscription = new Subscription();
  constructor(private _authService: AuthenticationService, private _router: Router) {}

  canActivate() {
    return this._authService.isUserAuthenticated().pipe(
      switchMap(() => {
        return of(true);
      }), catchError(() => {
        this._router.navigate(['login']);
        return of(false);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

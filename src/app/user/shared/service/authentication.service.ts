import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, share, tap} from "rxjs/operators";
import {AuthenticationResponse} from "../authentication-response";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl = "http://localhost:3000/"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) {}

  login(user) : Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.apiUrl + "login",
      { email: user.email, password: user.password }, this.httpOptions);
  }

  isUserAuthenticated (): Observable<Response> {
    let userId = localStorage.getItem("learnAngularUserId");

    return this.http.get<Response>(this.apiUrl + "600/users/" + userId, this.httpOptions)
      .pipe(
        share(),
        tap(x => this.isAuthenticated$.next(true)),
        catchError(this.handleError.bind(this))
      );
  }

  handleError(error) {
    this.isAuthenticated$.next(false);
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

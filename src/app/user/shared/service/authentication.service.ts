import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {AuthenticationResponse} from "../authentication-response";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = "http://localhost:3000/"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http:HttpClient) { }

  register(user) : Observable<Response> {
    return this.http.post<Response>(this.apiUrl + "register", JSON.stringify(user),
      this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  login(user) : Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.apiUrl + "login",
      { email: user.email, password: user.password }, this.httpOptions);
  }

  isUserAuthenticated (userId, token): Observable<Response> {
    let headers = new HttpHeaders()
      .append("Authorization", "Bearer " + token)
      .append("Content-Type", "application/json");

    return this.http.get<Response>(this.apiUrl + "600/users/" + userId, { headers: headers }).pipe(retry(1));
  }

  handleError(error) {
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

import { Injectable } from '@angular/core';
import {User} from "../user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _currentUser:User;
  private _token:String;

  apiUrl = "http://localhost:3000/login"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  get currentUser() { return this._currentUser; }
  set currentUser(user) { this._currentUser = user; }

  constructor(private http:HttpClient) { }

  login(email:String, password:String) {
    return this.http.post<User>(this.apiUrl, JSON.stringify({
        email:email,
        password: password
      }),
      this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
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

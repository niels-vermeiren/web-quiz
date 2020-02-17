import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {User} from "../user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "http://localhost:3000/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http:HttpClient) { }

  getUsers() : Observable<User> {
    return this.http.get<User>(this.apiUrl).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getUser(id) : Observable<User> {
    return this.http.get<User>(this.apiUrl+id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createUser(user) : Observable<User> {
    return this.http.post<User>(this.apiUrl + "register", JSON.stringify(user),
      this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateUser(id, user): Observable<User> {
    return this.http.put<User>(this.apiUrl + id, user,
      this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteUser(id): Observable<User> {
    return this.http.delete<User>(this.apiUrl + id, this.httpOptions).pipe(
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

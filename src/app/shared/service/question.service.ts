import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Question} from "../question";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = "http://localhost:3000/questions/"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http:HttpClient) { }

  getQuestions() : Observable<Question> {
    return this.http.get<Question>(this.apiUrl).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getQuestion(id) : Observable<Question> {
    return this.http.get<Question>(this.apiUrl+id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createQuestion(question) : Observable<Question> {
    return this.http.post<Question>(this.apiUrl, JSON.stringify(question),
      this.httpOptions).pipe(
        retry(1),
        catchError(this.handleError)
    )
  }

  updateQuestion(id, question): Observable<Question> {
    return this.http.put<Question>(this.apiUrl+id, question,
      this.httpOptions).pipe(
        retry(1),
        catchError(this.handleError)
    )
  }

  deleteQuestion(id): Observable<Question> {
    return this.http.delete<Question>(this.apiUrl+id, this.httpOptions).pipe(
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


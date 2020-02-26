import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Question} from '../question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  apiUrl = 'http://localhost:3000/questions/';
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private _http: HttpClient) { }

  getQuestions(): Observable<Question> {
    return this._http.get<Question>(this.apiUrl).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getQuestion(id): Observable<Question> {
    return this._http.get<Question>(this.apiUrl + id).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  createQuestion(question): Observable<Question> {
    return this._http.post<Question>(this.apiUrl, JSON.stringify(question),
      this._httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updateQuestion(id, question): Observable<Question> {
    return this._http.put<Question>(this.apiUrl + id, question,
      this._httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteQuestion(id): Observable<Question> {
    return this._http.delete<Question>(this.apiUrl + id, this._httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

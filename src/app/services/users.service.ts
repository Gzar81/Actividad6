import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private urlBase = 'https://peticiones.online/api/users';

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}`).pipe(
      catchError(this.handleError)
    );
  }

  getById(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.urlBase}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  createNewUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.urlBase}`, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(userId: string, user: User): Observable<any> {
    return this.httpClient.put(`${this.urlBase}/${userId}`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.httpClient.delete(`${this.urlBase}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Se produjo un error en el cliente o en la red.
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // El servidor devolvió una respuesta con un código de error.
      console.error(
        `El servidor devolvió un código de error ${error.status}, ` +
        `el cuerpo del error es: ${error.error}`);

    }
    return throwError(() => {
      return 'Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.'
    });
  }
}

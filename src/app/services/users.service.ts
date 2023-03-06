import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private urlBase = 'https://peticiones.online/api/users';

  constructor(private httpClient: HttpClient) { }

  getAllUsers(pPage: number = 1): Observable<any> {
    return this.httpClient.get(`${this.urlBase}?page=${pPage}`);
  }

  getById(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.urlBase}/${userId}`);
  }

  createNewUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.urlBase}`, user);
  }

  updateUser(userId: string, user: User): Observable<any> {
    return this.httpClient.put(`${this.urlBase}/${userId}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.httpClient.delete(`${this.urlBase}/${userId}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private arrUsers: User[] = [];
  private urlBase = 'https://peticiones.online/api/users';

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}`);
  }

  getById(pId: string): User | any {
    return this.httpClient.get<User>(`${this.urlBase}/${pId}`);
  }

  //createNewUser() { } /* POST https://peticiones.online/api/users */

  //updateUser() { }  /* PUT https://peticiones.online/api/users/IDUSUARIO */

  //deleteUser() { }  /*  DELETE https://peticiones.online/api/users/IDUSUARIO*/

  createNewUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.urlBase}`, user);
  }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put(`${this.urlBase}/${user._id}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.httpClient.delete(`${this.urlBase}/${userId}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../model/user.model';
import { AuthService } from './auth.service';
import {map } from 'rxjs/operators';

const API_URL: string = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpClient, public authService: AuthService) { }

  async getHttpOptions() {
    const token = await this.authService.getAuthToken();

    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };

    return options;
  }

  async getUserByEmail(email: string) {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/users?email=${email}`, options).map(
      (users: UserModel[]) => {
        const user = users[0];
        return (users.length == 0) ? null : new UserModel(user.id, user.name, user.email);
      }
    ).toPromise();
  }

  async add(user: UserModel, token: string) {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(`${API_URL}/users`, user, options).toPromise();
  }
}

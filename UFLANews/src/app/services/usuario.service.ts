import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuarios.model';
import { AuthService } from './auth.service';

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
        'Authorization': `Bearer ${token}`
      })
    };

    return options;
  }

  async getUserByEmail(email: string) {
    const options = await this.getHttpOptions();
    return this.http.get(`${API_URL}/usuarios?email=${email}`, options).map(
      (users: UsuarioModel[]) => {
        const user = users[0];
        return (users.length == 0) ? null : new UsuarioModel(user.id, user.nome, user.email);
      }
    ).toPromise();
  }

  async add(user: UsuarioModel, token: string) {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(`${API_URL}/usuarios`, user, options).toPromise();
  }

  async update(user: UsuarioModel, password: string) {
    const options = await this.getHttpOptions();
    const data = {
      "email": user.email,
      "password": password
    }
    return this.http.put(`${API_URL}/usuarios/${user.id}`, data,options).toPromise();
  }

  async delete(user: UsuarioModel) {
    const options = await this.getHttpOptions();
    this.authService.logout();
    return this.http.delete(`${API_URL}/usuarios/${user.id}`,options).toPromise();
  }
}

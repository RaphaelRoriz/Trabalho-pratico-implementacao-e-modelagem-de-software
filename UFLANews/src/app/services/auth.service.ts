import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UsuarioModel } from '../models/usuarios.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './usuario.service';

const TOKEN_KEY = 'auth-token';
const EMAIL_KEY = 'auth-userid';

const API_URL: string = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject(false);

  constructor(
    public storage: Storage,
    public plt: Platform,
    public http: HttpClient
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  async checkToken() {
    const res = await this.storage.get(TOKEN_KEY);
    if (res) {
      this.authState.next(true);
    }
  }

  async login(email: string, password: string) {
    const data = {
      "email": email,
      "password": password
    }

    const token = await this.http.post(`${API_URL}/auth/login`, data).map(
      (item: any) => {
        return item.access_token;
      }
    ).toPromise();

    if (token) {
      await this.storage.set(TOKEN_KEY, token);
      await this.storage.set(EMAIL_KEY, email);

      this.authState.next(true);
    } 
  }

  async register(email: string, password: string) {
    const data = {
      "email": email,
      "password": password
    }
    return this.http.post(`${API_URL}/auth/register`, data).toPromise();
  }

  async logout() {
    await this.storage.remove(TOKEN_KEY);
    await this.storage.remove(EMAIL_KEY);
    this.authState.next(false);
  }

  isAuthenticated(): boolean {
    return this.authState.value;
  }

  async getAuthEmail() {
    return this.storage.get(EMAIL_KEY);
  }

  async getAuthToken() {
    return this.storage.get(TOKEN_KEY);
  }
}

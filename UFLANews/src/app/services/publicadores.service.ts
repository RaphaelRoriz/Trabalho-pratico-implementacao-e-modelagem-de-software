import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PublicadorModel } from '../models/publicadores.model';
import { AuthService } from './auth.service';

import 'rxjs/Rx';
import { AuthService } from './auth.service';

const API_URL: string = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})
export class PublicadoresService {

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

  async getAll(): Promise<PublicadorModel[]> {
      const options = await this.getHttpOptions();

      return this.http.get(`${API_URL}/publicadores`, options).map(
        (itens: PublicadorModel[]) => {
          return itens.map(
            (item: PublicadorModel) => {
              return new PublicadorModel(
                item.id,item.nome, item.imagem);
            }
          )
        }
      ).toPromise();
    }

}

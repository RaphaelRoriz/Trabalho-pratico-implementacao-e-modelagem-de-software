import { Injectable } from '@angular/core';
import { BoletimModel } from '../models/boletins.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/Rx';
import { AuthService } from './auth.service';

const API_URL: string = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  constructor(public http: HttpClient, public authService: AuthService) { }

  async getHttpOptions() {
    const token = await this.authService.getAuthToken();

    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    return options;
  }

  async getAll(): Promise<BoletimModel[]> {
      const options = await this.getHttpOptions();

      return this.http.get(`${API_URL}/news`, options).map(
        (itens: BoletimModel[]) => {
          return itens.map(
            (item: BoletimModel) => {
              return new BoletimModel(
                item.id, item.publicador, item.titulo, item.dataPublicacao,
          item.sessao, item.imagem, item.likes);
            }
          )
        }
      ).toPromise();
    }

    async searchById(id: number): Promise<BoletimModel> {
      const options = await this.getHttpOptions();

      return this.http.get(`${API_URL}/news/${id}`, options).map(
        (item: BoletimModel) => {
          return new BoletimModel(
            item.id, item.publicador, item.titulo, item.dataPublicacao,
          item.sessao, item.imagem, item.likes);
        }
      ).toPromise();
    }

    async searchByTitle(title: string): Promise<BoletimModel[]> {

       title = title.trim().toLowerCase();

       if (title == '') {
         return this.getAll();
       }

       const options = await this.getHttpOptions();

       return this.http.get(`${API_URL}/news?q=${title}`, options).map(
         (itens: BoletimModel[]) => {
           return itens.map(
             (item: BoletimModel) => {
               return new BoletimModel(
                item.id, item.publicador, item.titulo, item.dataPublicacao,
                item.sessao, item.imagem, item.likes);
             }
           )
         }
       ).toPromise();
     }


    async update(news: BoletimModel) {
    const options = await this.getHttpOptions();

    return this.http.put(`${API_URL}/news/${news.id}`, news, options).map(
      (item: BoletimModel) => {
        return new BoletimModel(
          item.id, item.publicador, item.titulo, item.dataPublicacao,
          item.sessao, item.imagem, item.likes);
      }
    ).toPromise();
  }
}

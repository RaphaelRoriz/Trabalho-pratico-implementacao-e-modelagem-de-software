import { Injectable } from '@angular/core';
import { BoletimModel } from '../models/boletins.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/Rx';
import { AuthService } from './auth.service';

const API_URL: string = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class BoletinsService {


  constructor(public http: HttpClient) { }

  async getHttpOptions() {
    //const token = await this.authService.getAuthToken();

    const options = {
      headers: new HttpHeaders({
        //'Authorization': `Bearer ${token}`
      })
    };

    return options;
  }

  async getAll(): Promise<BoletimModel[]> {
      const options = await this.getHttpOptions();

      return this.http.get(`${API_URL}/boletins`, options).map(
        (itens: BoletimModel[]) => {
          return itens.map(
            (item: BoletimModel) => {
              return new BoletimModel(
                item.id, item.publicador,item.titulo, item.dataPublicacao,
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
            item.id, item.publicador,item.titulo, item.dataPublicacao,
            item.sessao, item.imagem, item.likes);
        }
      ).toPromise();
    }

    async searchByTitle(titulo: string): Promise<BoletimModel[]> {

       titulo = titulo.trim().toLowerCase();

       if (titulo == '') {
         return this.getAll();
       }

       const options = await this.getHttpOptions();

       return this.http.get(`${API_URL}/boletins?q=${titulo}`, options).map(
         (itens: BoletimModel[]) => {
           return itens.map(
             (item: BoletimModel) => {
               return new BoletimModel(
                 item.id, item.publicador,item.titulo,  item.dataPublicacao,
                 item.sessao, item.imagem, item.likes);
             }
           )
         }
       ).toPromise();
     }


    async update(boletins: BoletimModel) {
    const options = await this.getHttpOptions();

    return this.http.put(`${API_URL}/boletins/${boletins.id}`, boletins, options).map(
      (item: BoletimModel) => {
        return new BoletimModel(
          item.id, item.publicador,item.titulo,item.dataPublicacao,
          item.sessao, item.imagem, item.likes);
      }
    ).toPromise();
  }
}

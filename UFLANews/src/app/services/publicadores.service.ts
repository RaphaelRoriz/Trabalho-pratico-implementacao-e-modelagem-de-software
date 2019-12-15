import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PublicadorModel } from '../models/publicadores.model';
import { SeguidosModel } from '../models/seguidos.model';
import { AuthService } from './auth.service';

import 'rxjs/Rx';

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
    async getAllSubs(): Promise<SeguidosModel[]> {
        const options = await this.getHttpOptions();

        return this.http.get(`${API_URL}/seguidos`, options).map(
          (itens: SeguidosModel[]) => {
            return itens.map(
              (item: SeguidosModel) => {
                return new SeguidosModel(
                  item.id,item.idUsuario, item.idPublicador);
              }
            )
          }
        ).toPromise();
      }
    async getSeguidos(idUsuario : number) {
        const options = await this.getHttpOptions();
        const  lstSeguidos = await this.getAllSubs();
        let itens = new Array();
        let i : number;
        for(i=0;i<lstSeguidos.length; ++i){
          if(idUsuario == lstSeguidos[i].idUsuario){
            //itens.push(lstSeguidos[i])
            let aux = await this.searchById(lstSeguidos[i].idPublicador);
            itens.push(aux);
            console.log("aqui " + lstSeguidos[i].idPublicador);
          }
        }
        return itens;
      }

      async searchById(id: number): Promise<PublicadorModel> {
        const options = await this.getHttpOptions();

        return this.http.get(`${API_URL}/publicadores/${id}`, options).map(
          (item: PublicadorModel) => {
            return new PublicadorModel(
                item.id,item.nome, item.imagem);
          }
        ).toPromise();
      }



}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/Rx';

import { FavoriteModel, FavoriteTypeModel } from '../models/favorite.model';
import { AuthService } from './auth.service';

const API_URL: string = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor( 
              public  http: HttpClient,
              public authService: AuthService
              ) 
              { }

 async getHttpOptions() {
    const token = await this.authService.getAuthToken();

    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    return options;
  }

  async getFavoriteId(userId: number, newsId: number, type: FavoriteTypeModel): Promise<number> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/favorites?userId=${userId}&newsId=${newsId}&favoriteType=${type}`, options).map(
      (favorites: FavoriteModel[]) => {
        return (favorites.length == 0) ? null : favorites[0].id;
      }
    ).toPromise();
  }


  async getAllByUser(userId: number, type: FavoriteTypeModel): Promise<FavoriteModel[]> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/favorites?_expand=news&_expand=user&userId=${userId}&favoriteType=${type}`, options).map(
      (itens: FavoriteModel[]) => {
        return itens.map(
          (item: FavoriteModel) => {
            return new FavoriteModel(item.user, item.news, item.favoriteType, item.id);
          }
        )
      }
    ).toPromise();
  }

  async add(favorite: FavoriteModel): Promise<number> {
        const data: any = {
      newsId: favorite.news.id,
      userId: favorite.user.id,
      favoriteType: favorite.favoriteType,
    }

    const options = await this.getHttpOptions();

    return this.http.post(`${API_URL}/favorites`, data, options).map(
      (favorite: FavoriteModel) => {
        return favorite.id;
      }
    ).toPromise();
  }

  async delete(id: number): Promise<any> {
    const options = await this.getHttpOptions();

    return this.http.delete(`${API_URL}/favorites/${id}`, options).toPromise();
  }

}

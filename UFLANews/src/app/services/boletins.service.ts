import { Injectable } from '@angular/core';
import { NewsModel } from '../model/news.model';
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

  async getAll(): Promise<NewsModel[]> {
      const options = await this.getHttpOptions();

      return this.http.get(`${API_URL}/news`, options).map(
        (itens: NewsModel[]) => {
          return itens.map(
            (item: NewsModel) => {
              return new NewsModel(
                item.id, item.title, item.likes, item.publishedAt,
                item.image, item.content, item.link);
            }
          )
        }
      ).toPromise();
    }

    async searchById(id: number): Promise<NewsModel> {
      const options = await this.getHttpOptions();

      return this.http.get(`${API_URL}/news/${id}`, options).map(
        (item: NewsModel) => {
          return new NewsModel(
            item.id, item.title, item.likes, item.publishedAt,
            item.image, item.content, item.link);
        }
      ).toPromise();
    }

    async searchByTitle(title: string): Promise<NewsModel[]> {

       title = title.trim().toLowerCase();

       if (title == '') {
         return this.getAll();
       }

       const options = await this.getHttpOptions();

       return this.http.get(`${API_URL}/news?q=${title}`, options).map(
         (itens: NewsModel[]) => {
           return itens.map(
             (item: NewsModel) => {
               return new NewsModel(
                 item.id, item.title, item.likes, item.publishedAt,
                 item.image, item.content, item.link);
             }
           )
         }
       ).toPromise();
     }


    async update(news: NewsModel) {
    const options = await this.getHttpOptions();

    return this.http.put(`${API_URL}/news/${news.id}`, news, options).map(
      (item: NewsModel) => {
        return new NewsModel(
          item.id, item.title, item.likes, item.publishedAt,
          item.image, item.content, item.link);
      }
    ).toPromise();
  }
}

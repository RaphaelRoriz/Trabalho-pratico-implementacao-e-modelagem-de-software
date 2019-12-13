import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuarios.model';
import { UserService } from 'src/app/services/usuario.service';
import { FavoriteModel, FavoriteTypeModel } from 'src/app/models/favorite.model'
import { FavoritesService } from 'src/app/services/favorites.service'

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})

export class SubscriptionsPage implements OnInit {

  lstFavoriteNews: FavoriteModel[];
  user: UsuarioModel;

  constructor(
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public userService: UserService,
    public favoritesService: FavoritesService
  ) { }

  async ngOnInit() {
    const userEmail: string = await this.authService.getAuthEmail();
    this.user = await this.userService.getUserByEmail(userEmail);

    this.lstFavoriteNews = await this.favoritesService.
      getAllByUser(this.user.id, FavoriteTypeModel.STAR);
  }

  async doRefresh(event: any) {
    try {
      this.lstFavoriteNews = await this.favoritesService.
        getAllByUser(this.user.id, FavoriteTypeModel.STAR);
    } finally {
      event.target.complete();
    }
  }

}

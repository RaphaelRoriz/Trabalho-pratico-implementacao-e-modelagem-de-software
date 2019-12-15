import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuarios.model';
import { SeguidosModel } from 'src/app/models/seguidos.model';
import { UserService } from 'src/app/services/usuario.service';
import { PublicadoresService } from 'src/app/services/publicadores.service';
import { FavoriteModel, FavoriteTypeModel } from 'src/app/models/favorite.model'
import { FavoritesService } from 'src/app/services/favorites.service'

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})

export class SubscriptionsPage implements OnInit {

  lstSeguidos: SeguidosModel[];
  user: UsuarioModel = new UsuarioModel();


  constructor(
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public userService: UserService,
    public favoritesService: FavoritesService,
    public publicadoresService : PublicadoresService
  ) { }
  async ngOnInit() {
    try{
      if(this.authService.isAuthenticated()){
        const userEmail: string = await this.authService.getAuthEmail();
        this.user = await this.userService.getUserByEmail(userEmail);
        this.lstSeguidos = await this.publicadoresService.getSeguidos(this.user.id);

      }

    }catch(error){
      console.log("no: "+error);
    }
  }

  async doRefresh(event: any) {
    try {
        this.lstSeguidos = await this.publicadoresService.getSeguidos(this.user.id);
    } finally {
      event.target.complete();
    }
  }

}

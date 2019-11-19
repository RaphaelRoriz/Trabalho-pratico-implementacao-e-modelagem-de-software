import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoletimModel } from 'src/app/models/boletins.model';
import { BoletinsService } from 'src/app/services/Boletins.service';
import { UsuarioModel } from 'src/app/models/usuarios.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {

  currentBoletim : BoletimModel;
  boletimId : number;
  user:UsuarioModel;

  constructor(
    public activatedRoute: ActivatedRoute,
    public boletinsService: BoletinsService,
    public authService: AuthService,
    public userService: UserService) { }

  async ngOnInit() {
    try{
    const userEmail = await this.authService.getAuthEmail();
    //this.user = await this.userService.getUserByEmail(userEmail);
    this.boletimId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.currentBoletim = await this.boletinsService.searchById(this.boletimId);
  }catch(error){
    console.log("no: "+error);
  }
  }



}

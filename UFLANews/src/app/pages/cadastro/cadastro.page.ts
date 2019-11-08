import { Component, OnInit } from '@angular/core';
import { AuthService} from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuarios.model';
import { UserService} from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  password: string;
  confirmarPassword: string;

  constructor(public authService: AuthService,
              public userService: UserService
  ) { }

  ngOnInit() {
  }

  async save() {
    const token: any = await this.authService.register(this.usuario.email, this.password);
    // Isto foi necessário, pois o token ainda não existe e o usuário
    // precisa ser cadastrado na base de dados da API
    await this.userService.add(this.usuario, token.access_token);
    this.usuario = new UsuarioModel();
    this.password = "";
    this.confirmarPassword = "";
  }
}

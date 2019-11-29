import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuarios.model';
import { UserService } from 'src/app/services/usuario.service';
import { ToastService, MessageType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  user: UsuarioModel = new UsuarioModel();
  password: string;
  confirmarPassword: string;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public toastService: ToastService
  ) { }

  ngOnInit() {
  }

  checkForm() {
    if (
      this.user.nome == undefined || this.user.nome.trim() == "" ||
      this.user.email == undefined || this.user.email.trim() == "" ||
      this.password == undefined || this.password.trim() == "" ||
      this.confirmarPassword == undefined || this.confirmarPassword.trim() == "") {
      this.toastService.presentMessage("Por favor, preencha todos os campos do formulário!", MessageType.ERROR);
      return false;
    }

    if (this.password != this.confirmarPassword) {
      this.toastService.presentMessage("As senhas informadas não conferem!", MessageType.ERROR);
      return false;
    }

    return true;
  }

  async save() {
    if (this.checkForm()) {
      try {

        const token: any = await this.authService.register(this.user.email, this.password);

        await this.userService.add(this.user, token.access_token);

        this.user = new UsuarioModel();
        this.password = "";
        this.confirmarPassword = "";

        this.toastService.presentMessage("Conta criada com sucesso!", MessageType.SUCCESS);
      } catch (error) {
        this.toastService.presentMessage("Já existe uma conta cadastrada com esse endereço de email!", MessageType.ERROR);
      }

    }

  }

}

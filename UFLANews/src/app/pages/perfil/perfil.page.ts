import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';
import { UsuarioModel } from 'src/app/models/usuarios.model';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/usuario.service';
import { ToastService, MessageType } from 'src/app/services/toast.service';
const API_URL: string = "http://localhost:8000";
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: UsuarioModel = new UsuarioModel();
  password: string;
  confirmarPassword: string;
  constructor(
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public toastService: ToastService,
    public userService: UserService

  ) { }

  async ngOnInit() {
    try{
      if(this.authService.isAuthenticated()){
        const userEmail = await this.authService.getAuthEmail();
        this.user = await this.userService.getUserByEmail(userEmail);
        
      }
      
    }catch(error){
      //usar para debug: console.log("no: "+error);
    }
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
    console.log(this.user.nome+" "+this.user.email+" "+this.password+" "+this.confirmarPassword);
    const userEmail = await this.authService.getAuthEmail();
    console.log(userEmail);
    if (this.checkForm()) {
      try {
        const token: any = this.authService.getAuthToken();
        console.log(token);
        await this.userService.update(this.user, this.password );

       

        this.toastService.presentMessage("Dados da conta atualizados!", MessageType.SUCCESS);
      } catch (error) {
        this.toastService.presentMessage("Não foi possível atualizar os dados!", MessageType.ERROR);
      }

    }

  }

  async del(){
    delete(this.user);
  }
}

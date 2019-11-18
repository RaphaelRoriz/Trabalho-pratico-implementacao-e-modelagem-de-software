import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService, MessageType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(public authService: AuthService, public toastService: ToastService) { }

  ngOnInit() {
  }

  checkForm() {
    if (this.email == undefined || this.email.trim() == "" ||
      this.password == undefined || this.password.trim() == "") {
      this.toastService.presentMessage("Por favor, preencha todos os campos do formulário!", MessageType.ERROR);
      return false;
    }
    return true;
  }

  async login() {
    if (this.checkForm()) {
      try {
        await this.authService.login(this.email, this.password);
        this.email = "";
        this.password = "";
      } catch (error) {
        this.toastService.presentMessage("Email/senha inválidos!", MessageType.ERROR);
      }
    }
  }
}

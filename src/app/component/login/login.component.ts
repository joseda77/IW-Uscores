import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuarioService/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../class/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario = {
    user: '',
    password: '',
    email: ''
  };
  errorMessage = '';
  constructor(public servicio: UsuarioService, public routes: Router) {}

  ngOnInit() {}
  onLogin() {
    this.servicio.login(this.usuario).subscribe(
      result => {
        const message = JSON.parse(result._body).Message;
        if (message === 'usuario autenticado') {
          sessionStorage.setItem('usuario', this.usuario.user);
          alert(message);
          this.usuario.user = '';
          this.usuario.password = '';
          this.usuario.email = '';
          this.routes.navigate(['../torneofavorito']);
        } else {
          this.usuario.user = '';
          this.usuario.password = '';
          this.usuario.email = '';
          this.errorMessage = message;
        }
      },
      error => {
        console.log('Este es el error  del frontend ' + <any>error);
      }
    );
  }
}

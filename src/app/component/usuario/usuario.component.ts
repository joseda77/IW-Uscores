import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../class/usuario';
import { UsuarioService } from '../../service/usuarioService/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario = {
    user: '',
    password: '',
    email: ''
  };
  errorMessage = '';
  constructor(public servicio: UsuarioService, public routes: Router) {}

  ngOnInit() {}

  onLogin() {
    this.servicio.login(this.usuario).subscribe(result => {
      alert(result);
      if (result.Message === 'usuario autenticado') {
        alert(result);
        this.usuario.user = '';
        this.usuario.password = '';
        this.usuario.email = '';
        this.routes.navigate(['../torneo']);
      } else {
        this.usuario.user = '';
        this.usuario.password = '';
        this.usuario.email = '';
        this.errorMessage = result;
      }
    },
      error => {
        console.log('Este es el error  del frontend ' + <any>error);
      });
  }
}

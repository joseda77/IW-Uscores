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

  registro() {
    this.servicio.registro(this.usuario).subscribe( result => {
      const message = JSON.parse(result._body).Message;
      if (message === 'Usuario registrado correctamente') {
        alert(message);
        this.usuario.user = '';
        this.usuario.password = '';
        this.usuario.email = '';
        this.routes.navigate(['../login']);
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

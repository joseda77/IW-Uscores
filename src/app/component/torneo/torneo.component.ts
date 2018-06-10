import { Component, OnInit } from '@angular/core';
import { TorneoService } from '../../service/torneoService/torneo.service';
import { Router } from '@angular/router';
import { Torneo } from '../../class/torneo';
import { UsuarioService } from '../../service/usuarioService/usuario.service';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.css']
})
export class TorneoComponent implements OnInit {
  torneo: Torneo = {
    nombre: '' ,
    codigo: '' ,
    usuario: '' ,
    deporte: '' ,
    tipoTorneo: ''
  };
  user = '';
  errorMessage = '';
  constructor(public torneoService: TorneoService, public routes: Router,
     public userService: UsuarioService) {
        this.user = sessionStorage.getItem('usuario');
        this.torneo.codigo = this.torneoService.getCodTorneo();
        this.getTorneo();
      }

  ngOnInit() {
  }

  addTorneo() {
    if (this.user == null || this.user === '') {
      alert('USUARIO NO AUTENTICADO, POR FAVOR AUTENTIQUESE!!');
      return;
    }
    this.torneo.usuario = this.user;
    this.torneoService.crearTorneo(this.torneo).subscribe(
      result => {
        const message = JSON.parse(result._body).Message;
        if (message === 'Torneo creado correctamente') {
          alert(message);
          this.torneo.nombre = '';
          this.torneo.codigo = '';
          this.torneo.usuario = '';
          this.torneo.tipoTorneo = '';
          this.torneo.deporte = '';
          this.routes.navigate(['../partido']);
        } else {
          this.torneo.nombre = '';
          this.torneo.codigo = '';
          this.torneo.usuario = '';
          this.torneo.tipoTorneo = '';
          this.torneo.deporte = '';
          this.errorMessage = message;
        }
      },
      error => {
        console.log('Este es el error  del frontend ' + <any>error);
      }
    );
  }

  getListaTorneo() {
    this.torneoService.getListTorneos().subscribe(result => {
      const message = JSON.parse(result._body);
      console.log(message);
    });
  }

  getTorneo() {
    if (this.torneo.codigo === '') {
      alert('Codigo ingresado no valido o en blanco!!!');
      return;
    }
    this.torneoService.getTorneo(this.torneo.codigo).subscribe(result => {
      console.log('retorna ', result);
       const message = JSON.parse(result._body);
       console.log('Entra aqui y lo que llega es', message);
      if (message !== '') {
        this.torneo.nombre = message.nombre;
        this.torneo.codigo = message.codigo;
        this.torneo.usuario = message.usuario;
        this.torneo.tipoTorneo = message.tipoTorneo;
        this.torneo.deporte = message.deporte;
      } else {
        this.torneo.nombre = '';
        this.torneo.codigo = '';
        this.torneo.usuario = '';
        this.torneo.tipoTorneo = '';
        this.torneo.deporte = '';
        this.errorMessage = message;
      }
    },
      error => {
        alert('Codigo no encontrado, por favor ingrese un codigo');
        return;
      });
  }

  deleteTorneo() {
    console.log(this.userService.getUsuario());
    if (this.user == null || this.user === '') {
      alert('USUARIO NO AUTENTICADO, POR FAVOR AUTENTIQUESE!!');
      return;
    }
    this.torneo.usuario = this.user;
    this.torneoService.deleteTorneo(this.torneo).subscribe(result => {
      const message = JSON.parse(result._body).Message;
      if (message === 'Torneo eliminado') {
        this.torneo.nombre = '';
        this.torneo.codigo = '';
        this.torneo.usuario = '';
        this.torneo.tipoTorneo = '';
        this.torneo.deporte = '';
        alert('Torneo eliminado con exito');
      } else {
        this.torneo.nombre = '';
        this.torneo.codigo = '';
        this.torneo.usuario = '';
        this.torneo.tipoTorneo = '';
        this.torneo.deporte = '';
        this.errorMessage = message;
      }
    },
      error => {
        alert('No se puede borrar el torneo!!');
        return;
    });
  }
}

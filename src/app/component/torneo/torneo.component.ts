import { Component, OnInit } from '@angular/core';
import { TorneoService } from '../../service/torneoService/torneo.service';
import { Router } from '@angular/router';
import { Torneo } from '../../class/torneo';
import { UsuarioService } from '../../service/usuarioService/usuario.service';
import { TorneoFavoritoService } from '../../service/torneoFavoritoService/torneo-favorito.service';

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
  bandera = true;
  constructor(public torneoService: TorneoService, public routes: Router,
     public userService: UsuarioService, public torneoFavoService: TorneoFavoritoService) {
        this.user = sessionStorage.getItem('usuario');
        this.torneo.codigo = this.torneoService.getCodTorneo();
        if (this.torneo.codigo !== '') {
          this.bandera = this.bandera;
          this.getTorneo();
        }
      }

  ngOnInit() {
  }

  /**Agrega un torneo a los favoritos */
  addTorneoFavorito() {
    this.torneo.usuario = this.user;
    this.torneoFavoService.addTorneo(this.torneo).subscribe(result => {
      const message = JSON.parse(result._body).Message;
      if (message === 'Torneo agregado correctamente') {
        alert('El torneo ha sido agregado a favoritos correctamente');
      } else {
        alert('Error, el torneo ya existe en su cuenta ');
      }
    }, error => {
      console.log('Error ' + <any>error);
    });
  }
  /**Metodo que activa o desactiva secciones del html por medio de la bandera */
  muestraVista() {
    this.bandera = false;
    this.torneo.nombre = '';
    this.torneo.codigo = '';
    this.torneo.usuario = '';
    this.torneo.tipoTorneo = '';
    this.torneo.deporte = '';
  }

  /**Metodo que llama al servicio de torneo para agregar un torneo */
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

  /**Metodo que llama al servicio de toreno para obtener un torneo en especifico */
  getTorneo() {
    if (this.torneo.codigo === '') {
      alert('Codigo ingresado no valido o en blanco!!!');
      return;
    }
    this.bandera = true;
    this.torneoService.getTorneo(this.torneo.codigo).subscribe(result => {
       const message = JSON.parse(result._body);
      if (message !== '') {
        this.torneo.nombre = message.nombre;
        this.torneo.codigo = message.codigo;
        this.torneo.usuario = message.usuario.nombreUsuario;
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

  /**Metodo que llama al servicio de torneo para borrar un torneo en especifico */
  deleteTorneo() {
    if (this.user == null || this.user === '') {
      alert('USUARIO NO AUTENTICADO, POR FAVOR AUTENTIQUESE!!');
      return;
    }
    if (this.torneo.usuario !== this.user) {
      alert('USTED NO ESTA AUTORIZADO PARA REALIZAR ESTA ACCIÓN!!');
      return;
    }
    if (this.torneo.codigo === '') {
      alert('No ha ingresado un torneo, por favor busque el torneo a eliminar');
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

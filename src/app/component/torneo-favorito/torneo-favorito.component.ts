import { Component, OnInit } from '@angular/core';
import { TorneoFavoritoService } from '../../service/torneoFavoritoService/torneo-favorito.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuarioService/usuario.service';
import { Torneo } from '../../class/torneo';
import { TorneoFavorito } from '../../class/torneoFavorito';
import { TorneoService } from '../../service/torneoService/torneo.service';

@Component({
  selector: 'app-torneo-favorito',
  templateUrl: './torneo-favorito.component.html',
  styleUrls: ['./torneo-favorito.component.css']
})
export class TorneoFavoritoComponent implements OnInit {
  listaTorneosFav: TorneoFavorito[];
  torneoFavorito: TorneoFavorito = {
    usuario: '',
    torneo: ''
  };
  codigo = '';
  listaTorneo: Torneo[];
  torneo: Torneo = {
    nombre: '',
    codigo: '',
    usuario: '',
    deporte: '',
    tipoTorneo: ''
  };
  user = '';
  infoMessage = '';
  constructor(
    public torneoFavService: TorneoFavoritoService,
    public routes: Router,
    public userService: UsuarioService,
    public torneoService: TorneoService
  ) {
    this.user = sessionStorage.getItem('usuario');
    this.torneoFavService.getList(this.user).subscribe(result => {
      if (result._body !== 'null' || result === null) {
        const tournament = JSON.parse(result._body).torneoFavorito;
        this.listaTorneosFav = <TorneoFavorito[]>tournament;
        this.infoMessage = '';
        this.mostrarTorneos();
      } else {
        return this.infoMessage = 'Usted no tiene torneos Favoritos, por favor seleccione agregue uno para poder ver toda información';
      }
    });
  }

  ngOnInit() {}

  /**Metodo que llama el servicio para buscar un torneo y que abre una ventana para visualizar su información */
  getTorneo() {
    if (this.codigo === '') {
      alert('Por favor ingrese un codigo!!!');
      return;
    } else {
      this.torneoService.setTorneo(this.codigo);
      this.routes.navigate(['torneo']);
    }
  }

  /**Muestra los torneos favoritos pertenecientes a un usuario */
  mostrarTorneos() {
    this.listaTorneo = new Array<Torneo>();
    if (this.listaTorneosFav.length === undefined) {
      this.torneo.codigo = this.listaTorneosFav['torneo'].codigo;
      this.torneo.nombre = this.listaTorneosFav['torneo'].nombre;
      this.torneo.tipoTorneo = this.listaTorneosFav['torneo'].tipoTorneo;
      this.torneo.deporte = this.listaTorneosFav['torneo'].deporte;
      this.torneo.usuario = this.listaTorneosFav['torneo'].usuario;
      this.listaTorneo.push(this.torneo);
    }
    for (const i of this.listaTorneosFav) {
      this.torneo.codigo = i.torneo['codigo'];
      this.torneo.nombre = i.torneo['nombre'];
      this.torneo.tipoTorneo = i.torneo['tipoTorneo'];
      this.torneo.deporte = i.torneo['deporte'];
      this.torneo.usuario = i.torneo['usuario'];
      this.listaTorneo.push(this.torneo);
    }
  }

  /**Elimina el torneo que tenga como favorito un usuario logueado */
  deleteTorneo(torneo: Torneo) {
    if (this.user == null || this.user === '') {
      alert('USUARIO NO AUTENTICADO, POR FAVOR AUTENTIQUESE!!');
      return;
    }
    this.torneoFavService.deleteTorneo(this.user, torneo.codigo)
      .subscribe(result => {
        if (result._body !== 'null') {
          const posicion = this.listaTorneo.indexOf(torneo);
          if (posicion >= 0) {
            this.listaTorneo.splice(posicion, 1);
            this.mostrarTorneos();
          }
        } else {
          alert('El torneo ha sido eliminado o no existe');
          this.mostrarTorneos();
        }
      });
  }
}

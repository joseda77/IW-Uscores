import { Component, OnInit } from '@angular/core';
import { TorneoFavoritoService } from '../../service/torneoFavoritoService/torneo-favorito.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuarioService/usuario.service';
import { Torneo } from '../../class/torneo';
import { TorneoFavorito } from '../../class/torneoFavorito';

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
  listaTorneo: Torneo[];
  torneo: Torneo = {
    nombre: '' ,
    codigo: '' ,
    usuario: '' ,
    deporte: '' ,
    tipoTorneo: ''
  };
  user = '';
  infoMessage = '';
  constructor(public torneoFavService: TorneoFavoritoService, public routes: Router,
    public userService: UsuarioService) {
      this.user = sessionStorage.getItem('usuario');
      this.torneoFavService.getList(this.user).subscribe(result => {
        if (result._body !== 'null') {
        const tournament = JSON.parse(result._body).torneoFavorito;
        this.listaTorneosFav = <TorneoFavorito[]>tournament;
        this.infoMessage = '';
        this.mostrarTorneos();
        } else {
          return this.infoMessage = 'Usted no tiene torneos Favoritos, por favor seleccione agregue',
           'uno para poder ver toda información';
        }
      });

     }

  ngOnInit() {
  }

  mostrarTorneos() {
    this.listaTorneo = new Array<Torneo>();
    for (const i of this.listaTorneosFav) {
      this.torneo.codigo = i.torneo['codigo'];
      this.torneo.nombre = i.torneo['nombre'];
      this.torneo.tipoTorneo = i.torneo['tipoTorneo'];
      this.torneo.deporte = i.torneo['deporte'];
      this.torneo.usuario = i.torneo['usuario'];
      this.listaTorneo.push(this.torneo);
    }
  }

  addTorneoFav() {
    this.torneo.usuario = this.user;
    this.torneoFavService.addTorneo(this.torneo).subscribe(result => {
      console.log(result);
    });
  }

  deleteTorneo(torneo: Torneo) {
    this.torneoFavService.deleteTorneo(this.user, torneo.codigo).subscribe(result => {
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

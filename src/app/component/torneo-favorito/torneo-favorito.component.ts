import { Component, OnInit } from '@angular/core';
import { TorneoFavoritoService } from '../../service/torneoFavoritoService/torneo-favorito.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuarioService/usuario.service';
import { Usuario } from '../../class/usuario';
import { Torneo } from '../../class/torneo';
import { TorneoFavorito } from '../../class/torneoFavorito';

@Component({
  selector: 'app-torneo-favorito',
  templateUrl: './torneo-favorito.component.html',
  styleUrls: ['./torneo-favorito.component.css']
})
export class TorneoFavoritoComponent implements OnInit {
  listaTorneosFav: TorneoFavorito[];
  torneoFavorito: TorneoFavorito ={
    usuario: '',
    torneo: ''
  }
  listaTorneo: Torneo[];
  torneo: Torneo = {
    nombre: '' ,
    codigo: '' ,
    usuario: '' ,
    deporte: '' ,
    tipoTorneo: ''
  };
  user = '';
  constructor(public torneoFavService: TorneoFavoritoService, public routes: Router,
    public userService: UsuarioService) {
      this.user =sessionStorage.getItem('usuario');
      this.torneoFavService.getList(this.user).subscribe(result =>{
        var tournament =JSON.parse(result._body).torneoFavorito;
        this.listaTorneosFav = <TorneoFavorito[]>tournament;
        this.mostrarTorneos();
      });
      
     }

  ngOnInit() {
  }

  mostrarTorneos(){
    this.listaTorneo = new Array<Torneo>();
    for (let i of this.listaTorneosFav){
      this.torneo.codigo = i.torneo["codigo"];
      this.torneo.nombre = i.torneo["nombre"];
      this.torneo.tipoTorneo = i.torneo["tipoTorneo"];
      this.torneo.deporte = i.torneo["deporte"];
      this.torneo.usuario = i.torneo["usuario"];
      this.listaTorneo.push(this.torneo);
    }
  }

  addTorneoFav(){
    this.torneo.usuario = this.user;
    this.torneoFavService.addTorneo(this.torneo).subscribe(result => {
      console.log(result);
    });
  }
}

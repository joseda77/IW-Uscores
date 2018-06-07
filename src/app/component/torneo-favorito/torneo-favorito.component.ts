import { Component, OnInit } from '@angular/core';
import { TorneoFavoritoService } from '../../service/torneoFavoritoService/torneo-favorito.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuarioService/usuario.service';

@Component({
  selector: 'app-torneo-favorito',
  templateUrl: './torneo-favorito.component.html',
  styleUrls: ['./torneo-favorito.component.css']
})
export class TorneoFavoritoComponent implements OnInit {

  constructor(public torneoFavService: TorneoFavoritoService, public routes: Router,
    public userService: UsuarioService) { }

  ngOnInit() {
  }

}

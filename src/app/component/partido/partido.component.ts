import { Component, OnInit } from '@angular/core';
import { PartidoService } from '../../service/partidoService/partido.service';
import { Router } from '@angular/router';
import { Partido } from '../../class/partido';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {
  codigo = '';
  partido: Partido = {
    consecutivo: '',
    equipo1: '',
    equipo2: '',
    puntaje1: '',
    puntaje2: '',
    fase: '',
    torneo: ''
  };
  constructor(public partidoService: PartidoService, public routes: Router) {
    this.codigo = this.partidoService.showPartido();
    this.getPartido();
  }

  ngOnInit() {}

  getPartido() {
    if (this.codigo === null || this.codigo === '') {
      this.routes.navigate(['listapartidos']);
      return;
    }
    this.partido.consecutivo = this.codigo['consecutivo'];
    this.partido.equipo1 = this.codigo['equipo1'];
    this.partido.equipo2 = this.codigo['equipo2'];
    this.partido.puntaje1 = this.codigo['puntaje1'];
    this.partido.puntaje2 = this.codigo['puntaje2'];
    this.partido.fase = this.codigo['fase'];
    this.partido.torneo = this.codigo['torneo'];
  }
}

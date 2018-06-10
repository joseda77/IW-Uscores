import { Component, OnInit, ViewChild } from '@angular/core';
import { PartidoService } from '../../service/partidoService/partido.service';
import { Router } from '@angular/router';
import { Partido } from '../../class/partido';

@Component({
  selector: 'app-lista-partidos',
  templateUrl: './lista-partidos.component.html',
  styleUrls: ['./lista-partidos.component.css']
})
export class ListaPartidosComponent implements OnInit {
  listaPartidos: Partido[];
  partido: Partido = {
    consecutivo: '',
    equipo1: '',
    equipo2: '',
    puntaje1: '',
    puntaje2: '',
    fase: '',
    torneo: ''
  };
  constructor(public partidoService: PartidoService, public routes: Router,
  ) {
    this.getPartido();
  }

  ngOnInit() {}

  /**Trae todos los partidos por medio del servicio getlistPartido y se encarga de mostrarlos */
  getPartido() {
    this.partidoService.getListPartido().subscribe(result => {
      const partido = JSON.parse(result['_body']).partido;
      const lista = [];
     for (let i = 0; i < partido.length; i++ ) {
        this.partido.consecutivo = partido[i].consecutivo;
       this.partido.equipo1 = partido[i].equipo1.nombre;
       this.partido.equipo2 = partido[i].equipo2.nombre;
       this.partido.puntaje1 = partido[i].puntajeEquipo1;
       this.partido.puntaje2 = partido[i].puntajeEquipo2;
       this.partido.fase = partido[i].fase;
       this.partido.torneo = partido[i].torneo.nombre;
       lista.push(this.partido);
      }
      this.listaPartidos = lista;
    });
  }

  /**Encargado del boton mostrar partido, llama a la ventana de partido para mostrar la info de un partido en especifico */
  getOnePartido(codigo: string) {
    this.partidoService.setPartido(codigo);
    this.routes.navigate(['partido']);
  }
}

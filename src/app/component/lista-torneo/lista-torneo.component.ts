import { Component, OnInit } from '@angular/core';
import { TorneoService } from '../../service/torneoService/torneo.service';
import { Router } from '@angular/router';
import { Torneo } from '../../class/torneo';

@Component({
  selector: 'app-lista-torneo',
  templateUrl: './lista-torneo.component.html',
  styleUrls: ['./lista-torneo.component.css']
})
export class ListaTorneoComponent implements OnInit {
  listaTorneo: Torneo[];
  constructor(public torneoService: TorneoService, public routes: Router) {
    this.getListTorneos();
  }

  ngOnInit() {
  }

  getListTorneos() {
    this.torneoService.getListTorneos().subscribe(result => {
      const torneos = JSON.parse(result._body).torneo;
      const lista = [];
      for (let i = 0; i < torneos.length; i++) {
        lista.push(torneos[i]);
      }
      console.log("EL listad es",lista);
      this.listaTorneo = lista;
    });
  }

  getInfTorneo(codigo: string) {
    this.torneoService.setTorneo(codigo);
    this.routes.navigate(['torneo']);
  }

}

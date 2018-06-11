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
  codigo = '';
  errorMessage = '';
  constructor(public torneoService: TorneoService, public routes: Router) {
    this.getListTorneos();
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

  /**Metodo que llama al servicio para obtener todos los torneos */
  getListTorneos() {
    this.torneoService.getListTorneos().subscribe(result => {
      const torneos = JSON.parse(result._body).torneo;
      const lista = [];
      for (let i = 0; i < torneos.length; i++) {
        lista.push(torneos[i]);
      }
      this.listaTorneo = lista;
    });
  }

  /**Metodo que llama al servico de torneo para ver la informacion de un torneo seleccionado */
  getInfTorneo(codigo: string) {
    this.torneoService.setTorneo(codigo);
    this.routes.navigate(['torneo']);
  }
}

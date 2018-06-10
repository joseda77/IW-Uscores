import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class PartidoService {
  codigoPartido = '';
  url = 'http://localhost:8080/UScoresWS/rest/partido';
  constructor(private http: Http) {}

  getListPartido() {
    return this.http.get(this.url + '/listapartidos').map(Response => {
      return Response;
    });
  }

  getPartido(codigo: String) {
    return this.http.get(this.url + '?consecutivo=' + codigo).map(Response => {
      return Response; });
  }

  setPartido(codigo: string) {
    this.codigoPartido = codigo;
  }
  /**Envia el codigo del partido a PartidoComponent o cuaquier Componente que lo invoque, para si mostrar el partido */
  showPartido() {
    return this.codigoPartido;
  }
}

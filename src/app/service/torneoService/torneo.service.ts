import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Torneo } from '../../class/torneo';

@Injectable()
export class TorneoService {
  codigo = '';
  url = 'http://localhost:8080/UScoresWS/rest/torneo';
  constructor(private http: Http) {}

  /**Asigna un codigo de torneo, esto es para enviarlo a otro componente */
  setTorneo(codigo: string) {
    this.codigo = codigo;
  }

  /**Metodo por el que acceden los componentes para transferirse torneos */
  getCodTorneo() {
    return this.codigo;
  }

  /**Crea un torneo por medio de un objeto que le llega por parametros */
  crearTorneo(torneo: Torneo): Observable<any> {
    return this.http.post(this.url, torneo).map(result => {
      return result;
    });
  }

  /**Obtiene toda la lista de torneos que existen */
  getListTorneos(): Observable<any> {
    return this.http.get(this.url).map(result => {
      return result;
    });
  }

  /**Retorna un solo torneo por medio de un codigo ingresado */
  getTorneo(codigo: String): Observable<any> {
    return this.http.get(this.url + '/torneo' + '?codigo=' + codigo).map(result => {
      return result;
    });
  }

  /**Actualiza los datos de un torneo por medio de su codigo */
  updateTorneo(torneo: Torneo): Observable<any> {
    return this.http.put(this.url + '?codigo=' + torneo.codigo, torneo).map(result => {
      return result;
    });
  }

  /**Borra un torneo en especifico */
  deleteTorneo(torneo: Torneo): Observable<any> {
    return this.http.delete(this.url + '?codigo=' + torneo.codigo + '&usuario=' + torneo.usuario).map(result => {
      return result;
  });
  }
}

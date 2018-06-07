import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Torneo } from '../../class/torneo';

@Injectable()
export class TorneoService {
  url = 'http://localhost:8080/UScoresWS/rest/torneo';
  constructor(private http: Http) {}

  crearTorneo(torneo: Torneo): Observable<any> {
    return this.http.post(this.url, torneo).map(result => {
      return result;
    });
  }

  getListTorneos(): Observable<any> {
    return this.http.get(this.url).map(result => {
      return result;
    });
  }

  getTorneo(codigo: String): Observable<any> {
    return this.http.get(this.url + '?codigo=' + codigo).map(result => {
      return result;
    });
  }

  updateTorneo(torneo: Torneo): Observable<any> {
    return this.http.put(this.url + '?codigo=' + torneo.codigo, torneo).map(result => {
      return result;
    });
  }

  deleteTorneo(torneo: Torneo): Observable<any> {
    return this.http.delete(this.url + '?codigo=' + torneo.codigo + '&usuario=' + torneo.usuario).map(result => {
      return result;
  });
  }
}

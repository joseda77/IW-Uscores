import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Torneo } from '../../class/torneo';

@Injectable()
export class TorneoFavoritoService {
  url = 'http://localhost:8080/UScoresWS/rest/torneofavorito';
  constructor(private http: Http) {}

  /**Obtiene la lista de torneos favoritos de un usuario */
  getList(usuario: String): Observable<any> {
    console.log(usuario);
    return this.http.get(this.url + '?usuario=' + usuario).map(result => {
      return result;
    });
  }

  /**agrega un torneo favorito a la cuenta de un usuario */
  addTorneo(torneo: Torneo): Observable<any> {
    return this.http.post(this.url + '?usuario=' + torneo.usuario, torneo).map(Response => {
      return Response;
    });
  }

  /**Elimina un torneo favorito de la cuenta de un usuario */
  deleteTorneo(usuario: String, codigo: String): Observable<any> {
    return this.http.delete(this.url + '?usuario=' + usuario + '&codigo=' +  codigo).map(Response => {
      return Response;
    });
  }
}

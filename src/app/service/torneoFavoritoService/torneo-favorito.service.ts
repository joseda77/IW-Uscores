import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class TorneoFavoritoService {
  url = 'http://localhost:8080/UScoresWS/rest/torneofavortio';
  constructor(private http: Http) {}

  getList(usuario: String): Observable<any> {
    return this.http.get(this.url + '?usuario=' + usuario).map(result => {
      return result;
    });
  }
}

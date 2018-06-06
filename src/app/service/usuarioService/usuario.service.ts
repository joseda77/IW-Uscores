import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Usuario } from '../../class/usuario';

@Injectable()
export class UsuarioService {
  nombreUsuario: String = '';
  url = 'http://localhost:8080/UScoresWS/rest/usuario';
  constructor(private http: Http) {}

  login(user: Usuario): Observable<any> {
    return this.http.post(this.url, user).map(Response => {
      this.nombreUsuario = user.user;
      return Response.text();
    });
  }

  registro(user: Usuario) {
    return this.http.post(this.url, user).map(Response => {
      return Response.text();
    });
  }
}

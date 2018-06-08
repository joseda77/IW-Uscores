import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Usuario } from '../../class/usuario';

@Injectable()
export class UsuarioService {
  nombreUsuario: String = '';
  password: String = '';
  url = 'http://localhost:8080/UScoresWS/rest/usuario';
  constructor(private http: Http) {}

  getUsuario() {
    return this.nombreUsuario;
  }

  getPassword() {
    return this.password;
  }

  login(user: Usuario): Observable<any> {
    return this.http.post(this.url+"/login", user).map(Response => {
      this.nombreUsuario = user.user;
      this.password = user.password;
      return Response;
    });
  }

  registro(user: Usuario): Observable<any> {
    return this.http.post(this.url+"/signup", user).map(Response => {
      return Response;
    });
  }
}

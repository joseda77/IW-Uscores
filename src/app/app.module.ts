import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRouterModule } from './module/app-router/app-router.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TorneoComponent } from './component/torneo/torneo.component';
import { PartidoComponent } from './component/partido/partido.component';
import { TorneoFavoritoComponent } from './component/torneo-favorito/torneo-favorito.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { EquipoComponent } from './component/equipo/equipo.component';
import { EquipoService } from './service/equipoService/equipo.service';
import { UsuarioService } from './service/usuarioService/usuario.service';
import { TorneoFavoritoService } from './service/torneoFavoritoService/torneo-favorito.service';
import { TorneoService } from './service/torneoService/torneo.service';
import { PartidoService } from './service/partidoService/partido.service';
import { LoginComponent } from './component/login/login.component';
import { ListaTorneoComponent } from './component/lista-torneo/lista-torneo.component';
import { ListaPartidosComponent } from './component/lista-partidos/lista-partidos.component';


@NgModule({
  declarations: [
    AppComponent,
    TorneoComponent,
    PartidoComponent,
    TorneoFavoritoComponent,
    UsuarioComponent,
    EquipoComponent,
    LoginComponent,
    ListaTorneoComponent,
    ListaPartidosComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRouterModule
  ],
  providers: [
    EquipoService,
    UsuarioService,
    TorneoFavoritoService,
    TorneoService,
    PartidoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

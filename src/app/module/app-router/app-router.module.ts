import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { LoginComponent } from '../../component/login/login.component';
import { TorneoComponent } from '../../component/torneo/torneo.component';
import { PartidoComponent } from '../../component/partido/partido.component';
import { TorneoFavoritoComponent } from '../../component/torneo-favorito/torneo-favorito.component';
import { EquipoComponent } from '../../component/equipo/equipo.component';
import { UsuarioComponent } from '../../component/usuario/usuario.component';
import { ListaPartidosComponent } from '../../component/lista-partidos/lista-partidos.component';
import { ListaTorneoComponent } from '../../component/lista-torneo/lista-torneo.component';
const appModule: Routes = [
  {
    path: '',
    component: ListaTorneoComponent
  },
  {
    path: 'registro',
    component: UsuarioComponent
  },
  {
    path: 'torneo',
    component: TorneoComponent
  },
  {
    path: 'partido',
    component: PartidoComponent
  },
  {
    path: 'torneofavorito',
    component: TorneoFavoritoComponent
  },
  {
    path: 'equipo',
    component: EquipoComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'listapartidos',
    component: ListaPartidosComponent
  },
  {
    path: 'listatorneos',
    component: ListaTorneoComponent
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appModule, {})],
  exports: [RouterModule],
  declarations: []
})
export class AppRouterModule {}

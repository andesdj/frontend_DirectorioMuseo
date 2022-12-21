//Router
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TablasTipoComponent } from './tablas-tipo/tablas-tipo.component';
import { TablasValoresComponent } from './tablas-valores/tablas-valores.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { Ficha1Component } from './ficha1/ficha1.component';
import { AgentesComponent } from './agentes/agentes.component';
import { PermisosComponent } from './permisos/permisos.component';
import { FichaGeneralComponent } from './ficha-general/ficha-general.component';
import { ComisionesCalendarioComponent } from './comisiones-calendario/comisiones-calendario.component';
import { MapaFichasComponent } from './mapa-fichas/mapa-fichas.component';
import { ComisionesGastosComponent } from './comisiones-gastos/comisiones-gastos.component';
import { OfertaArtesComponent } from './oferta-artes/oferta-artes.component';
import { ConcertacionComponent } from './concertacion/concertacion.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { AgrupacionesComponent } from './agrupaciones/agrupaciones.component';
import { CanAuthenticationGuard } from '../services/guards/CanAuthenticationGuard';
import { EspaciosComponent } from './espacios/espacios.component';
import { ConcertacionAComponent } from './concertacion-a/concertacion-a.component';
import { PoligonosComponent } from './poligonos/poligonos.component';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { TablerosComponent } from './tableros/tableros.component';
import { OfertaAdministracionComponent } from './oferta-administracion/oferta-administracion.component';
import { CompromisosAdministracionComponent } from './compromisos-administracion/compromisos-administracion.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ObjetosAdminComponent } from './objetos-admin/objetos-admin.component';



const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    // ---- keycloak ----//
    //canActivate: [CanAuthenticationGuard],
    // ---- keycloak ----//
    canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      // { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress' }},
      { path: 'agentes', component: AgentesComponent, data: { titulo: 'Agentes' } },
      // { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas' }},
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
      // { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs' }},
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
      { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },
      { path: 'ficha1', component: Ficha1Component, data: { titulo: 'Información de la Dirección de Artes' } },
      { path: 'ficha-general', component: FichaGeneralComponent, data: { titulo: 'Ficha General' } },
      { path: 'comisiones-calendario', component: ComisionesCalendarioComponent, data: { titulo: 'Comisiones Calendario' } },
      { path: 'mapa-fichas', component: MapaFichasComponent, data: { titulo: 'Mapa Fichas' } },
      { path: 'comisiones-gastos', component: ComisionesGastosComponent, data: { titulo: 'Comisiones-Gastos' } },
      { path: 'oferta-artes', component: OfertaArtesComponent, data: { titulo: 'Oferta-Artes' } },
      { path: 'oferta-administracion', component: OfertaAdministracionComponent, data: { titulo: 'Registro' } },
      { path: 'entidades', component: EntidadesComponent, data: { titulo: 'Entidades' } },
      { path: 'agrupaciones', component: AgrupacionesComponent, data: { titulo: 'Colectivos' } },
      { path: 'concertacion', component: ConcertacionComponent, data: { titulo: 'Concertación' } },
      { path: 'concertacion-a', component: ConcertacionAComponent, data: { titulo: 'Reportes' } },
      { path: 'espacios', component: EspaciosComponent, data: { titulo: 'Espacios' } },
      { path: 'poligonos', component: PoligonosComponent, data: { titulo: 'Poligonos' } },
      { path: 'indicadores', component: IndicadoresComponent, data: { titulo: 'Indicadores' } },
      { path: 'actividades', component: ActividadesComponent, data: { titulo: 'SIPR' } },
      { path: 'objetos-admin', component: ObjetosAdminComponent, data: { titulo: 'Objetos' } },
      // Mantenimientos
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: { titulo: 'Mantenimiento de Usuarios' }
      },
      // { path: 'tablas-tipo', component: TablasTipoComponent, canActivate: [AdminGuard], data: {titulo: 'Tablas Tipo' }},
      // { path: 'tablas-valores', component: TablasValoresComponent, canActivate: [AdminGuard], data: {titulo: 'Tablas Valores' }},
      // { path: 'perfiles', component: PerfilesComponent, canActivate: [AdminGuard], data: {titulo: 'Perfiles' }},
      // { path: 'permisos', component: PermisosComponent, canActivate: [AdminGuard], data: {titulo: 'Perfiles-Permisos' }},
      { path: 'tablas-tipo', component: TablasTipoComponent, data: { titulo: 'Tablas Tipo' } },
      { path: 'tablas-valores', component: TablasValoresComponent, data: { titulo: 'Tablas Valores' } },
      { path: 'perfiles', component: PerfilesComponent, data: { titulo: 'Perfiles' } },
      { path: 'permisos', component: PermisosComponent, data: { titulo: 'Perfiles-Permisos' } },
      { path: 'tableros', component: TablerosComponent, data: { titulo: 'Tableros' } },
      { path: 'compromisos-administracion', component: CompromisosAdministracionComponent, data: { titulo: 'Lista Asistencia' } },

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

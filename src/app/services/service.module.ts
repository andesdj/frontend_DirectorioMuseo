import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// tslint:disable-next-line:max-line-length
import { SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, AdminGuard, SeguridadService, AgenteService, EntidadService, MapUbicacionService, EscenariosService, OfertaService} from './service.index';
import { TipoReferenciaService } from './tipoReferencia/tipo-referencia.service';
import { CompromisosService } from './compromisos/compromisos.service';






@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  // tslint:disable-next-line:max-line-length
  providers: [SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, TipoReferenciaService, SeguridadService, AdminGuard, AgenteService, EntidadService, MapUbicacionService, EscenariosService, OfertaService, CompromisosService],
  declarations: []
})
export class ServiceModule { }

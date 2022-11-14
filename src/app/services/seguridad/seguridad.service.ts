import { Injectable } from '@angular/core';
import { URL_SERVICIOS, URL_SERVICIOS_CONCERTACION } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Perfil } from 'src/app/models/perfiles.model';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Opcion } from '../../models/opcion.model';
import { Tablero } from 'src/app/models/tableros.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(public http: HttpClient,    public router: Router) { }

  cargarOpciones() {
    const url = URL_SERVICIOS + 'ApiRest/Basicos/getOpciones';
    return this.http.get(url);
  }

  cargarPerfiles() {
    const url = URL_SERVICIOS + 'ApiRest/Basicos/getPerfiles';
    return this.http.get(url);
  }

  cargarPerfilesHabilitados() {
    const url = URL_SERVICIOS + 'ApiRest/Basicos/getPerfilesHabilitados';
    return this.http.get(url);
  }

  cargarTableros() {
    const url = URL_SERVICIOS + 'ApiRest/Basicos/getTableros';
    return this.http.get(url);
  }

  crearTablero( tablero: Tablero ) {
    const json = JSON.stringify(tablero);
        const params = json;
        const headers = new HttpHeaders().set('Content-Type', 'application/json', );
        const url = URL_SERVICIOS + 'ApiRest/Basicos/addTablero';
     return this.http.post(url, params, { headers: headers})
     .pipe(
     map( (resp: any) => {
      Swal.fire('tablero Creado', resp.Mensaje, 'success' );
      return resp.usuario;
     }));
  }

  actualizarTablero( tablero: Tablero ) {
    const json = JSON.stringify(tablero);
        const params = json;
        const headers = new HttpHeaders().set('Content-Type', 'application/json', );
        const url = URL_SERVICIOS + 'ApiRest/Basicos/setTablero';
     return this.http.post(url, params, { headers: headers})
     .pipe(
     map( (resp: any) => {
      Swal.fire('Tablero Actualizado Exitosamente', resp.Mensaje, 'success' );
      return resp.usuario;
     }));
  }


  crearPerfil( perfil: Perfil ) {
    const json = JSON.stringify(perfil);
        const params = json;
        const headers = new HttpHeaders().set('Content-Type', 'application/json', );
        const url = URL_SERVICIOS + 'ApiRest/Basicos/addPerfil';
     return this.http.post(url, params, { headers: headers})
     .pipe(
     map( (resp: any) => {
      Swal.fire('Perfil Creado', resp.Mensaje, 'success' );
      return resp.usuario;
     }));
  }

  deleteTablero(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Basicos/deleteTablero?Id=' + id, headers)
    .pipe(
      map( (resp: any) => {
        Swal.fire('Tablero Eliminado Exitosamente', resp.Mensaje, 'success' );
       return resp.usuario;
      }));
}


  actualizarPerfil( perfil: Perfil ) {
    const json = JSON.stringify(perfil);
        const params = json;
        const headers = new HttpHeaders().set('Content-Type', 'application/json', );
        const url = URL_SERVICIOS + 'ApiRest/Basicos/setPerfil';
     return this.http.post(url, params, { headers: headers})
     .pipe(
     map( (resp: any) => {
      Swal.fire('Perfil Actualizado Exitosamente', resp.Mensaje, 'success' );
      return resp.usuario;
     }));
  }

  crearPermiso( opcion: Opcion ) {
    const json = JSON.stringify(opcion);
        const params = json;
        const headers = new HttpHeaders().set('Content-Type', 'application/json', );
        const url = URL_SERVICIOS + 'ApiRest/Basicos/addPermiso';
     return this.http.post(url, params, { headers: headers})
     .pipe(
     map( (resp: any) => {
      Swal.fire('Permiso Creado', resp.Mensaje, 'success' );
      return resp.usuario;
     }));
  }

  actualizarPermiso( perfil: Opcion ) {
    const json = JSON.stringify(perfil);
        const params = json;
        const headers = new HttpHeaders().set('Content-Type', 'application/json', );
        const url = URL_SERVICIOS + 'ApiRest/Basicos/setPermiso';
     return this.http.post(url, params, { headers: headers})
     .pipe(
     map( (resp: any) => {
      Swal.fire('Permiso Actualizado Exitosamente', resp.Mensaje, 'success' );
      return resp.usuario;
     }));
  }

  deletePermisos(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Basicos/deletePermiso?OpcionesPerfilId=' + id, headers)
    .pipe(
      map( (resp: any) => {
        Swal.fire('Permiso Eliminado Exitosamente', resp.Mensaje, 'success' );
       return resp.usuario;
      }));
}

  deletePerfil(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Basicos/deletePerfil?PerfilId=' + id, headers)
    .pipe(
      map( (resp: any) => {
        Swal.fire('Perfil Eliminado Exitosamente', resp.Mensaje, 'success' );
       return resp.usuario;
      }));
}

cargarPermisos() {
  const url = URL_SERVICIOS + 'ApiRest/Basicos/getPermisos';
  return this.http.get(url);
}

}

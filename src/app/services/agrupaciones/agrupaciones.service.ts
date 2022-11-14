import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AgenteAgrupaciones, Agrupaciones } from 'src/app/models/agrupaciones.model';

@Injectable({
  providedIn: 'root'
})
export class AgrupacionesService {

  constructor(public http: HttpClient) { }

  cargarAgrupaciones() {
    const url = URL_SERVICIOS + 'ApiRest/Agrupacion/GetAllAgrupaciones';
    return this.http.get(url);
  }

  getAgrupacionByAgrupacionId(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Agrupacion/getAgrupacionByAgrupacionId?id=' + id);
}

crearAgrupacion( agrupacion: Agrupaciones ) {
  const json = JSON.stringify(agrupacion);
      const params = json;
      const headers = new HttpHeaders().set('Content-Type', 'application/json', );
      const url = URL_SERVICIOS + 'ApiRest/Agrupacion/addAgrupacion';
   return this.http.post(url, params, { headers: headers})
   .pipe(
   map( (resp: any) => {
    Swal.fire('Información Guardada Exitosamente', resp.Mensaje, 'success' );
    return resp.usuario;
   }));
}

crearAgenteAgrupacion( agenteAgrupacion: AgenteAgrupaciones ) {
  const json = JSON.stringify(agenteAgrupacion);
      const params = json;
      const headers = new HttpHeaders().set('Content-Type', 'application/json', );
      const url = URL_SERVICIOS + 'ApiRest/Agrupacion/addAgenteAgrupacion';
   return this.http.post(url, params, { headers: headers})
   .pipe(
   map( (resp: any) => {
    Swal.fire('Información Guardada Exitosamente', resp.Mensaje, 'success' );
    return resp.usuario;
   }));
}

deleteAgrupacion(id): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'text/plain');
  return this.http.post(URL_SERVICIOS + 'ApiRest/Agrupacion/deleteAgrupacion?AgrupacionId=' + id, headers);
}


cargarAgentesAgrupaciones(id) {
  const url = URL_SERVICIOS + 'ApiRest/Agrupacion/GetAllAgentesAgrupaciones?id=' + id;
  return this.http.get(url);
}

deleteAgenteAgrupacion(id): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'text/plain');
  return this.http.post(URL_SERVICIOS + 'ApiRest/Agrupacion/deleteAgentesAgrupaciones?AgenteAgrupacionId=' + id, headers);
}

}

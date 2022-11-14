import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OfertaPrograma } from '../../pages/oferta-artes/oferta-artes.component';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor(public http: HttpClient) { }

  getAllOfertaPrograma(id) {
    const url = URL_SERVICIOS + 'ApiRest/Basicos/getAllOfertaPrograma?id=' + id;
    return this.http.get(url);
  }

  salvarOfertaPrograma(ofertaPrograma: any) {
    const json = JSON.stringify(ofertaPrograma);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Basicos/addOfertaPrograma';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          if (!resp.OperacionExitosa) {
            Swal.fire('Error', resp.Mensaje, 'error');
          } else {
            Swal.fire('Información Alamacenada  Exitosamente', resp.Mensaje, 'success');
          }
          // this.AgenteId = resp.EjecucionProcesoId;

        }));
  }

  salvarOfertaProgramaRegionalizado(ofertaProgramaRegionalizado: any) {
    debugger;
    const json = JSON.stringify(ofertaProgramaRegionalizado);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Basicos/addOfertaProgramaRegionalizacion';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          if (!resp.OperacionExitosa) {
            Swal.fire('Error', resp.Mensaje, 'error');
          } else {
            Swal.fire('Información Alamacenada  Exitosamente', resp.Mensaje, 'success');
          }
          // this.AgenteId = resp.EjecucionProcesoId;

        }));
  }

  deleteOfertaPrograma(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Basicos/deleteOfertaPrograma?id=' + id, headers);
  }

  deleteOfertaProgramaRegionalizado(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Basicos/deleteOfertaProgramaRegionalizado?id=' + id, headers);
  }

  deleteOfertaProgramaRegionalizadoPorOfertaProgramaId(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Basicos/deleteOfertaProgramaRegionalizadoPorOfertaProgramaId?id=' + id, headers);
  }

  cargarOfertaProgramaRegionalizadoByProgramaId(id) {
    const url = URL_SERVICIOS + 'ApiRest/Basicos/getAllOfertaProgramaRegionalizadoByProgramaId?id=' + id;
    return this.http.get(url);

  }

}

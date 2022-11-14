import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Compromisos, CompromisosAvances } from '../../models/compromisos.model';


@Injectable({
  providedIn: 'root'
})
export class CompromisosService {

  constructor(public http: HttpClient) { }

  getAllCompromisos(id) {
    const url = URL_SERVICIOS + 'ApiRest/Compromisos/GetAllCompromisos?id=' + id;
    return this.http.get(url);
  }

  getCompromisoAvanceByReporteAvanceId(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Compromisos/getCompromisoAvanceByReporteAvanceId?id=' + id);
  }

  getAllCompromisosAvances(id) {
    const url = URL_SERVICIOS + 'ApiRest/Compromisos/getAllCompromisosAvances?id=' + id;
    return this.http.get(url);
  }

  deleteCompromisoAvance(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Compromisos/deleteCompromisoAvance?id=' + id, headers);
  }

  deleteCompromiso(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Compromisos/deleteCompromiso?id=' + id, headers);
  }

  salvarCompromiso(compromiso: Compromisos) {
    const json = JSON.stringify(compromiso);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Compromisos/addCompromiso';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          if (resp.OperacionExitosa) {
            Swal.fire('Información Almacenada', 'Está operación fue ejecutada con éxito', 'success');
          } else {
            Swal.fire('Error al grabar información', 'Está operación se ejecutó con error', 'error');
          }
          return resp.Operacionexitosa;
        }));
  }



  getCompromisoByCompromisoId(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Compromisos/getCompromisoByCompromisoId?id=' + id);
  }


  getUsuariosInternos() {
    const url = URL_SERVICIOS + 'ApiRest/Compromisos/getUsuariosInternos';
    return this.http.get(url);
  }

  salvarCompromisoAvance(compromisoAvance: CompromisosAvances) {
    const json = JSON.stringify(compromisoAvance);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Compromisos/addCompromisoAvance';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          if (resp.OperacionExitosa) {
            Swal.fire('Información Almacenada', 'Está operación fue ejecutada con éxito', 'success');
          } else {
            Swal.fire('Error al grabar información', 'Está operación se ejecutó con error', 'error');
          }
          return resp.Operacionexitosa;
        }));
  }

}

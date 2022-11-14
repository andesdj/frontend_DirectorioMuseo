

import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Indicador, MetaAvanceIndicador, MetaCuatrenioIndicador } from '../../models/Indicador.model';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {
  IndicadorId: number;
  constructor(public http: HttpClient) { }

  cargarIndicadores() {
    // const headers = new HttpHeaders();
    // headers.set('Access-Control-Allow-Origin', '*');
    // headers.set('Access-Control-Allow-Methods', '*');
    // headers.set('Access-Control-Allow-Headers', '*');

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Indicador/getAllIndicadores';
    return this.http.get(url, { headers: headers });

  }

  crearIndicador(agente: Indicador) {
    const json = JSON.stringify(agente);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Indicador/addIndicador';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          if (!resp.OperacionExitosa) {
            Swal.fire('Error', resp.Mensaje, 'error');
          } else {
            Swal.fire('Información Alamacenada  Exitosamente', resp.Mensaje, 'success');
          }
          this.IndicadorId = resp.EjecucionProcesoId;

        }));
  }

  getIndicadorByIndicadorId(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Indicador/getIndicadorByIndicadorId?id=' + id);
  }

  getMetaCuatrenioIndicadorById(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Indicador/getMetaCuatrenioIndicadorById?id=' + id);
  }

  cargarAvancesIndicadores(id) {
    const url = URL_SERVICIOS + 'ApiRest/Indicador/GetAllAvancesIndicador?id=' + id;
    return this.http.get(url);

  }


  crearAvanceIndicador(avanceIndicador: MetaAvanceIndicador) {
    const json = JSON.stringify(avanceIndicador);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Indicador/addAvanceIndicador';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          Swal.fire('Información Almacenada', resp.EjecucionProcesoId, 'success');
          return resp.EjecucionProcesoId;
        }));
  }

  crearMetaCuatrenioIndicador(metaCuatrenioIndicador: MetaCuatrenioIndicador) {
    const json = JSON.stringify(metaCuatrenioIndicador);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Indicador/addMetaCuatrenioIndicador';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          Swal.fire('Información Almacenada', resp.EjecucionProcesoId, 'success');
          return resp.EjecucionProcesoId;
        }));
  }


  getAvanceIndicadorByAvanceIndicadorId(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Indicador/getAvanceIndicadorByAvanceIndicadorId?id=' + id);
  }


  cargarCuatrenioIndicadores(id) {
    const url = URL_SERVICIOS + 'ApiRest/Indicador/GetAllMetasCuatrenioIndicador?id=' + id;
    return this.http.get(url);
  }

  deleteAgenteFormacion(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Indicador/DeleteMetaCuatrenioInidicador?id=' + id, headers);
  }

  deleteAgenteExperiencia(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Indicador/DeleteAvanceIndicador?id=' + id, headers);
  }

  deleteInidicador(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Indicador/deleteIndicador?id=' + id, headers);
  }

}

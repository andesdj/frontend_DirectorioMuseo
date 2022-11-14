import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Agente, AgenteExperiencia, AgenteFormacion } from '../../models/agente.model';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {
  public AgenteId = 0;

  constructor(public http: HttpClient) { }

  downloadMediosById(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Agente/GetMedio?MedioId=' + id,
      { headers: new HttpHeaders().append('Content-Type', 'application/json'), responseType: 'blob', observe: 'body' });
  }

  downloadMediosExperienciaById(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Agente/GetMedioExperiencia?MedioId=' + id,
      { headers: new HttpHeaders().append('Content-Type', 'application/json'), responseType: 'blob', observe: 'body' });
  }

  downloadMediosFormacionById(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Agente/GetMedioFormacion?MedioId=' + id,
      { headers: new HttpHeaders().append('Content-Type', 'application/json'), responseType: 'blob', observe: 'body' });
  }

  cargarAgentes(usuId, perfilId) {
    // const headers = new HttpHeaders();
    // headers.set('Access-Control-Allow-Origin', '*');
    // headers.set('Access-Control-Allow-Methods', '*');
    // headers.set('Access-Control-Allow-Headers', '*');

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Agente/GetAllAgentes?usuId=' + usuId + '&perfilId=' + perfilId;
    return this.http.get(url, { headers: headers });

  }


  crearAgente(agente: Agente) {
    const json = JSON.stringify(agente);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Agente/addAgente';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          if (!resp.OperacionExitosa) {
            Swal.fire('Error', resp.Mensaje, 'error');
          } else {
            Swal.fire('Información Alamacenada  Exitosamente', resp.Mensaje, 'success');
          }
          this.AgenteId = resp.EjecucionProcesoId;

        }));
  }

  cambiarEstadoAgente(agente: Agente) {
    const json = JSON.stringify(agente);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Agente/cambiarEstadoAgente';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          Swal.fire('Información Alamacenada  Exitosamente', resp.Mensaje, 'success');
          this.AgenteId = resp.EjecucionProcesoId;
        }));
  }

  crearAgenteExperiencia(agente: AgenteExperiencia) {
    const json = JSON.stringify(agente);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Agente/addAgenteExperiencia';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          Swal.fire('Información Almacenada', resp.EjecucionProcesoId, 'success');
          debugger;
          return resp.EjecucionProcesoId;
        }));
  }

  crearAgenteFormacion(agente: AgenteFormacion) {
    const json = JSON.stringify(agente);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Agente/addAgenteFormacion';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          Swal.fire('Información Almacenada', resp.Mensaje, 'success');
          return resp.usuario;
        }));
  }


  getAgenteByAgenteId(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Agente/getAgenteByAgenteId?id=' + id);
  }

  getAgentesOtrasocupaciones(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Agente/getAgentesOtrasocupaciones?id=' + id);
  }

  getAgenteExperienciaByAgenteId(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Agente/getAgenteExperienciaByExperienciaId?id=' + id);
  }

  getAgenteFormacionByAgenteId(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Agente/getAgenteFormacionByFormacionId?id=' + id);
  }

  cargarAgentesExperiencia(id) {
    const url = URL_SERVICIOS + 'ApiRest/Agente/getAllAgentesExperiencia?id=' + id;
    return this.http.get(url);

  }

  cargarAgentesFormacion(id) {
    const url = URL_SERVICIOS + 'ApiRest/Agente/getAllAgentesFormacion?id=' + id;
    return this.http.get(url);

  }

  deleteAgente(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Agente/deleteAgente?agenteId=' + id, headers);
  }

  deleteAgenteExperiencia(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Agente/deleteAgenteExperiencia?id=' + id, headers);
  }

  deleteAgenteFormacion(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Agente/deleteAgenteFormacion?id=' + id, headers);
  }

  // consultaAgentePorCedula(id): Observable<any> {
  //   const headers = new HttpHeaders().set('Content-Type', 'text/plain');
  //   return this.http.post(URL_SERVICIOS + 'ApiRest/Agente/consultaAgentePorCedula?id=' + id, headers);
  // }

  consultaAgentePorCedula(id): Observable<any> {
    const url = URL_SERVICIOS + 'ApiRest/Agente/consultaAgentePorCedula?id=' + id;
    return this.http.get(url);
  }
  consultaAgenteAgrupacionesPorCedula(id): Observable<any> {
    const url = URL_SERVICIOS + 'ApiRest/Agente/consultaAgenteAgrupacionesPorCedula?id=' + id;
    return this.http.get(url);
  }

  consultaAgentePorCorreo(id): Observable<any> {
    const url = URL_SERVICIOS + 'ApiRest/Agente/consultaAgentePorCorreo?id=' + id;
    return this.http.get(url);
  }
}

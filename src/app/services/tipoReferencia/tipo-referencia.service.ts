import { Injectable } from '@angular/core';
import { URL_SERVICIOS, URL_SERVICIOS_CONCERTACION, URL_SERVICIOS_SOY_CULTURA } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TipoReferencia } from 'src/app/models/TipoReferencia.model';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { ValorReferencia } from 'src/app/models/valorReferencia.model';


@Injectable({
  providedIn: 'root'
})
export class TipoReferenciaService {

  constructor(public http: HttpClient, public router: Router) { }

  cargarTiposReferencia() {
    const url = URL_SERVICIOS + 'ApiRest/Basicos/getTiposReferencia';
    return this.http.get(url);
  }

  cargarValoresReferencia() {
    const url = URL_SERVICIOS + 'ApiRest/Basicos/getValorReferencia';
    return this.http.get(url);
  }

  deleteValorReferencia(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Basicos/deleteValorReferencia?id=' + id, headers)
      .pipe(
        map((resp: any) => {
          Swal.fire('Valor Eliminado Exitosamente', resp.Mensaje, 'success');
          return resp.usuario;
        }));
  }

  crearTipoReferencia(tipoReferencia: TipoReferencia) {
    const json = JSON.stringify(tipoReferencia);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Basicos/addTipoReferencia';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          Swal.fire('Tipo Tabla Actualizada', resp.Mensaje, 'success');
          return resp.usuario;
        }));
  }

  crearValorReferencia(valorReferencia: ValorReferencia) {
    const json = JSON.stringify(valorReferencia);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Basicos/addvalorReferencia';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          Swal.fire('Tabla Valor Actualizada', resp.Mensaje, 'success');
          return resp.usuario;
        }));
  }

  actualizarReferencia(tipoReferencia: TipoReferencia) {
    const json = JSON.stringify(tipoReferencia);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Basicos/setTipoReferencia';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          Swal.fire('Tipo Tabla Actualizada', resp.Mensaje, 'success');
          return resp.usuario;
        }));
  }

  actualizarValorReferencia(valorReferencia: ValorReferencia) {
    const json = JSON.stringify(valorReferencia);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Basicos/setvalorReferencia';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          Swal.fire('Tabla Valor Actualizada', resp.Mensaje, 'success');
          return resp.usuario;
        }));
  }

  getTipoReferenciaById(id): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(url + 'ApiRest/Basicos/getTipoReferenciaById?id=' + id);
  }

  getValorReferenciaById(id): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(url + 'ApiRest/Basicos/getValorReferenciaById?id=' + id);
  }

  getValorReferenciaPorTipoValorId(id): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(url + 'ApiRest/Basicos/getValorReferenciaPorTipoValorId?id=' + id);
  }

  getValorReferenciaPorTipoValorNombre(nombre): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(url + 'ApiRest/Basicos/getValorReferenciaPorTipoValorNombre?nombre=' + nombre);
  }

  getValorReferenciaPorTipoValorIdPadre(id): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(url + 'ApiRest/Basicos/getValorReferenciaPorTipoValorIdPadre?id=' + id);
  }

  getValorReferenciaOcupacionesPorTipoValorIdPadre(id): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(url + 'ApiRest/Basicos/getValorReferenciaOcupacionesPorTipoValorIdPadre?id=' + id);
  }




  getDepartamentos(): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(url + 'ApiRest/Basicos/getDepartamentos');
  }

  getPaises(): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(url + 'ApiRest/Basicos/getPaises');
  }

  getOfertaPrograma(id): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(url + 'ApiRest/Basicos/getOfertaPrograma?AreaId=' + id);
  }

  getOfertaProgramaByOfertaProgramaId(id): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(url + 'ApiRest/Basicos/getOfertaProgramaByOfertaProgramaId?id=' + id);
  }

  getMunicipiosByDepartamento(id): Observable<any> {
    let id2 = -1;
    if (Number.isInteger(id)) {
      id2 = id;
    }
    return this.http.get(URL_SERVICIOS + 'ApiRest/Basicos/getMunicipiosByDepartamento?id=' + id2);
  }

  getCentrosPobladosByMunicipio(id): Observable<any> {
    let id2 = -1;
    if (Number.isInteger(id)) {
      id2 = id;
    }
    return this.http.get(URL_SERVICIOS + 'ApiRest/Basicos/getCentrosPobladosByMunicipio?id=' + id2);
  }

  getDepartamentosComisiones(): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(url + 'ApiRest/Basicos/getDepartamentosComisiones');
  }

  getMunicipiosComisionesByDep(id): Observable<any> {
    let id2 = -1;
    if (Number.isInteger(id)) {
      id2 = id;
    }
    return this.http.get(URL_SERVICIOS + 'ApiRest/Basicos/getMunicipiosComisionesByDep?id=' + id2);
  }

  getConcertacion(id): Observable<any> {
    const url = URL_SERVICIOS_CONCERTACION;
    return this.http.get(url + 'ApiRest/Concertacion/ObtenerDetalleProyectosConcertacion?anio=2019&tipoConsulta=0');
  }

  getConcertacionA(id): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(url + 'ApiRest/Basicos/getProyectosConcertacion?VigId=' + id);
  }

  getTipoCuentabancaria(id): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(url + 'ApiRest/Basicos/getProyectosConcertacion?VigId=' + id);
  }

}

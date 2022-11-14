import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Actividades, AsistenciaActividad } from '../../models/actividades.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(public http: HttpClient) {


   }

  

   consultaAsistentePorCedula(id): Observable<any> {
    const url = URL_SERVICIOS + 'ApiRest/Actividades/consultaAsistentesPorCedula?id=' + id;
    return this.http.get(url);
  }

   getAllActividades(id) {
    const url = URL_SERVICIOS + 'ApiRest/Actividades/GetAllActividades?id=' + id;
    return this.http.get(url);
  }

  getAsistenciaActividadByAsistenciaActividadId(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Actividades/getAsistenciaActividadByAsistenciaActividadId?id=' + id);
  }

  getAllAsistenciaActividades(id) {
    const url = URL_SERVICIOS + 'ApiRest/Actividades/getAllAsistenciaActividades?id=' + id;
    return this.http.get(url);
  }


  getAllProcesosServices(id) {
    const url = URL_SERVICIOS + 'ApiRest/Actividades/getAllAsistenciaActividades?id=' + id;
    return this.http.get(url);

   


  }


  deleteAsistenciaActividad(id, idAct): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Actividades/deleteAsistenciaActividad?id=' + id + '&idAct=' + idAct , headers);
  }

  deleteActividad(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Actividades/deleteActividad?id=' + id, headers);
  }

  addActividad(actividades: Actividades) {
    const json = JSON.stringify(actividades);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Actividades/addActividad';
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



  getActividadByActividadId(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Actividades/getActividadByActividadId?id=' + id);
  }


  getUsuariosInternos() {
    const url = URL_SERVICIOS + 'ApiRest/Actividades/getUsuariosInternos';
    return this.http.get(url);
  }

  addAsistenciaActividad(asistenciaActividad: AsistenciaActividad) {
    const json = JSON.stringify(asistenciaActividad);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Actividades/addAsistenciaActividad';
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

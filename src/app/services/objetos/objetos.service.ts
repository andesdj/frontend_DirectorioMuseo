import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AsistenciaActividad } from '../../models/Actividades.model';


@Injectable({
  providedIn: 'root'
})
export class ObjetosService {

  respuesta = false;
  constructor(public http: HttpClient) { }


  downloadMediosExperienciaById(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Objetos/GetMedioExperiencia?MedioId=' + id,
      { headers: new HttpHeaders().append('Content-Type', 'application/json'), responseType: 'blob', observe: 'body' });
  }

  consultaAsistentesPorAsistenciaActividadId(id): Observable<any> {
    const url = URL_SERVICIOS + 'ApiRest/Objetos/consultaAsistentesPorAsistenciaActividadId?id=' + id;
    return this.http.get(url);
  }


  addAsistenciaActividad(asistenciaActividad: AsistenciaActividad) {
    const json = JSON.stringify(asistenciaActividad);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Objetos/addAsistenciaActividad';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          if (resp.OperacionExitosa) {
            Swal.fire('Información Almacenada', 'Está operación fue ejecutada con éxito', 'success');
          } else {
            Swal.fire('Error al grabar información', 'Está operación se ejecutó con error', 'error');
            console.log(resp.Mensaje);
            
          }
          this.respuesta = resp.OperacionExitosa;
          return resp.OperacionExitosa;
        }));
  }

  

  ActualizarObjeto(asistenciaActividad: AsistenciaActividad) {
    const json = JSON.stringify(asistenciaActividad);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Objetos/ActualizarObjeto';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          if (resp.OperacionExitosa) {
            Swal.fire('Información Almacenada', 'Está operación fue ejecutada con éxito', 'success');
          } else {
            Swal.fire('Error al grabar información', 'Está operación se ejecutó con error', 'error');
            console.log(resp.Mensaje);
            
          }
          this.respuesta = resp.OperacionExitosa;
          return resp.OperacionExitosa;
        }));
  }

  actualizarEstadoObjeto(asistenciaActividad: AsistenciaActividad) {
    const json = JSON.stringify(asistenciaActividad);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Objetos/ActualizarEstadoObjeto';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          if (resp.OperacionExitosa) {
            Swal.fire('Información Almacenada', 'Está operación fue ejecutada con éxito', 'success');
          } else {
            Swal.fire('Error al grabar información', 'Está operación se ejecutó con error', 'error');
            console.log(resp.Mensaje);
            
          }
          this.respuesta = resp.OperacionExitosa;
          return resp.OperacionExitosa;
        }));
  }

  getAllObjetos() {
    const url = URL_SERVICIOS + 'ApiRest/Objetos/getAllObjetos';
    return this.http.get(url);
  }

  
}

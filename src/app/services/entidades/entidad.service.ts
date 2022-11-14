import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Agente, AgenteExperiencia } from '../../models/agente.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Entidad, EntidadExperiencia } from 'src/app/models/entidad.model';
import { Salas, Proyectos, Funciones, Cronogramas, Presupuestos, Documentos } from '../../models/entidad.model';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  public EntidadId = 0;

  constructor(public http: HttpClient) { }

//#region Entidad

  cargarEntidades() {
    const url = URL_SERVICIOS + 'ApiRest/Entidad/GetAllEntidades';
    return this.http.get(url);
  }

  cambiarEstadoEntidad(entidad: Entidad) {
    const json = JSON.stringify(entidad);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Entidad/cambiarEstadoEntidad';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          Swal.fire('Información Alamacenada  Exitosamente', resp.Mensaje, 'success');
          this.EntidadId = resp.EjecucionProcesoId;
        }));
  }


  crearEntidad(entidad: Entidad) {
    const json = JSON.stringify(entidad);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/entidad/addEntidad';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          Swal.fire('Información Guardada Exitosamente', resp.Mensaje, 'success');
          return resp.usuario;
        }));
  }

  getEntidadById(id): Observable<any> {
    // debugger;
    return this.http.get(URL_SERVICIOS + 'ApiRest/Entidad/getEntidadByEntidadId?EntidadId=' + id);
  }

  deleteEntidad(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/entidad/deleteEntidad?EntidadId=' + id, headers);
  }

  //#endregion

//#region Experiencia
  getAgenteExperienciaByAgenteId(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/entidad/getEntidadExperienciaByExperienciaId?id=' + id);
  }

  cargarAgentesExperiencia(id) {
    const url = URL_SERVICIOS + 'ApiRest/entidad/getAllEntidadesExperiencia?id=' + id;
    return this.http.get(url);
  }

  crearAgenteExperiencia(agente: EntidadExperiencia) {
    const json = JSON.stringify(agente);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/entidad/addEntidadExperiencia';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          Swal.fire('Información Almacenada', resp.EjecucionProcesoId, 'success');
          return resp.EjecucionProcesoId;
        }));
  }

  deleteEntidadExperiencia(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Entidad/deleteEntidadExperiencia?id=' + id, headers);
  }

  downloadMediosExperienciaById(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Entidad/GetMedioExperiencia?MedioId=' + id,
      { headers: new HttpHeaders().append('Content-Type', 'application/json'), responseType: 'blob', observe: 'body' });
  }
  //#endregion

//#region Salas
  crearSala(sala: Salas) {
    const json = JSON.stringify(sala);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Salas/addEntidadSala';
    return this.http.post(url, params, { headers: headers })
      .pipe(
        map((resp: any) => {
          Swal.fire('Información Almacenada', 'success');
          return resp.EjecucionProcesoId;
        }));
  }

  getSalasByEntidad(EntidadId: number) {

    return this.http.get(URL_SERVICIOS + 'ApiRest/Salas/getSalaByEntidadId?EntidadId=' + EntidadId);
  }

  getSalaBysalaId(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Salas/getSalaBySalaId?SalaId=' + id);
  }

  deleteSala(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(URL_SERVICIOS + 'ApiRest/Salas/deleteSala?salaId=' + id, headers);
  }

//#endregion

//#region Proyectos

salvarProyecto(salaProyecto: Proyectos) {
  const json = JSON.stringify(salaProyecto);
  const params = json;
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const url = URL_SERVICIOS + 'ApiRest/Salas/addSalaProyecto';
  return this.http.post(url, params, { headers: headers })
    .pipe(
      map((resp: any) => {
        if (resp.OperacionExitosa) {
          Swal.fire('Información Almacenada', 'Está operación fue ejecutada con éxito', 'success');
        } else {
          Swal.fire('Error al grabar información', 'Está operación se ejecutó con error', 'error');
        }
        return resp.EjecucionProcesoId;
      }));
}

getProyectoBySalaId(id): Observable<any> {
  return this.http.get(URL_SERVICIOS + 'ApiRest/Salas/getAllSalaProyecto?SalaId=' + id);
}

deleteProyecto(id): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'text/plain');
  return this.http.post(URL_SERVICIOS + 'ApiRest/Salas/deleteSalaProyecto?ProyectoId=' + id, headers);
}

getProyectoByProyectoId(id): Observable<any> {
  return this.http.get(URL_SERVICIOS + 'ApiRest/Salas/getSalaProyectoBySalaProyectoId?SalaProyectoId=' + id);
}

cambiarEstadoProyecto(proyecto: Proyectos) {
  const json = JSON.stringify(proyecto);
  const params = json;
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const url = URL_SERVICIOS + 'ApiRest/Salas/cambiarEstadoProyecto';
  return this.http.post(url, params, { headers: headers })
    .pipe(
      map((resp: any) => {
        Swal.fire('Información Alamacenada  Exitosamente', resp.Mensaje, 'success');
        //this.ProyectoId = resp.EjecucionProcesoId;
      }));
}

//#endregion

//#region Funciones
salvarFuncion(salaFuncion: Funciones) {
  const json = JSON.stringify(salaFuncion);
  const params = json;
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const url = URL_SERVICIOS + 'ApiRest/Salas/addSalaFuncion';
  return this.http.post(url, params, { headers: headers })
    .pipe(
      map((resp: any) => {
        if (resp.OperacionExitosa) {
          Swal.fire('Información Almacenada', 'Está operación fue ejecutada con éxito', 'success');
        } else {
          Swal.fire('Error al grabar información', 'Está operación se ejecutó con error', 'error');
        }
        return resp.EjecucionProcesoId;
      }));
}

getFuncionBySalaId(id): Observable<any> {
  return this.http.get(URL_SERVICIOS + 'ApiRest/Salas/getAllSalaFuncion?SalaId=' + id);
}

deleteFuncion(id): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'text/plain');
  return this.http.post(URL_SERVICIOS + 'ApiRest/Salas/deleteSalaFuncion?FuncionId=' + id, headers);
}

getFuncionByFuncionId(id): Observable<any> {
  return this.http.get(URL_SERVICIOS + 'ApiRest/Salas/getSalaFuncionBySalaFuncionId?SalaFuncionId=' + id);
}

//#endregion

// #region Función de proyectos
salvarProyectoFuncion(salaFuncion: Funciones) {
  const json = JSON.stringify(salaFuncion);
  const params = json;
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const url = URL_SERVICIOS + 'ApiRest/Salas/addSalaProyectoFuncion';
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

getProyectoFuncionByProyectoId(id): Observable<any> {
  return this.http.get(URL_SERVICIOS + 'ApiRest/Salas/getAllSalaProyectoFuncion?ProyectoId=' + id);
}

deleteProyectoFuncion(id): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'text/plain');
  return this.http.post(URL_SERVICIOS + 'ApiRest/Salas/deleteSalaProyectoFuncion?ProyectoFuncionId=' + id, headers);
}

getProyectoFuncionByProyectoFuncionId(id): Observable<any> {
  return this.http.get(URL_SERVICIOS + 'ApiRest/Salas/getSalaProyectoFuncionBySalaProyectoFunciónId?_proyectofuncionId=' + id);
}




//#endregion

// #region Cronograma de proyectos
salvarCronograma(ProyectoCronograma: Cronogramas) {
  const json = JSON.stringify(ProyectoCronograma);
  const params = json;
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const url = URL_SERVICIOS + 'ApiRest/Salas/addProyectoCronograma';
  return this.http.post(url, params, { headers: headers })
    .pipe(
      map((resp: any) => {
        if (resp.OperacionExitosa) {
          Swal.fire('Información Almacenada', 'Está operación fue ejecutada con éxito', 'success');
        } else {
          Swal.fire('Error al grabar información', 'Está operación se ejecutó con error', 'error');
        }
        return resp.EjecucionProcesoId;
      }));
}

getAllProyectoCronograma(ProyectoId: number): Observable<any> {
  return this.http.get(URL_SERVICIOS + 'ApiRest/Salas/getAllProyectoCronograma?ProyectoId=' + ProyectoId);
}

deleteProyectoCronograma(ProyectoCronogramaId): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'text/plain');
  return this.http.post(URL_SERVICIOS + 'ApiRest/Salas/deleteProyectoCronograma?_proyectoCronogramaId=' + ProyectoCronogramaId, headers);
}

getProyectoCronogramaByProyectoCronogramaId(ProyectoCronogramaId): Observable<any> {
  return this.http.get(
    URL_SERVICIOS + 'ApiRest/Salas/getProyectoCronogramaByProyectoCronogramaId?_proyectoCronogramaId=' + ProyectoCronogramaId);
}
//#endregion


// #region Presupuesto de proyectos
salvarPresupuesto(ProyectoPresupuesto: Presupuestos) {
  const json = JSON.stringify(ProyectoPresupuesto);
  const params = json;
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const url = URL_SERVICIOS + 'ApiRest/Salas/addProyectoPresupuesto';
  return this.http.post(url, params, { headers: headers })
    .pipe(
      map((resp: any) => {
        if (resp.OperacionExitosa) {
          Swal.fire('Información Almacenada', 'Está operación fue ejecutada con éxito', 'success');
        } else {
          Swal.fire('Error al grabar información', 'Está operación se ejecutó con error', 'error');
        }
        return resp.EjecucionProcesoId;
      }));
}

getAllProyectoPresupuesto(ProyectoId: number): Observable<any> {
  return this.http.get(URL_SERVICIOS + 'ApiRest/Salas/getAllProyectoPresupuesto?ProyectoId=' + ProyectoId);
}

deleteProyectoPresupuesto(ProyectoPresupuestoId): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'text/plain');
  return this.http.post(URL_SERVICIOS + 'ApiRest/Salas/deleteProyectoPresupuesto?_proyectoPresupuestoId=' + ProyectoPresupuestoId, headers);
}

getProyectoPresupuestoByProyectoPresupuestoId(ProyectoPresupuestoId): Observable<any> {
  return this.http.get(
    URL_SERVICIOS + 'AApiRest/Salas/getProyectoPresupuestoByProyectoPresupuestoId?_proyectoPresupuestoId=' + ProyectoPresupuestoId);
}
//#endregion


//#region Proyecto documento

salvarDocumento(ProyectoDocumento: Documentos) {
  const json = JSON.stringify(ProyectoDocumento);
  const params = json;
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const url = URL_SERVICIOS + 'ApiRest/Salas/addProyectoDocumentos';
  return this.http.post(url, params, { headers: headers })
    .pipe(
      map((resp: any) => {
        if (resp.OperacionExitosa) {
          Swal.fire('Información Almacenada', 'Está operación fue ejecutada con éxito', 'success');
        } else {
          Swal.fire('Error al grabar información', 'Está operación se ejecutó con error', 'error');
        }
        return resp.EjecucionProcesoId;
      }));
}

getAllProyectoDocumento(ProyectoId: number): Observable<any> {
  return this.http.get(URL_SERVICIOS + 'ApiRest/Salas/getAllProyectoDocumentos?ProyectoId=' + ProyectoId);
}

deleteProyectoDocuemnto(ProyectoDocumentoId): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'text/plain');
  return this.http.post(URL_SERVICIOS + 'ApiRest/Salas/deleteProyectoDcoumento?_proyectoDocumentosId=' + ProyectoDocumentoId, headers);
}

getProyectoDocumentoByProyectoDocumentoId(ProyectoDocumentoId): Observable<any> {
  return this.http.get(
    URL_SERVICIOS + 'ApiRest/Salas/getProyectoDocumentoByProyectoDocumentoId?_proyectoDocumentosId=' + ProyectoDocumentoId);
}

downloadMediosDocumentoById(id): Observable<any> {
  return this.http.get(URL_SERVICIOS + 'ApiRest/Salas/GetMedioDocumento?proyectoDocumentosId=' + id,
    { headers: new HttpHeaders().append('Content-Type', 'application/json'), responseType: 'blob', observe: 'body' });
}



//#endregion





}

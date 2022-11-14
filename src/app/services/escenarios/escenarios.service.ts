import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Escenario } from 'src/app/models/escenario.model';

@Injectable({
  providedIn: 'root'
})
export class EscenariosService {

  constructor(public http: HttpClient) { }

  cargarEscenarios() {
    const url = URL_SERVICIOS + 'ApiRest/Escenarios/GetAllEscenarios';
    return this.http.get(url);
  }

  getEscenarioByEscenarioId(id): Observable<any> {
    return this.http.get(URL_SERVICIOS + 'ApiRest/Escenarios/getEscenarioByEscenarioId?id=' + id);
}

crearEscenario( escenario: Escenario ) {
  const json = JSON.stringify(escenario);
      const params = json;
      const headers = new HttpHeaders().set('Content-Type', 'application/json', );
      const url = URL_SERVICIOS + 'ApiRest/Escenarios/addEscenario';
   return this.http.post(url, params, { headers: headers})
   .pipe(
   map( (resp: any) => {
    Swal.fire('Información Almacenada', resp.Mensaje, 'success' );
    return resp.usuario;
   }));
}

deleteEscenario(id): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'text/plain');
  return this.http.post(URL_SERVICIOS + 'ApiRest/Escenarios/deleteEscenario?EscenarioId=' + id, headers);
}

}

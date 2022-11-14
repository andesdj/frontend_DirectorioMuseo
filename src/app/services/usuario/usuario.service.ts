import { Injectable } from "@angular/core";
import { Usuario, RecuperarClave } from "src/app/models/usuario.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { URL_SERVICIOS } from "../../config/config";
import Swal from "sweetalert2";

import { map } from "rxjs/operators";
import { User } from "src/app/models/user.model";
import { Session } from "src/app/models/session.model";
import { Observable } from "rxjs";
import { KeycloakService } from "keycloak-angular";
import { SidebarService } from "../service.index";

@Injectable()
export class UsuarioService {
  currentUser: string;
  private currentSession: Session = null;
  private currentSession2: Session;

  menu: any[] = [];
  fichaGeneral: FichaGeneral[];
  // tslint:disable-next-line:max-line-length
  constructor(
    public http: HttpClient,
    public router: Router,
    private keycloakService: KeycloakService,
    public _sidebar: SidebarService
  ) {
    this.currentSession2 = new Session();
    // ---- keycloak ----//
    //this.getCorreo();
    // ---- keycloak ----//

    this.cargarStorage();
  }

  activarUsuario(c, id) {
    const url =
      URL_SERVICIOS + "ApiRest/Basicos/activarUsuario?id=" + id + "&c=" + c;
    return this.http.get(url);
  }

  getCorreo(): string {
    let email = "";
    this.keycloakService.loadUserProfile().then((profile) => {
      email = profile.email;
      localStorage.setItem("email", email);
    });
    console.log("Salida de correo " + email);
    return email;
  }

  ingresar() {
    if (localStorage.getItem("email")) {
    }
  }

  public async getUserCorreo(correo) {
    let us: any;
    us = await this.getUsuarioBycorreo(correo);
    if (us != null) {
      console.log(us); // this.username = this.userDetails.firstName +" " + this.userDetails.lastName;
    }
  }

  getUsuarioBycorreo2(correo: string) {
    const url = URL_SERVICIOS;
    const promise = new Promise((resolve) => {
      const apiURL =
        url + "ApiRest/Basicos/consultaPerfilPorCorreo?correo=" + correo;
      this.http
        .get(apiURL)
        .toPromise()
        .then((res) => {
          this.correctLogin(res);
          resolve();
        });
    });
    return promise;
  }

  async getCorreo3(): Promise<User> {
    let us: any;
    us = this.getUsuarioBycorreo("aromeos@mincultura.gov.co")
      .toPromise()
      .then((resp) => resp as User);

    return us;
  }

  getCurrentToken(): string {
    const _session = this.getCurrentSession();
    return _session && _session.access_token ? _session.access_token : null;
  }

  private correctLogin(data: any) {
    this.currentSession2.user = data;
    this.setCurrentSession(this.currentSession2);
  }

  getCurrentUser(): User {
    const session: Session = this.getCurrentSession();
    return session && session.user ? session.user : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  estalogueado() {
    return this.currentUser.length > 5 ? true : false;
  }

  logout() {
    //this.user = null;
    this.currentUser = "";
    localStorage.removeItem("currentUser");
    localStorage.removeItem("storage");
    localStorage.removeItem("email");
    this.router.navigate(["/login"]);
  }

  loginGoogle(token: string, u3Email: String) {
    //debugger;
    //let url = URL_SERVICIOS + '/login/google';
    const params =
      "grant_type=password&username=" + u3Email + "&password=" + token;
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    return this.http.post(URL_SERVICIOS + "token", params, {
      headers: headers,
    });
    // .map( (resp: any) => {
    //   this.guardarStorage( resp.id, resp.token, resp.usuario );
    //   return true;
    // });
  }

  getUsuarioBycorreo(correo): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(
      url + "ApiRest/Basicos/consultaPerfilPorCorreo?correo=" + correo
    );
    // .pipe(
    //   map( (resp: any) => {
    //    Swal.fire('Actualiza el localstorage', resp.Mensaje, 'success' );
    //    this.correctLogin(resp);
    //    return resp;
    //   }));
  }

  getUsuarioBycorreo9(correo) {
    const url = URL_SERVICIOS;
    const promise = this.http
      .get(url + "ApiRest/Basicos/consultaPerfilPorCorreo?correo=" + correo)
      .toPromise();
    console.log(promise);
    promise
      .then((data) => {
        this.correctLogin(data);
        // tslint:disable-next-line:no-unused-expression
      })
      .catch((error) => {
        JSON.stringify(error);
      });
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem("email", usuario.PersonaEmail);
    } else {
      localStorage.removeItem("email");
    }
    const params =
      "grant_type=password&username=" +
      usuario.PersonaEmail +
      "&password=" +
      usuario.CuentaUsuarioClave;
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    //  headers.set('Access-Control-Allow-Origin', '*');
    //    headers.set('Access-Control-Allow-Methods', '*');
    //    headers.set('Access-Control-Allow-Headers', '*');
    return this.http.post(URL_SERVICIOS + "token", params, {
      headers: headers,
    });
    // .pipe(
    //   map( (resp: any) => {
    //     //debugger;
    //     swal('Usuario creado', resp.Mensaje, 'success' );
    //     console.log(resp);
    //    return resp.usuario;
    //   }));
  }

  recuperarContrasena(recuperarClave: RecuperarClave) {
    const json = JSON.stringify(recuperarClave);
    const params = json;
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const url = URL_SERVICIOS + "ApiRest/Basicos/forgot";
    return this.http.post(url, params, { headers: headers });
  }

  cargarStorage() {
    if (localStorage.getItem("currentUser")) {
      const sessionStr = localStorage.getItem("currentUser");
      this.currentUser = sessionStr;
      this.currentSession = <Session>JSON.parse(sessionStr);
    } else {
      this.currentUser = "";
    }
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    localStorage.setItem("currentUser", JSON.stringify(session));
    this.currentUser = this.currentSession.access_token;
  }

  cargarUsuarios() {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getUsuarios";
    return this.http.get(url);
  }

  cargarDependenciasComisiones() {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getDependenciasComisiones";
    return this.http.get(url);
  }

  getUsuarioByPersonaId(id): Observable<any> {
    const url = URL_SERVICIOS;
    return this.http.get(
      url + "ApiRest/Basicos/getUsuarioByPersonaId?id=" + id
    );
  }

  crearUsuario(usuario: Usuario) {
    const json = JSON.stringify(usuario);
    const params = json;
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const url = URL_SERVICIOS + "ApiRest/Basicos/addUsuario";
    return this.http.post(url, params, { headers: headers });
    //  .pipe(
    //  map( (resp: any) => {
    //    if (resp.OperacionExitosa) {
    //     Swal.fire('Usuario creado', resp.Mensaje, 'success' );
    //    } else {
    //     Swal.fire('Error', resp.Mensaje, 'error' );
    //    }
    //   return resp.usuario;
    //  }));
  }

  // deleteAgente(id): Observable<any> {
  //   const headers = new HttpHeaders().set('Content-Type', 'text/plain');
  //   return this.http.post(URL_SERVICIOS + 'ApiRest/Agente/deleteAgente?agenteId=' + id, headers);
  // }

  actualizarUsuario(usuario: Usuario) {
    const json = JSON.stringify(usuario);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + 'ApiRest/Basicos/setUsuario';
    return this.http.post(url, params, { headers: headers }).pipe(
      map((resp: any) => {
        Swal.fire('Usuario Actualizado', resp.Mensaje, 'success');
        return resp.usuario;
      })
    );
  }

  cargarMenuPorPerfilId(id) {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getMenuPerfilId?id=" + id;
    return this.http.get(url);
  }

  cargarFormacion() {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getFormacion";
    return this.http.get(url);
  }

  cargarDotacion() {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getDotacion";
    return this.http.get(url);
  }

  cargarDotacionMapa() {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getDotacion";
    return this.http.get(url);
  }

  cargarProyectosEspeciales() {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getProyectosEspeciales";
    return this.http.get(url);
  }

  cargarVisitasAsesorias() {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getVisitasAsesorias";
    return this.http.get(url);
  }

  cargarProcesosFormacion() {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getProcesosFormacion";
    return this.http.get(url);
  }

  cargarFichaGeneral() {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getFichaGeneral";
    return this.http.get(url);
  }

  cargarFichaGeneralGrafico() {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getFichaGeneralGrafico";
    return this.http.get(url);
  }

  cargarOfertaGraficoMunicipios() {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getOfertaGraficoMunicipios";
    return this.http.get(url);
  }

  cargarOfertaGraficoBeneficiarios() {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getGraficoOfertaBeneficiarios";
    return this.http.get(url);
  }

  cargarOfertaGraficoInversion() {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getGraficoOfertaInversion";
    return this.http.get(url);
  }

  cargarFichaGeneralDatos() {
    const url = URL_SERVICIOS + "ApiRest/Basicos/getFichaGeneral";
    return this.http.get(url).subscribe((resp: any) => {
      this.fichaGeneral = resp.Lista;
    });
  }

  cargarComisiones(idArea, idDep, idMun) {
    const url =
      URL_SERVICIOS +
      "ApiRest/Basicos/getComisiones?idArea=" +
      idArea +
      "&idDep=" +
      idDep +
      "&idMun=" +
      idMun;
    return this.http.get(url);
  }

  cargarAgentesGraficoPorUsuario(usuId) {
    const url =
      URL_SERVICIOS +
      "ApiRest/Basicos/getAgentesGraficoPorUsuId?usuId=" +
      usuId;
    return this.http.get(url);
  }

  cargarOferta(intAreaId, intProgramaId, AnoId, idDireccion) {
    // tslint:disable-next-line:max-line-length
    const url =
      URL_SERVICIOS +
      "ApiRest/Basicos/getOfertaArtes?intAreaId=" +
      intAreaId +
      "&intProgramaId=" +
      intProgramaId +
      "&AnoId=" +
      AnoId +
      "&idDireccion=" +
      idDireccion;
    return this.http.get(url);
  }

  cargarOfertaMapa(intAreaId, intProgramaId) {
    const url = URL_SERVICIOS;
    let appointmentsData: any;
    const promise = new Promise((resolve) => {
      const apiURL =
        URL_SERVICIOS +
        "ApiRest/Basicos/getOfertaArtes?intAreaId=" +
        intAreaId +
        "&intProgramaId=" +
        intProgramaId;
      this.http
        .get(apiURL)
        .toPromise()
        .then((res) => {
          resolve();
          appointmentsData = res;
          return appointmentsData;
        });
    });
    return promise;
  }

  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();

      // configuracin de la peticion ajax
      let xhr = new XMLHttpRequest();
      formData.append("imagen", archivo, archivo.name);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("imagen subida");

            // si se sube correctamente llamo a  resolve
            resolve(xhr.response);
          } else {
            console.log("fallo la subida");
            reject(xhr.response);
          }
        }
      };

      let url = URL_SERVICIOS + "UPLOAD" + tipo + id;

      xhr.open("PUT", url, true);
      xhr.send(formData);
    });

    // notifica a las otras pantallas que esto ya termino
  }
}

export class FichaGeneral {
  Id: number;
  DepartamentoNombre: string;
  MunicipioNombre: string;
  Ficha: string;
  Inversion: number;
  ANO: string;
  Area: string;
}

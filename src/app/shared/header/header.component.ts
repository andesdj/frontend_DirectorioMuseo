import { Component, OnInit } from '@angular/core';
import { UsuarioService, SidebarService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';
import { Session } from 'src/app/models/session.model';
import { KeycloakService } from 'keycloak-angular';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: User;
  usuarioNombre: string;
  email: string;
  roles: any;
  role: string;
  currentSession: Session;

  // tslint:disable-next-line:max-line-length
  constructor(public _sidebar: SidebarService, public http: HttpClient, public _usuarioService: UsuarioService,   private keycloakService: KeycloakService) {
    this.usuario = new User();
    //this.currentSession = new Session();
    //this.getUsuarioBycorreo2('aromeros@mincultura.gov.co');
  }

  salir() {


    this._usuarioService.logout();
     // ---- keycloak ----//
    //this.keycloakService.logout();
    // ---- keycloak ----//
    localStorage.removeItem('currentUser');
    localStorage.removeItem('storage');
    localStorage.removeItem('email');
  }

  getUsuarioBycorreo2(correo: string) {
    const url = URL_SERVICIOS;
    const promise = new Promise((resolve, reject) => {
      const apiURL = url + 'ApiRest/Basicos/consultaPerfilPorCorreo?correo=' + correo;
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
            // console.log(res.json());
            debugger;
            //this.correctLogin(res);

            this.currentSession =  this._usuarioService.getCurrentSession();
            if ( this.currentSession != null) {
               this._sidebar.menu = this.currentSession.user.Menu;
           }
            resolve();
          }
        );
    });
    return promise;
  }

  ngOnInit() {

     const user: any =  this._usuarioService.getCurrentUser();
     this.usuario = JSON.parse(user);
     this.usuarioNombre = this.usuario.USU_NOMBRE;
     this.email = this.usuario.USU_CORREO_ELECTRONICO;

     this.roles = this.usuario.Perfiles;
     if (this.roles.length > 0) {
       this.role = this.roles[0].PER_NOMBRE;
     }





    //if ( this.keycloakService.isUserInRole('Admin')) {
      //console.log('Tiene El Rol Admin');
      //this.keycloakService.loadUserProfile().then(profile => {
        //this.usuario.USU_NOMBRE = profile.firstName + ' ' + profile.lastName;
        //console.log(profile.username);
        //console.log(profile['attributes'].roles); //gives you array of all attributes of user, extract what you need
        //console.log(profile['attributes'].role);
     // });


    }
    //let userDetails =  this.keycloakService.getUserRoles(true);
    //console.log(userDetails);

    //let userDetails =  this.keycloakService.rol(true);




    //const user: any =  this._usuarioService.getCurrentUser();
    //this.usuario = JSON.parse(user);

    //this.usuarioNombre = this.usuario.USU_NOMBRE;
    //this.email = this.usuario.USU_CORREO_ELECTRONICO;
    // this.roles = this.usuario.Perfiles;
    // if (this.roles.length > 0) {
    //   this.role = this.roles[0].PER_NOMBRE;
    // }
  //}

  //public async getUserName(){
    // this.userDetails = await this.keycloakService.loadUserProfile();
    // if(this.userDetails != null){
    //     this.username = this.userDetails.firstName +" " + this.userDetails.lastName;
    // }
//}

}

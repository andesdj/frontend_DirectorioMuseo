import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { User, Menu } from 'src/app/models/user.model';
import { KeycloakService } from 'keycloak-angular';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { KeycloakProfile } from 'keycloak-js';
import { Session } from '../../models/session.model';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: User;
  correo: string;
  usuarioNombre: string;
  email: string;
  roles: any;
  role: string;
  esError: boolean;
  userDetails: KeycloakProfile;
  _menu:[];
  nuevoMenu: Menu;
  _menu3: any[] = [];
  currentSession: Session;
  
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private route: ActivatedRoute , public http: HttpClient, public _sidebar: SidebarService, public _usuarioService: UsuarioService,   private keycloakService: KeycloakService) {
    
    // ---- keycloak ----//
  //  this.getCorreo();
  //  this.currentSession = new Session();
  //  this.usuario = new User();
  //  this._menu = [];
  //  this.nuevoMenu = new Menu();
   // ---- keycloak ----//
   }


  ngOnInit() {
    // ---- keycloak ----//
    //this.ingresar('aromeros@mincultura.gov.co', '');
    // ---- keycloak ----//
      const user: any =  this._usuarioService.getCurrentUser();
      this.usuario = JSON.parse(user);
      this.usuarioNombre = this.usuario.USU_NOMBRE;
      this.email = this.usuario.USU_CORREO_ELECTRONICO;
      this.roles = this.usuario.Perfiles;
      if (this.roles.length > 0) {
        this.role = this.roles[0].PER_NOMBRE;
        this._sidebar.menu = this.usuario.Menu;
      }

  }

  onReload(){

    this.router.navigate(['/dashboard'], {relativeTo: this.route});
    this.currentSession =  this._usuarioService.getCurrentSession();
   if(this.currentSession != null && this._sidebar.menu.length === 0){
      this._sidebar.menu = this.currentSession.user.Menu;
  }
   }


  getUsuarioBycorreo2(correo: string) {
    const url = URL_SERVICIOS;
    const promise = new Promise((resolve, reject) => {
      const apiURL = url + 'ApiRest/Basicos/consultaPerfilPorCorreo?correo=' + correo;
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success

            this.currentSession =  this._usuarioService.getCurrentSession();
            if(this.currentSession != null){
           } 
            resolve();
          }
        );
    });
    return promise;
  }

async getCorreo() {
  this.userDetails = await  this.keycloakService.loadUserProfile();
        if(this.userDetails != null) {
          this.correo = this.userDetails.email; //this.username = this.userDetails.firstName +" " + this.userDetails.lastName;
          console.log(this.correo);
        }
}


  ingresar(email: string, password: string ) { 

    // this.keycloakService.loadUserProfile().then(profile => {
    //   correo = profile.email;
    //  });

    if (localStorage.getItem('email')) {
      this.correo = localStorage.getItem('email');
    }

        this._usuarioService.getUsuarioBycorreo( this.correo )
                   .subscribe(
                     data => {
                       debugger;
                      this.esError = false;
                      //this.usuario = data;
                      this.correctLogin(data);
                      //this.usuario = data;
                      //this._menu3  = this.usuario.Menu;
                      // this.correctLogin(data);
                       const user: User =  this._usuarioService.getCurrentUser();
                       //this.usuario = JSON.parse(user);
                       
                      //   this.usuario = data;
                      //   this.usuarioNombre = this.usuario.USU_NOMBRE;
                      //   this.email = this.usuario.USU_CORREO_ELECTRONICO;
                    
                      //   this.roles = this.usuario.Perfiles;
                      //   if (this.roles.length > 0) {
                      //     this.role = this.roles[0].PER_NOMBRE;
                      //     // let menuint: any;
                      //     // menuint = this.usuario.Menu;
                      //     // console.log(menuint);
                      const stringMenu  = JSON.stringify(user.Menu);
                      this._sidebar.menu = JSON.parse(stringMenu);
                      //   }
                     },
                    error => {
                      this.esError = true;
                      if (this.esError) {
                        Swal.fire('Validación', 'Usuario o password invalidos', 'error' );
                      }
                    }
                     );
  }

  objectKeys (objeto: any) {
    const keys = Object.keys(objeto);
    console.log(keys); // echa un vistazo por consola para que veas lo que hace "Object.keys"
    return keys;
  }
  

  private correctLogin(data: any) {
    // tslint:disable-next-line:prefer-const
    this.currentSession.user = data;
    //const dato = <Session>JSON.parse(data);
    this._usuarioService.setCurrentSession(this.currentSession);
    //this._sidebar.menu = data.Menu;
  }

}




// import { PipeTransform, Pipe } from '@angular/core';
// @Pipe({ name: 'values' })
// export class ValuesPipe implements PipeTransform {
//   transform(value, args: string[]): any {
//     const values = []
//     // tslint:disable-next-line:forin
//     for (const key in value) {
//       values.push(value[key]);
//     }
//     return values;
//   }
// }
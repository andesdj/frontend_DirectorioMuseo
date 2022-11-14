import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { UsuarioService } from '../usuario/usuario.service';
 
@Injectable({
  providedIn: 'root'
})
export class CanAuthenticationGuard extends KeycloakAuthGuard implements CanActivate {
  userDetails: KeycloakProfile;
  correo: string;
  constructor(protected router: Router, protected keycloakAngular: KeycloakService, public _usuarioService: UsuarioService) {
    super(router, keycloakAngular);
    //this.correo = 'aromeros@mincultura.gov.co';
  }
 
  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    //this.getCorreo();
    //this.ingresar('', '');
    // debugger;
    return new Promise((resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login()
          .catch(e => console.error(e));
        return reject(false);
      }
      const requiredRoles: string[] = route.data.roles;
      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      } else {
        if (!this.roles || this.roles.length === 0) {
          resolve(false);
        }
        resolve(requiredRoles.every(role => this.roles.indexOf(role) > -1));
      }
    });
  }

  async getCorreo() {
    this.userDetails = await  this.keycloakAngular.loadUserProfile();
          if ( this.userDetails != null ) {
            const correo = this.userDetails.email; //this.username = this.userDetails.firstName +" " + this.userDetails.lastName;
            console.log(correo);
          }
  }

  ingresar(email: string, password: string ) {
    //debugger;
    // this.keycloakService.loadUserProfile().then(profile => {
    //   this.correo = profile.email;
    //  });

        this._usuarioService.getUsuarioBycorreo( this.correo )
                   .subscribe(
                     data => {
                       debugger;
                      //this.esError = false;
                      this.correctLogin(data);
                     },
                    error => {
                      //this.esError = true;
                      // if (this.esError) {
                      //   Swal.fire('Validación', 'Usuario o password invalidos', 'error' );
                      // }
                    }
                     );
  }

  private correctLogin(data: any) {
    this._usuarioService.setCurrentSession(data);
    //this._sidebar.menu = data.Menu;
  }
}
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario/usuario.service';
import { KeycloakService } from 'keycloak-angular';
import { SettingsService } from '../services/settings/settings.service';
import { SidebarService } from '../services/shared/sidebar.service';
import { KeycloakProfile } from 'keycloak-js';
import { Session } from '../models/session.model';
import { User } from '../models/user.model';
import Swal from 'sweetalert2';
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {
  usuario: User;
  correo: string;
  usuarioNombre: string;
  email: string;
  roles: any;
  role: string;
  esError: boolean;
  userDetails: KeycloakProfile;
  private currentSession: Session;

  // tslint:disable-next-line:max-line-length
  constructor(public _sidebar: SidebarService, public _ajustes: SettingsService, public _usuarioService: UsuarioService ,   private keycloakService: KeycloakService) { 
    this.currentSession = new Session();
  }

  ngOnInit() {
    
    init_plugins();
    //this.ingresar();
  }

  ingresar() { 

    this.keycloakService.loadUserProfile().then(profile => {
      debugger;
      this.correo = profile.email;
      localStorage.setItem('email', this.correo );
     });
    //if (localStorage.getItem('email')) {

        this._usuarioService.getUsuarioBycorreo(this.correo )
                   .subscribe(
                     data => {
                       debugger;
                      this.esError = false;
                      this.correctLogin(data);
                      
                      //const user: any =  this._usuarioService.getCurrentUser();
                       },
                    error => {
                      this.esError = true;
                      if (this.esError) {
                        Swal.fire('Validación', 'Usuario o password invalidos', 'error' );
                      }
                    }
                     );
    //}

  }
  private correctLogin(data: any) {
    // tslint:disable-next-line:prefer-const
    this.currentSession.user = data;
    //const dato = <Session>JSON.parse(data);
    this._usuarioService.setCurrentSession(this.currentSession);
    //this._sidebar.menu = data.Menu;
  }

}

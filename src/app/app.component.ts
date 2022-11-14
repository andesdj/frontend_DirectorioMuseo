import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { SettingsService, SidebarService, SharedService } from './services/service.index';
import { UsuarioService } from './services/usuario/usuario.service';
import { User } from './models/user.model';
import { KeycloakProfile } from 'keycloak-js';
import { Session } from './models/session.model';
import { KeycloakService } from 'keycloak-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SiArtes';

  usuario: User;
  correo: string;
  usuarioNombre: string;
  email: string;
  roles: any;
  role: string;
  esError: boolean;
  userDetails: KeycloakProfile;
  private currentSession: Session;

  constructor(public _ajustes: SettingsService, public _usuarioService: UsuarioService ,   private keycloakService: KeycloakService ) {
    //this.correo  = 'aromeros@mincultura.gov.co';
    //debugger;
    //this.correo = this._usuarioService.getCorreo();
    this.currentSession = new Session();
    
    //this.ingresar('', '');
  }

  ingresar(email: string, password: string ) { 

    // this.keycloakService.loadUserProfile().then(profile => {
    //   debugger;
    //   this.correo = profile.email;
    //  });

    
    

        this._usuarioService.getUsuarioBycorreo( localStorage.getItem('email') )
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
    

  }
  private correctLogin(data: any) {
    // tslint:disable-next-line:prefer-const
    this.currentSession.user = data;
    //const dato = <Session>JSON.parse(data);
    this._usuarioService.setCurrentSession(this.currentSession);
    //this._sidebar.menu = data.Menu;
  }

  getCorreo2(){
      this.keycloakService.loadUserProfile().then(profile => {
        this.usuario.USU_NOMBRE = profile.firstName + ' ' + profile.lastName;
        this.correo = profile.email;
        console.log(profile.username);
        console.log(profile['attributes'].roles); //gives you array of all attributes of user, extract what you need
        console.log(profile['attributes'].role);
     });
  }

  async getCorreo() {
    this.userDetails = await  this.keycloakService.loadUserProfile();
          if(this.userDetails != null) {
            this.correo = this.userDetails.email; //this.username = this.userDetails.firstName +" " + this.userDetails.lastName;
            console.log(this.correo);
          }
  }
}

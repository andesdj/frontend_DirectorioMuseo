import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Session } from 'src/app/models/session.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: User;
  usuarioNombre: string;
  email: string;
  roles: any;
  role: string;
  constructor(public _usuarioService: UsuarioService) {
    this.usuario = new User();
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
  }

  guardar(user: any) {
   console.log(user);
   debugger;
   this.usuario.USU_NOMBRE = user.nombre;
   this.usuario.USU_CORREO_ELECTRONICO = user.email;
  }

}

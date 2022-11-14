import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  usuario: User;
  usuarioNombre: string;
  email: string;
  roles: any;
  role: string;
   //menu = [];
  menu: any[] = [];
// menu = [
// {
//   titulo: 'Principal',
//   icono: 'mdi mdi-gauge',
//   submenu: [
//     { titulo: 'Dashboard', url: '/dashboard'},
//     { titulo: 'ProgressBar', url: '/progress'},
//     { titulo: 'Reportes', url: '/graficas1'},
//     { titulo: 'Agentes', url: '/promesas'},
//     { titulo: 'Entidades', url: '/rxjs'},
//   ]
// }
// ,
//     {
//       titulo: 'Herramientas',
//       icono: 'mdi mdi-folder-lock-open',
//       submenu: [
//         { titulo: 'Usuarios', url: '/usuarios' },
//         { titulo: 'Tablas-Tipo', url: '/tablas-tipo' },
//         { titulo: 'Tablas-Valores', url: '/tablas-valores' },
//         { titulo: 'Perfiles', url: '/perfiles' }
//       ]
//     }
// ];


  constructor() {
    //debugger;
    //this.menu = _usuarioServices.menu;
     //this.cargarMenu();
  }

  // cargarMenu() {
  //   const user: any =  this._usuarioServices.getCurrentUser();
  //   this.usuario = JSON.parse(user);
  //   this.usuarioNombre = this.usuario.USU_NOMBRE;
  //   this.email = this.usuario.USU_CORREO_ELECTRONICO;
  //   //debugger;
  //   this.roles = this.usuario.Perfiles;
  //   if (this.roles.length > 0) {
  //     this.role = this.roles[0].PER_NOMBRE;
  //     //this._sidebar.cargarMenu(this.roles[0].PER_ID);
  //     this._usuarioServices.cargarMenuPorPerfilId(this.roles[0].PER_ID)
  //             .subscribe(
  //               (resp: any) => {
  //                this.menu = resp.Lista;
  //               //  console.log('Sidebar.service');
  //               //  console.log(this.menu);
  //             });
  //   }

  // }
}

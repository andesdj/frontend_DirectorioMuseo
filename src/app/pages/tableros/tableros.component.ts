
import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-tableros',
  templateUrl: './tableros.component.html',
  styles: []
})
export class TablerosComponent implements OnInit {

  listaTableros = [];
  usuario: User;
  usuId: number;
  roles: any;
  oculto: boolean;

  constructor(public _seguridadService: SeguridadService, public _usuarioService: UsuarioService) {
    const user: any = this._usuarioService.getCurrentUser();
    this.usuario = JSON.parse(user);
    this.usuId = this.usuario.USU_ID;
    this.oculto = true;

    this.roles = this.usuario.Perfiles;
    if (this.roles.length > 0) {

      if ( this.roles[0].PER_ID === 1) {
        this.oculto = true;
      } else {
        this.oculto = false;
      }

    }

   }

  ngOnInit() {
    this.cargarTableros();
  }
  cargarTableros() {
    this._seguridadService.cargarTableros( )
              .subscribe(
                (resp: any) => {
                 this.listaTableros = resp.Lista;
                 console.log(resp.Mensaje);
              });
  }

  adicionarTablero(item): void {
  console.log('Usuario a guardar', item.data);
    this._seguridadService.crearTablero(item.data)
    .subscribe(
      resp => {
        this.cargarTableros();
        }
    );
  }
  actualizarTablero(item): void {
  this._seguridadService.actualizarTablero(item.data)
  .subscribe(
    resp => {
      this.cargarTableros();
      }
  );
  }

  eliminarTablero(item): void {
    this._seguridadService.deleteTablero(item.key)
  .subscribe(
    resp => {
      this.cargarTableros();
      }
  );
  }


}



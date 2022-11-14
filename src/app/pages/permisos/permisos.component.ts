import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/services/service.index';
import { IOption } from 'ng-select';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styles: []
})
export class PermisosComponent implements OnInit {
  listaPermisos = [];
  perfilesLista: Array<IOption>;
  opcionesLista: Array<IOption>;

  constructor(public _seguridadService: SeguridadService) {
    this.cargarPerfiles();
    this.cargarOpciones();
   }

  ngOnInit() {
    this.cargarPermisos();
    // tslint:disable-next-line:max-line-length
  }

  cargarPerfiles() {
    this._seguridadService.cargarPerfiles( )
              .subscribe(
                (resp: any) => {
                 this.perfilesLista = resp.Lista;
              });
  }

  eliminarPerfil(item): void {
    this._seguridadService.deletePerfil(item.key)
  .subscribe(
    resp => {
      this.cargarPermisos();
      }
  );
  }

  cargarOpciones() {
    this._seguridadService.cargarOpciones( )
              .subscribe(
                (resp: any) => {
                 this.opcionesLista = resp.Lista;
              });
  }

  cargarPermisos() {
    this._seguridadService.cargarPermisos( )
              .subscribe(
                (resp: any) => {
                 this.listaPermisos = resp.Lista;
              });

  }

  adicionarPermiso(item): void {
    this._seguridadService.crearPermiso(item.data)
    .subscribe(
      resp => {
        this.cargarPermisos();
        }
    );
}

actualizarPermiso(item): void {
  this._seguridadService.actualizarPermiso(item.data)
  .subscribe(
    resp => {
      this.cargarPermisos();
      }
  );
}

eliminarPermisos(item): void {
  this._seguridadService.deletePermisos(item.key)
.subscribe(
  resp => {
    this.cargarPermisos();
    }
);
}

}

import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/services/service.index';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {
  listaPerfiles = [];
  constructor(public _seguridadService: SeguridadService) { }

  ngOnInit() {
    this.cargarPerfiles();
  }

  cargarPerfiles() {
    this._seguridadService.cargarPerfiles( )
              .subscribe(
                (resp: any) => {
                 this.listaPerfiles = resp.Lista;
                 console.log(resp.Mensaje);
              });

  }


  adicionarPerfil(item): void {
    this._seguridadService.crearPerfil(item.data)
    .subscribe(
      resp => {
        this.cargarPerfiles();
        }
    );
}

actualizarPerfil(item): void {
  this._seguridadService.actualizarPerfil(item.data)
  .subscribe(
    resp => {
      this.cargarPerfiles();
      }
  );
}

  eliminarPerfil(item): void {
    this._seguridadService.deletePerfil(item.key)
  .subscribe(
    resp => {
      this.cargarPerfiles();
      }
  );
  }

}

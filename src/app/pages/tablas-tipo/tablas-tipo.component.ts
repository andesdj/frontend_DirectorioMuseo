import { Component, OnInit } from '@angular/core';
import { UsuarioService, TipoReferenciaService } from '../../services/service.index';
import { TipoReferencia } from '../../models/TipoReferencia.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDateBoxModule } from 'devextreme-angular';


@Component({
  selector: 'app-tablas-tipo',
  templateUrl: './tablas-tipo.component.html',
  styleUrls: ['./tablas-tipo.component.css']
})
export class TablasTipoComponent implements OnInit {


  listaTipoReferencia = [];
  listaTpub = [];
  displayListTiposReferencia: boolean;
  displayCrearTipoReferencia: boolean;
  tipoReferencia: TipoReferencia;
  operacion = 'C';


  constructor(public _usuarioService: UsuarioService, public tipoReferenciaService: TipoReferenciaService) {
    this.displayListTiposReferencia = true;
    this.displayCrearTipoReferencia = false;
    this.tipoReferencia = new TipoReferencia( null, '', '', '', null, '', '', null, '', null,  null, '');
    this.listaTpub = [
      { Id: 'A', Nombre: 'Activo' },
      { Id: 'I', Nombre: 'Inactivo' },
  ];
   }

  ngOnInit() {
    this.cargarTiposReferencia();
  }
  cargarTiposReferencia() {
    this.tipoReferenciaService.cargarTiposReferencia( )
              .subscribe(
                (resp: any) => {
                 this.listaTipoReferencia = resp.Lista;
              });

  }

  showPanel(sw, id) {
    if (sw === 'C') {// Crear
      this.displayListTiposReferencia = false;
        this.displayCrearTipoReferencia = true;
      this.inicializarModelo();
  } else if (sw === 'U') { // Actualizar Usuario
        this.displayListTiposReferencia = false;
        this.displayCrearTipoReferencia = true;
        this.cargarTipoReferenciaById(id);
        this.operacion = 'U';
      } else if (sw === 'V') { // Volver al listado de Tipos de Referencia
        this.displayListTiposReferencia = true;
        this.displayCrearTipoReferencia = false;
        this.inicializarModelo();
        // recargar la tabla
        this.cargarTiposReferencia();
      }
  }


  inicializarModelo() {
    this.tipoReferencia = {
      idTipoReferencia: null,
      nombre: '',
      descripcion: '',
      nombreCampo: '',
      longitudValor: null,
      tipoDatos: '',
      estado: '',
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaModificacion: '',
      fechaIniVigencia: '',
      fechaFinVigencia: ''
    };
}

  cargarTipoReferenciaById(id) {
    this.tipoReferenciaService.getTipoReferenciaById(id)
              .subscribe(

                (resp: any) => {
                // console.log(resp);
                 this.tipoReferencia = resp;
              });
  }

  onSubmit(isValid) {
    if (isValid) {
      if (this.operacion === 'U') {
        this.tipoReferenciaService.actualizarReferencia(this.tipoReferencia)
        .subscribe(resp => {
          this.showPanel('V', null);
          }
        );
      } else if (this.operacion === 'C') {
        this.tipoReferenciaService.crearTipoReferencia(this.tipoReferencia)
        .subscribe(resp => {
          this.showPanel('V', null);
          }
        );
      }
    }
  }

}

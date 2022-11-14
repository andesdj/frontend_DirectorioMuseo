import { Component, OnInit } from '@angular/core';
import { AgrupacionesService } from 'src/app/services/agrupaciones/agrupaciones.service';
import { Agrupaciones } from 'src/app/models/agrupaciones.model';
import { TipoReferenciaService } from 'src/app/services/service.index';
import { IOption } from 'ng-select';

@Component({
  selector: 'app-agrupaciones-simus',
  templateUrl: './agrupaciones-simus.component.html',
  styleUrls: ['./agrupaciones-simus.component.css']
})
export class AgrupacionesSimusComponent implements OnInit {
 
  displayListAgente: boolean;
  displayCrearAgente: boolean;
  registro: boolean;
  perfil: boolean;
  oferta: boolean;
  listaAgrupaciones = [];
  agrupacion: Agrupaciones;
  tipoAgrupacion: Array<IOption>;
  areaLista: Array<IOption>;
  munNacimientoLista: Array<IOption>;
  ZON_ID_DEP: string;
  DepartamentoId: string;
  depLista: Array<IOption>;

  constructor(public _agrupacionesService: AgrupacionesService, public _tipoReferenciaService: TipoReferenciaService) {
    this.displayListAgente = true;
    this.displayCrearAgente = false;
    this.registro = true;
    this.perfil = false;
    this.oferta = false;
    this.agrupacion = new Agrupaciones(null, null, '', null, null, null, null, null, '', '', '', '', '', '', '', '', '', null, '', '', '');
    

   }

  ngOnInit() {
    this.cargarAgrupaciones();
    this.cargarTiposAgrupacion();
    this.cargarAreas();
  }

  showPanel2(sw, id) {
    this.registro = false;
      this.perfil = false;
      this.oferta = false;
    if (sw === 'R') { // Crear Usuario
      this.registro = true;
  } else if (sw === 'P') { // Actualizar Usuario
        this.perfil = true;
      } else if (sw === 'O') {//Volver al listado de contratistas
        this.oferta = true;
      }
  }

  showPanel(sw, id) {
    if (sw === 'C') { // Crear Usuario
      this.displayListAgente = false;
        this.displayCrearAgente = true;
      //this.inicializarModelo();
  } else if (sw === 'U') { // Actualizar Usuario
        this.displayListAgente = false;
        this.displayCrearAgente = true;
        //this.getAgrupacionById(id);
//        this.operacion = 'U';
      } else if (sw === 'V') { // Volver al listado de contratistas
        this.displayListAgente = true;
        this.displayCrearAgente = false;
        // this.inicializarModelo();
        // recargar la tabla
        //this.cargarAgrupaciones();
      }
  }

  cargarAgrupaciones() {
    this._agrupacionesService.cargarAgrupaciones( )
              .subscribe(
                (resp: any) => {
                 this.listaAgrupaciones = resp.Lista;
              });
  }

  cargarTiposAgrupacion() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorId(8).subscribe(
        result => {
            this.tipoAgrupacion = result.Lista;
        },
        error => {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(<any>error);
        }
    );
  }

  cargarAreas() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorId(10).subscribe(
        result => {
            this.areaLista = result.Lista;
        },
        error => {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(<any>error);
        }
    );
  }
  getDep() {
    this._tipoReferenciaService.getDepartamentos().subscribe(
        result => {
            this.depLista = result.Lista;
        },
        error => {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(<any>error);
        }
    );
}
  mostrarMunicipiosDeNacimiento() {
    this._tipoReferenciaService.getMunicipiosByDepartamento(this.agrupacion.DepartamentoId).subscribe(
        result => {
            this.munNacimientoLista = result.Lista;
        },
        error => {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(<any>error);
        }
    );
  }

}

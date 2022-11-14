import { Component, OnInit } from '@angular/core';
import { MapUbicacionService ,  TipoReferenciaService, AgenteService, EscenariosService} from 'src/app/services/service.index';
import { Escenario } from 'src/app/models/escenario.model';
import { IOption } from 'ng-select';
import Swal from 'sweetalert2';
import { URL_SERVICIOS } from '../../config/config';
import { ValorReferencia } from '../../models/valorReferencia.model';

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['./espacios.component.css']
})
export class EspaciosComponent implements OnInit {
  displayListEspacios: boolean;
  displayCrearEspacio: boolean;
  listaEspacios = [];
  EstiloStep1: string;
  EstiloStep2: string;
  EstiloStep3: string;
  EstiloStep4: string;
  escenario: Escenario;
  registro: boolean;
  perfil: boolean;
  oferta: boolean;
  tipoEntidadLista: Array<IOption>;
  tipoEscenarioLista: Array<IOption>;
  depLista: Array<IOption>;
  munLista: Array<IOption>;

  // tslint:disable-next-line:max-line-length
  constructor(public _mapsUbicacionService: MapUbicacionService, public _escenarioService: EscenariosService, public _tipoReferenciaService: TipoReferenciaService) {
    this.displayListEspacios = true;
    this.displayCrearEspacio = false;
    this.EstiloStep1 = 'active';
    this.EstiloStep2 = '';
    this.EstiloStep3 = '';
    this.EstiloStep4 = '';
    this.registro = true;
    this.perfil = false;
    this.oferta = false;
    // tslint:disable-next-line:max-line-length
    this.escenario = new Escenario(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null )
   }

  ngOnInit() {
    this.cargarEspacios();
    this.getDep();
    this.cargarTiposEntidad();
    this.cargarTiposEscenarios();
  }

  cargarTiposEntidad() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorId(5).subscribe(
        result => {
            this.tipoEntidadLista = result.Lista;
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

  cargarTiposEscenarios() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorId(1046).subscribe(
        result => {
            this.tipoEscenarioLista = result.Lista;
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

  cargarEspacios() {
    this._escenarioService.cargarEscenarios( )
              .subscribe(
                (resp: any) => {
                 this.listaEspacios = resp.Lista;
              });
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

mostrarMunicipios() {
  this._tipoReferenciaService.getMunicipiosByDepartamento(this.escenario.DepartamentoId).subscribe(
      result => {
          this.munLista = result.Lista;
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

  onSubmit(isValid, paso) {
    if (isValid) {
        this._escenarioService.crearEscenario(this.escenario)
        .subscribe(resp => {
         // this.showPanel('V', null);
          }
        );
        this.registro = false;
        this.perfil = false;
        this.oferta = false;
      if (paso === 'R') { // Crear Usuario
        this.registro = true;
          this.EstiloStep1 = 'active';
          this.EstiloStep2 = '';
          this.EstiloStep3 = '';
          this.EstiloStep4 = '';
          } else if (paso === 'P') { // Actualizar Usuario
          this.perfil = true;
          this.EstiloStep1 = 'complete';
          this.EstiloStep2 = 'active';
          this.EstiloStep3 = '';
          this.EstiloStep4 = '';
        } else if (paso === 'O') {//Volver al listado de contratistas
          this.oferta = true;
          this.EstiloStep1 = 'complete';
          this.EstiloStep2 = 'complete';
          this.EstiloStep3 = 'active';
          this.EstiloStep4 = '';
        }
    }
  }

  showPanel2(sw, id) {

    this.registro = false;
    this.perfil = false;
    this.oferta = false;
  if (sw === 'R') { // Crear Usuario
    this.registro = true;
    this.EstiloStep1 = 'active';
    this.EstiloStep2 = '';
    this.EstiloStep3 = '';
    this.EstiloStep4 = '';
} else if (sw === 'P') { // Actualizar Usuario
      this.perfil = true;
      this.EstiloStep1 = 'complete';
    this.EstiloStep2 = 'active';
    this.EstiloStep3 = '';
    this.EstiloStep4 = '';
    } else if (sw === 'O') {//Volver al listado de contratistas
      this.oferta = true;
      this.EstiloStep1 = 'complete';
      this.EstiloStep2 = 'complete';
    this.EstiloStep3 = 'active';
    this.EstiloStep4 = '';
    }
}

showPanel(sw, id) {

  if (sw === 'C') { // Crear Usuario
    this.displayListEspacios = false;
      this.displayCrearEspacio = true;
    //this.inicializarModelo();
} else if (sw === 'U') { // Actualizar Usuario
      this.displayListEspacios = false;
      this.displayCrearEspacio = true;
      this.getEscenarioById(id);
      //this.operacion = 'U';
    } else if (sw === 'V') {//Volver al listado de contratistas
      this.displayListEspacios = true;
      this.displayCrearEspacio = false;
       //this.inicializarModelo();
      // recargar la tabla
      this.cargarEspacios();
    }
}

getEscenarioById(id) {
  this._escenarioService.getEscenarioByEscenarioId(id).subscribe(
      result => {
      this.escenario = result;
      console.log(this.escenario);
      this.mostrarMunicipios();
      },
      error => {
          // this.error = error;
          // if (error.statusText === 'Unauthorized') {
          //     this.servicePNotify.error('TYC', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          //     this.authenticationService.logout().subscribe(response => { });
          //     this.storageService.logout();
          // }
          console.log(<any>error);
      }
  );
}

borrarEspacio(id) {
  Swal.fire({
    title: 'Borrar Registro?',
    text: 'Ese proceso no se podra revertir!',
    // type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar Esto!'
  }).then((result) => {
    if (result.value) {
      this._escenarioService.deleteEscenario(id).subscribe(
        result => {
            // if (result.OperacionExitosa) {
            //     this.getRedSocialByAgente();
            //     this.servicePNotify.warn('Eliminar', 'Datos eliminados correctamente!');
            // } else {
            //     this.servicePNotify.html(
            //         '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
            //         'error'
            //     );
            // }
            this.cargarEspacios();
        },
        error => {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            // swal('Agente Creado', resp.Mensaje, 'success' );
            console.log(<any>error);
        }
    );
      Swal.fire(
        'Borrado!',
        'Este registro fue borrado.',
        'success'
      );
    }
  });

}


aprobarEspacio(id) {
  Swal.fire({
    title: 'Aprobar Espacio ?',
    text: 'Este proceso cambiara el estado del registro!',
    // type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Aprobar esto!'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Aprobado!',
        'su registro fue aprobado.',
        'success'
      );
    }
  });
}

}

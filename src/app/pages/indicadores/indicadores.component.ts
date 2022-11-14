import { Component, OnInit } from '@angular/core';
import { IndicadoresService } from '../../services/indicadores/indicadores.service';
import { Indicador, MetaAvanceIndicador, MetaCuatrenioIndicador } from '../../models/Indicador.model';
import { IOption } from 'ng-select';
import { TipoReferenciaService } from '../../services/tipoReferencia/tipo-referencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./Indicadores.component.css'],
})
export class IndicadoresComponent implements OnInit {
  listaAgentesFormacion = [];
  listaIndicadores = [];
  displayListIndicadores: boolean;
  displayCrearIndicador: boolean;
  registro: boolean;
  EstiloStep1: string;
  EstiloStep2: string;
  EstiloStep3: string;
  EstiloStep4: string;
  indicador: Indicador;
  metaAvanceIndicador: MetaAvanceIndicador;
  metaCuatrenioIndicador: MetaCuatrenioIndicador;
  PeriodicidadLista: Array<IOption>;
  ReporteLista: Array<IOption>;
  ObjetivoLista: Array<IOption>;
  EstrategiaLista: Array<IOption>;
  AccionLista: Array<IOption>;
  TipoIndicadorLista: Array<IOption>;
  AreaLista: Array<IOption>;
  AnoLista: Array<IOption>;
  EstadosLista: Array<IOption>;
  experiencia: boolean;
  displayCrearAgenteExperiencia: boolean;
  displayListAgenteExperiencia: boolean;
  formacion: boolean;
  displayListAgenteFormacion: boolean;
  displayCrearAgenteFormacion: boolean;
  operacion = 'C';
  // Experiencia
  listaAgentesExperiencia = [];
  // fin esperiencia

  constructor(public _indicadoresService: IndicadoresService, public _tipoReferenciaService: TipoReferenciaService) {
    this.displayCrearIndicador = false;
    this.displayListIndicadores = true;
    this.registro = true;
    this.formacion = false;
    this.displayListAgenteFormacion = true;
    this.displayCrearAgenteFormacion = false;
    this.experiencia = false;
    this.displayListAgenteExperiencia = true;
    this.displayCrearAgenteExperiencia = false;
    // tslint:disable-next-line: max-line-length
    this.indicador = new Indicador(null, null, null, null, null, '', '', '', null, '', null, '', null, '', null, null, null,  null, '', null, '', '');
    this.metaAvanceIndicador = new MetaAvanceIndicador(null, null, null, '', null, '', '', '', null, '');
    this.metaCuatrenioIndicador = new MetaCuatrenioIndicador(null, null, null, null, '', '', null, '');
    this.EstiloStep1 = 'active';
    this.EstiloStep2 = '';
    this.EstiloStep3 = '';
    this.EstiloStep4 = '';
  }

  ngOnInit() {
    this.cargarIndicadores();
    this.cargarPeriodicidad();
    this.cargarReporte();
    this.cargarTipoIndicador();
    this.cargarAnos();
    this.cargarEstado();
  }

  getIndicadorByIndicadorId(id: any) {
    this._indicadoresService.getIndicadorByIndicadorId(id).subscribe(
      (result) => {
        this.indicador = result;
        this.cargarObjetivo(this.indicador.ReporteId);
        this.cargarEstrategia(this.indicador.ObjetivoId);
        this.cargarAccion(this.indicador.EstrategiaId);
        this.cargarAvancesIndicadores(this.indicador.IndicadorId);
        this.cargarCuatrenioIndicadores(this.indicador.IndicadorId);
      },
      (error) => {
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

  cargarEstado() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_ESTADO_PROCESO_FORMACION').subscribe(
      result => {
        this.EstadosLista = result.Lista;
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

  cargarPeriodicidad() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_PERIODICIDAD_INDICADORES').subscribe(
      result => {
        this.PeriodicidadLista = result.Lista;
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
  cargarAnos() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_ANO').subscribe(
      result => {
        this.AnoLista = result.Lista;
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

  cargarReporte() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorIdPadre(5568).subscribe(
      result => {
        this.ReporteLista = result.Lista;
        this.ObjetivoLista = null;
        this.EstrategiaLista = null;
        this.AccionLista = null;
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

  cargarObjetivo(ReporteId: number) {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorIdPadre(ReporteId).subscribe(
      result => {
        this.ObjetivoLista = result.Lista;
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

  cargarEstrategia(ObjetivoId: number) {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorIdPadre(ObjetivoId).subscribe(
      result => {
        this.EstrategiaLista = result.Lista;
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

  cargarAccion(EstrategiaId: number) {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorIdPadre(EstrategiaId).subscribe(
      result => {
        this.AccionLista = result.Lista;
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

  cargarTipoIndicador() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_TIPO_INDICADOR').subscribe(
      result => {
        this.TipoIndicadorLista = result.Lista;
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

  cargarArea() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorId(3059).subscribe(
      result => {
        this.AreaLista = result.Lista;
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


  cargarIndicadores() {
    this._indicadoresService.cargarIndicadores().subscribe((resp: any) => {
      this.listaIndicadores = resp.Lista;
      // this.appointmentsData = resp.Lista;
      // this.cargarFicha();
      // this.loading = false;
    });
  }

  showPanel2(sw: string, id: any) {
    this.registro = false;
     this.experiencia = false;
     this.formacion = false;
    if (sw === 'R') {
      // Crear Usuario
      this.registro = true;
      this.EstiloStep1 = 'active';
      this.EstiloStep2 = '';
      this.EstiloStep3 = '';
      this.EstiloStep4 = '';
    // } else if (sw === 'P' && this.indicador.IndicadorId != null) {
    } else if (sw === 'P') {
      // Actualizar Usuario
      this.experiencia = true;
      this.EstiloStep1 = 'complete';
      this.EstiloStep2 = 'active';
      this.EstiloStep3 = '';
      this.EstiloStep4 = '';
    // } else if (sw === 'O' && this.indicador.IndicadorId != null) {
    } else if (sw === 'O') {
      // Volver al listado
      this.formacion = true;
      this.EstiloStep1 = 'complete';
      this.EstiloStep2 = 'complete';
      this.EstiloStep3 = 'active';
      this.EstiloStep4 = '';
    } else if (this.indicador.IndicadorId === null) {
      this.registro = true;
    }
  }

  showPanel(sw, id) {
    if (sw === 'CA') { // Crear Usuario
      this.displayCrearIndicador = true;
      this.displayListIndicadores = false;
    } else if (sw === 'C') { // Crear Usuario
      this.displayListIndicadores = false;
      this.displayCrearIndicador = true;
       this.inicializarModelo();
    } else if (sw === 'U') { // Actualizar Usuario
      this.displayListIndicadores = false;
      this.displayCrearIndicador = true;
       this.getIndicadorByIndicadorId(id);
       this.operacion = 'U';
    } else if (sw === 'V') {// Retornar al Listado
      this.displayListIndicadores = true;
      this.displayCrearIndicador = false;
      // this.displayEntidadAreas = false;

       this.inicializarModelo();
      // recargar la tabla
       this.cargarIndicadores();
    }
  }

  onSubmit(isValid: any, paso: string) {
    if (isValid) {
      debugger;
      // this.entidad.TipoCampoAccion = [];
      // for (let i = 0; i < this.selectedItemsAreaPrincipal.length; i++) {
      //   this.entidad.TipoCampoAccion.push(this.selectedItemsAreaPrincipal[i].id);
      // }

      // this.entidad.OtrasAreasCampoAccion = this.dataSourceOtrasOcupaciones;

      this._indicadoresService.crearIndicador(this.indicador)
        .subscribe(resp => {
          this.indicador.IndicadorId = this._indicadoresService.IndicadorId;
          //this.showPanel('V', null);
        }
        );
      // }

      // this.registro = false;
      // this.experiencia = false;
      // //this.formacion = false;
      // if (paso === 'R') {
      //   // Crear Usuario
      //   this.registro = true;
      //   this.EstiloStep1 = 'active';
      //   this.EstiloStep2 = '';
      //   this.EstiloStep3 = '';
      //   this.EstiloStep4 = '';
      // } else if (paso === 'P') {
      //   // Actualizar Usuario
      //   this.experiencia = true;
      //   this.EstiloStep1 = 'complete';
      //   this.EstiloStep2 = 'active';
      //   this.EstiloStep3 = '';
      //   this.EstiloStep4 = '';
      // } else if (paso === 'O') {
      //   // Volver al listado de contratistas
      //   // this.formacion = true;
      //   this.EstiloStep1 = 'complete';
      //   this.EstiloStep2 = 'complete';
      //   this.EstiloStep3 = 'active';
      //   this.EstiloStep4 = '';
      // }
    }
  }

  inicializarModelo() {
    this.indicador = {
      IndicadorId: null,
        ReporteId: null,
        ObjetivoId: null,
        EstrategiaId: null,
        AccionId: null,
        AccionNombre: '',
        IndicadorNombre: '',
        IndicadorUnidadMedida: '',
        PeriodicidadId: null,
        PeriodicidadNombre: '',
        TipoIndicadorId: null,
        TipoIndicadorNombre: '',
        AreaId: null,
        AreaNombre: '',
        IndicadorLineaBase: null,
        CuentaUsuarioIdGestiona: null,
        metaAvanceIndicador: [],
        metaCuatrenioIndicador: [],
        IndicadorFechaModificacion: '',
        EstadoId: null,
        IndicadorFormula: '',
        IndicadorDescripcion: '',
    };
    this.inicializarModeloExperiencia();
    this.inicializarModeloFormacion();
    this.listaAgentesExperiencia = null;
    this.listaAgentesFormacion = null;
    this.displayCrearAgenteExperiencia = false;
    this.displayListAgenteExperiencia = true;
    this.displayCrearAgenteFormacion = false;
    this.displayListAgenteFormacion = true;
  }

  borrarIndicador(id: any) {
    Swal.fire({
      title: 'Borrar Registro?',
      text: 'Ese proceso no se podra revertir!',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Esto!',
    }).then((result) => {
      if (result.value) {
        debugger;
        this._indicadoresService.deleteInidicador(id).subscribe(
          (result) => {
            // if (result.OperacionExitosa) {
            //     this.getRedSocialByAgente();
            //     this.servicePNotify.warn('Eliminar', 'Datos eliminados correctamente!');
            // } else {
            //     this.servicePNotify.html(
            //         '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
            //         'error'
            //     );
            // }
            this.cargarIndicadores();
          },
          (error) => {
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
        Swal.fire('Borrado!', 'Este registro fue borrado.', 'success');
      }
    });
  }

  //////////////////////////
  //      Avance Meta     //
  //////////////////////////
  showPanelExperiencia(sw: string, id: any) {
    if (sw === 'C') {
      // Crear Usuario
      this.displayListAgenteExperiencia = false;
      this.displayCrearAgenteExperiencia = true;
       this.inicializarModeloExperiencia();
    } else if (sw === 'U') {
      // Actualizar Usuario
      this.displayListAgenteExperiencia = false;
      this.displayCrearAgenteExperiencia = true;
      this.getAgenteExperienciaById(id);
      this.operacion = 'U';
    } else if (sw === 'V') {
      // Volver al listado de contratistas
      this.displayListAgenteExperiencia = true;
      this.displayCrearAgenteExperiencia = false;
       this.inicializarModeloExperiencia();
      // recargar la tabla
       this.cargarAvancesIndicadores(this.indicador.IndicadorId);
    }
  }

  cargarAvancesIndicadores(id: number) {
    this._indicadoresService.cargarAvancesIndicadores(id).subscribe((resp: any) => {
      this.listaAgentesExperiencia = resp.Lista;
    });
  }

  onSubmitExperiencia(isValid: any, paso: any) {

        this._indicadoresService
          .crearAvanceIndicador(this.metaAvanceIndicador)
          .subscribe((resp) => {
            this.showPanelExperiencia('V', null);
          });
  }

  inicializarModeloExperiencia() {
    this.metaAvanceIndicador = {
      MetaAvanceId: null,
        IndicadorId: this.indicador.IndicadorId,
        MetaAvanceMeta: null,
        MetaAvanceFechaMeta: '',
        MetaAvanceAvanceCuantitativo: null,
        MetaAvanceAvanceCualitativo: '',
        MetaAvanceFechaAvance: '',
        MetaAvanceObservaciones: '',
        CuentaUsuarioIdGestiona: null,
        MetaAvanceFechaModificacion: '',
    };
  }

  getAgenteExperienciaById(id: any) {
    this._indicadoresService.getAvanceIndicadorByAvanceIndicadorId(id).subscribe(
      (result) => {
        this.metaAvanceIndicador = result;
      },
      (error) => {
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

  borrarAgenteExperiencia(id: any) {
    Swal.fire({
      title: 'Borrar Registro?',
      text: 'Ese proceso no se podra revertir!',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Esto!',
    }).then((result) => {
      if (result.value) {
        this._indicadoresService.deleteAgenteExperiencia(id).subscribe(
          (result) => {
            // if (result.OperacionExitosa) {
            //     this.getRedSocialByAgente();
            //     this.servicePNotify.warn('Eliminar', 'Datos eliminados correctamente!');
            // } else {
            //     this.servicePNotify.html(
            //         '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
            //         'error'
            //     );
            // }
            this.cargarAvancesIndicadores(this.indicador.IndicadorId);
          },
          (error) => {
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
        Swal.fire('Borrado!', 'Este registro fue borrado.', 'success');
      }
    });
  }

  /////////////////////////////
  //      Cuatrenio Meta     //
  /////////////////////////////

  showPanelFormacion(sw: string, id: any) {
    if (sw === 'C') {
      // Crear Usuario
      this.displayListAgenteFormacion = false;
      this.displayCrearAgenteFormacion = true;
      this.inicializarModeloFormacion();
    } else if (sw === 'U') {
      // Actualizar Usuario
      this.displayListAgenteFormacion = false;
      this.displayCrearAgenteFormacion = true;
      this.getAgenteFormacionById(id);
      this.operacion = 'U';
    } else if (sw === 'V') {
      // Volver al listado de contratistas
      this.displayListAgenteFormacion = true;
      this.displayCrearAgenteFormacion = false;
      this.inicializarModeloFormacion();
      // recargar la tabla
      this.cargarCuatrenioIndicadores(this.indicador.IndicadorId);
    }
  }

  getAgenteFormacionById(id: any) {
    this._indicadoresService.getMetaCuatrenioIndicadorById(id).subscribe(
      (result) => {
        this.metaCuatrenioIndicador = result;
      },
      (error) => {
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

  inicializarModeloFormacion() {
    this.metaCuatrenioIndicador = {

      MetaCuatrienioId: null,
        IndicadorId: this.indicador.IndicadorId,
        AnoId: null,
        MetaCuatrienioMeta: null,
        MetaCuatrienioDescripcion: '',
        MetaCuatrienioObservacion: '',
        CuentaUsuarioIdGestiona: null,
        MetaCuatrienioFechaModificacion: '',
    };
  }

  cargarCuatrenioIndicadores(id: number) {
    this._indicadoresService.cargarCuatrenioIndicadores(id).subscribe((resp: any) => {
      this.listaAgentesFormacion = resp.Lista;
    });
  }

  onSubmitFormacion(isValid: any, paso: any) {

      // if (isValid) {
        this._indicadoresService
          .crearMetaCuatrenioIndicador(this.metaCuatrenioIndicador)
          .subscribe((resp) => {
            this.showPanelFormacion('V', null);
          });
      //}
  }

  borrarAgenteFormacion(id: any) {
    Swal.fire({
      title: 'Borrar Registro?',
      text: 'Ese proceso no se podra revertir!',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Esto!',
    }).then((result) => {
      if (result.value) {
        this._indicadoresService.deleteAgenteFormacion(id).subscribe(
          (result) => {
            // if (result.OperacionExitosa) {
            //     this.getRedSocialByAgente();
            //     this.servicePNotify.warn('Eliminar', 'Datos eliminados correctamente!');
            // } else {
            //     this.servicePNotify.html(
            //         '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
            //         'error'
            //     );
            // }
            this.cargarCuatrenioIndicadores(this.indicador.IndicadorId);
          },
          (error) => {
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
        Swal.fire('Borrado!', 'Este registro fue borrado.', 'success');
      }
    });
  }

}

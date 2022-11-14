import { Component, OnInit } from '@angular/core';
import { CompromisosService, TipoReferenciaService, UsuarioService } from 'src/app/services/service.index';
import { Compromisos, CompromisosAvances } from '../../models/compromisos.model';
import { List } from '../oferta-administracion/oferta-administracion.component';
import { IOption } from 'ng-select';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-compromisos-administracion',
  templateUrl: './compromisos-administracion.component.html',
  styles: []
})
export class CompromisosAdministracionComponent implements OnInit {
  flag: any;
  victimaConlficto: any;
  tipoActor: any;
  usuario: User;
  usuarioNombre: string;
  email: string;
  roles: any;
  role: string;
  usuId: number;
  perfilId: number;
  accionCompromiso: string;
  listaUsuarios: Array<IOption>;
  listaEstado: Array<IOption>;
  listaCompromisoTipo: Array<IOption>;
  listaTipoReporte: Array<IOption>;
  listaJefesDependencia: Array<IOption>;
  depLista: Array<IOption>;
  munLista: Array<IOption>;
  AreaId: string;
  DireccionId: string;
  direccionesLista: Array<IOption>;
  areasLista: Array<IOption>;
  listaImportancia: Array<IOption>;
  compromisos: Compromisos[];
  compromiso: Compromisos;
  compromisosAvances: CompromisosAvances[];
  compromisosAvance: CompromisosAvances;
  AnoId: string;
  startEditAction: string = 'click';
  selectTextOnEditStart: boolean = true;
  popupCompromisos: boolean;
  popupCompromisosAvances: boolean;
  dataSourceAnos: List[] = [{
    'ID': 183,
    'Name': '2021'
    }, {
        'ID': 184,
        'Name': '2021'
    }];

  constructor(public _compromisoService: CompromisosService, public _tipoReferenciaService: TipoReferenciaService, public _usuarioService: UsuarioService) {
    this.compromiso = new Compromisos(null, null, null, null, null, null, '', '', null, null, '', '', '' ,'', null, null , '', '', null, null);
    this.compromisosAvance = new CompromisosAvances (null, null, '', null, null, null, '', '');
    this.flag = 0;
    this.victimaConlficto = 0;
    this.tipoActor = 0;
    
    this.popupCompromisos = false; 
    this.popupCompromisosAvances = false; 
    this.AnoId = "183";
    this.DireccionId = '0';
    this.AreaId = '0';
    const user: any = this._usuarioService.getCurrentUser();
    this.usuario = JSON.parse(user);
    this.usuarioNombre = this.usuario.USU_NOMBRE;
    this.email = this.usuario.USU_CORREO_ELECTRONICO;
    this.usuId = this.usuario.USU_ID;
    this.roles = this.usuario.Perfiles;
    if (this.roles.length > 0) {
      this.role = this.roles[0].PER_NOMBRE;
      this.perfilId = this.roles[0].PER_ID;
    }

  }

  ngOnInit() {
    this.getUsuariosInternos();
    this.cargarTiposCompromisos();
    this.cargarEstado();
    this.cargarTipoReporte();
    this.cargarImportancia();
    this.cargarJefesDependencia();
    this.getDirecciones();
    this.getDep();
    this.getAllCompromisos();
    
    }

    

    onSubmitCompromisoAvance(isValid: any){
      if (isValid) {

          
        this.compromisosAvance.UsuarioRegistra = this.usuId;
          // if (this.accionCompromiso === 'U') {
          //   this.compromiso.FechaActualizada = Date..now().toString();
          // } else {
          //   this.compromiso.FechaRegistro = Date.now().toString();
          // }
          this._compromisoService
            .salvarCompromisoAvance(this.compromisosAvance)
            .subscribe((resp) => {
              this.popupCompromisosAvances = false;
              this.CargarCompromisosAvances(this.compromisosAvance.CompromisoId);
              this.getAllCompromisos();
              //this.compromisosAvances = [];
            });
      }
    }

    inicializarAvanceCompromiso(id) {
      this.compromisosAvance = {
        ReporteAvanceId: null,
        CompromisoId: id,
        AvanceCualitativo: '',
        AvanceCuantitativo: null,
        EstadoId: null,
        FechaActualiza: '',
        FechaRegistra: '',
        UsuarioRegistra: null,
      };
    }

    borrarAvanceCompromiso(ReporteAvanceId, CompromisoId) {
      Swal.fire({
        title: 'Borrar Avance Compromiso?',
        text: 'Ese proceso no se podra revertir!',
        // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar Esto!',
      }).then((result) => {
        if (result.value) {
          this._compromisoService.deleteCompromisoAvance(ReporteAvanceId).subscribe(
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
              // se puede utilizar esta variable para controler los mensajes del back
              //console.log(result.OperacionExitosa);
              if(result.OperacionExitosa)
              {
                Swal.fire('Borrado!', 'Este registro fue borrado.', 'success');
              }
              else
              {
                Swal.fire('ERROR!', 'Ocurrio un error al borrar el registro', 'error');
              }
              debugger;
              this.CargarCompromisosAvances(CompromisoId);
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

          
        }
      });
    }


    showAccionCompromisoAvance(id: number, accion: string) {
      debugger;
      this.compromisosAvance.CompromisoId = id;
      if(accion === 'C'){
        this.inicializarAvanceCompromiso(id);
      }
      else if (accion === 'U') {
        this._compromisoService
        .getCompromisoAvanceByReporteAvanceId(id)
        .subscribe((resp: any) => {
          this.compromisosAvance = resp;
        });
       }
      this.accionCompromiso = accion;
      this.popupCompromisosAvances = true;
    }

    showVolverAvance() {
      this.popupCompromisosAvances = false;
    }


    getDep() {
      this._tipoReferenciaService.getDepartamentos().subscribe(
        (result) => {
          // debugger;
          this.depLista = result.Lista;
        },
        (error) => {
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

    getAllCompromisos(){
      this._compromisoService.getAllCompromisos(this.AnoId)
      .subscribe((resp: any) => {
          this.compromisos = resp.Lista;
          
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
  
      this.compromisosAvances = [];
    }

    CargarCompromisosAvances( id: any) {
      this._compromisoService.getAllCompromisosAvances(id).subscribe((resp: any) => {
        this.compromisosAvances = resp.Lista;
      });
    }

    onSubmitCompromiso(isValid: any){
      if (isValid) {

          
        this.compromiso.UsuarioRegistraId = this.usuId;
          // if (this.accionCompromiso === 'U') {
          //   this.compromiso.FechaActualizada = Date..now().toString();
          // } else {
          //   this.compromiso.FechaRegistro = Date.now().toString();
          // }
          this._compromisoService
            .salvarCompromiso(this.compromiso)
            .subscribe((resp) => {
              this.popupCompromisos = false;
              this.getAllCompromisos();
              this.compromisosAvances = [];
            });
      }
    }

    getDirecciones() {
      this._tipoReferenciaService.getValorReferenciaPorTipoValorId(44).subscribe(
          result => {
              this.direccionesLista = result.Lista;
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

    getAreas() {
      this._tipoReferenciaService.getValorReferenciaPorTipoValorIdPadre(this.compromiso.AreaId).subscribe(
          result => {
              this.areasLista = result.Lista;
              //this.cargarOferta();
              //this.programasLista = [];
              //this.OfertaProgramaId = '0';
              this.AreaId =  '0';
             // this.cargarPrograma();
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

    showAccionCompromiso(id: number, accion: string) {

      if(accion === 'C'){
        this.inicializarCompromiso();
      }
      else if (accion === 'U') {
        this._compromisoService
        .getCompromisoByCompromisoId(id)
        .subscribe((resp: any) => {
          this.compromiso = resp;
          this.mostrarMunicipios();
          this.getAreas();
        });
       }
      this.accionCompromiso = accion;
      this.popupCompromisos = true;
    }

    borrarCompromiso(CompromisoId) {
      Swal.fire({
        title: 'Borrar Compromiso?',
        text: 'Ese proceso no se podra revertir!',
        // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar Esto!',
      }).then((result) => {
        if (result.value) {
          this._compromisoService.deleteCompromiso(CompromisoId).subscribe(
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
              // se puede utilizar esta variable para controler los mensajes del back
              //console.log(result.OperacionExitosa);
              if(result.OperacionExitosa)
              {
                Swal.fire('Borrado!', 'Este registro fue borrado.', 'success');
              }
              else
              {
                Swal.fire('ERROR!', 'Existen avances registrados, por favor borrar primero los avances', 'error');
              }

              this.getAllCompromisos();
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

          
        }
      });
    }

    inicializarCompromiso() {
      this.compromiso = {
        CompromisoId: null,
        AnoId: null,
        DependenciaResponsable: null,
        ImportanciaId: null,
        AreaId: null,
        JefeDependencia: null,
        Temas: '',
        Descripcion: '',
        MunicipioId: null,
        TipoReporteId: null,
        Estado: '',
        FechaCompromiso: '',
        FechaLimite: '',
        Observaciones: '',
        UsuarioResponsableReporteId: null,
        UsuarioRegistraId: null,
        FechaRegistro: '',
        FechaActualizada: '',
        DepartamentoId: null,
        tipoCompromisoId: null,
      };
    }
  

    mostrarMunicipios() {
      this._tipoReferenciaService
        .getMunicipiosByDepartamento(this.compromiso.DepartamentoId)
        .subscribe(
          (result) => {
            this.munLista = result.Lista;
          },
          (error) => {
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

    cargarImportancia() {
      this._tipoReferenciaService
        .getValorReferenciaPorTipoValorNombre('MA_COMPROMISO_IMPORTANCIA')
        .subscribe(
          (result) => {
            this.listaImportancia = result.Lista;
          },
          (error) => {
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

    cargarJefesDependencia() {
      this._tipoReferenciaService
        .getValorReferenciaPorTipoValorNombre('MA_JEFE_DEPENDENCIA')
        .subscribe(
          (result) => {
            this.listaJefesDependencia = result.Lista;
          },
          (error) => {
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

    cargarTipoReporte() {
      this._tipoReferenciaService
        .getValorReferenciaPorTipoValorNombre('MA_COMPROMISO_TIPO_REPORTE')
        .subscribe(
          (result) => {
            this.listaTipoReporte = result.Lista;
          },
          (error) => {
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
    
    cargarEstado() {
      this._tipoReferenciaService
        .getValorReferenciaPorTipoValorNombre('MA_COMPROMISO_ESTADO')
        .subscribe(
          (result) => {
            this.listaEstado = result.Lista;
          },
          (error) => {
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

    cargarTiposCompromisos() {
      this._tipoReferenciaService
        .getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_ACCION')
        .subscribe(
          (result) => {
            this.listaCompromisoTipo = result.Lista;
          },
          (error) => {
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

    cargarUsuarios() {
      this._tipoReferenciaService
        .getValorReferenciaPorTipoValorNombre('MA_COMPROMISO_ESTADO')
        .subscribe(
          (result) => {
            this.listaEstado = result.Lista;
          },
          (error) => {
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
    
    getUsuariosInternos(){
      this._compromisoService.getUsuariosInternos()
      .subscribe((resp: any) => {
        debugger;
          this.listaUsuarios = resp.Lista;
          
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
  
      this.compromisosAvances = [];
    }

    showVolver() {
      this.popupCompromisos = false;
    }

    customizeTooltip = (pointsInfo) => {
      return { text: parseInt(pointsInfo.originalValue) + " Días Restantes" };
  }

  customizeTooltipPorcentaje = (pointsInfo) => {
    return { text: parseInt(pointsInfo.originalValue) + "%" };
}
  

}

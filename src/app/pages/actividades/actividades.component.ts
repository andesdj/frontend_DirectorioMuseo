import { Component, OnInit } from '@angular/core';
import { ActividadService, TipoReferenciaService, UsuarioService } from 'src/app/services/service.index';
import { Actividades, AsistenciaActividad, procesosActividad } from '../../models/actividades.model';
import { List } from '../oferta-administracion/oferta-administracion.component';
import { IOption } from 'ng-select';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';
import { DxDateBoxModule } from 'devextreme-angular';
declare var $:any;

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  tieneNumeroIdentificacion: boolean = false;
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
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
  AnosLista: Array<IOption>;
  listaCompromisoTipo: Array<IOption>;
  listaIdentidadGenero: Array<IOption>;
  listaIdentidadEtnica: Array<IOption>;
  listaTiposActor: Array<IOption>;
  listaTipoReporte: Array<IOption>;
  listaJefesDependencia: Array<IOption>;
  depLista: Array<IOption>;
  munLista: Array<IOption>;
  munListaRecidencia: Array<IOption>;
  tipoDoc: Array<IOption>;
  tipoCargo: Array<IOption>;
  tipoOcupacion: Array<IOption>;
  tipoDiscapacidad: Array<IOption>;
  ListaVias: Array<IOption>;
  tipoClasificacion: Array<IOption>;
  tipoNivelEscolaridad: Array<IOption>;
  tipoActorGeneraHecho: Array<IOption>;
  tipoHechoVictimizante: Array<IOption>;
  tipoLenguaMaterna: Array<IOption>;
  tipoOrientacionSexual: Array<IOption>;
  tipoGrupoEtareo: Array<IOption>;
  paisesLista: Array<IOption>;
  AreaId: string;
  DireccionId: string;
  direccionesLista: Array<IOption>;
  areasLista: Array<IOption>;
  listaImportancia: Array<IOption>;
  actividades: Actividades[];
  actividad: Actividades;
  asistenciaActividades: AsistenciaActividad[];
  procesosActividades: procesosActividad[];
  procesosActividad: procesosActividad;
  asistenciaActividad: AsistenciaActividad;
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
    value: Date = new Date(1981, 3, 27);
    now: Date = new Date();

  constructor(public _actividadService: ActividadService, public _tipoReferenciaService: TipoReferenciaService, public _usuarioService: UsuarioService) {
    this.actividad = new Actividades(null, null, null, null, null, null, '', '', null, null, '', '', '' ,'', null, null , '', '', null, null, null);
    this.asistenciaActividad = new AsistenciaActividad (null, null, '', null, null, null, '', '', null, null, '', null, '', '', null, null, null, null, null, null, '', null, null, null, null, null, '', null, '', '', '', null, null, '', null, '', '', null, '', '', '', null, null, null, null, null, '', '', '', '', '', null, null, null, '', null, null, '', '', null, '', '','','', '', null, null, null, null, null,null, null, null, '', null, '', false, null);
    this.procesosActividad = new procesosActividad (null,null, '', '', '', null, '');
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
    this.cargarDiscapacidad();
    this.cargarIdentidadEtnica();
    this.cargarIdentidadGenero();
    this.cargarGrupoEtareo();
    this.cargarLenguaMaterna();
    this.cargarOrientacionSexual();
    this.cargarHechoVictimizante();
    this.cargarActorGeneraHecho();
    this.cargarTiposNivelEscolaridad();
    this.cargarTiposOcupacion();
    this.cargarTiposIdentificacion();
    this.cargarPerilCargo();
    this.cargarTiposActor();
    this.getUsuariosInternos();
    this.cargarTiposCompromisos();
    this.cargarEstado();
    this.cargarTipoReporte();
    this.cargarImportancia();
    this.cargarJefesDependencia();
    this.getDirecciones();
    this.getDep();
    this.getAllCompromisos();
    this.getPaises();
    this.getAnos();
    this.cargarListaVias();
    this.cargarClasificacion();
     
    
    }

    ayudaCrearActividad() {
      Swal.fire({
        // icon: 'warning',
        html:
          '<iframe width=480 height=280 frameborder="0" scrolling="no" src="https://screencast-o-matic.com/embed?sc=cr6tqEVlbIA&v=5&ff=1" allowfullscreen="true"></iframe>',
        showCloseButton: true,
        focusConfirm: false,
      });
    }

    ayudaCrearAsistente() {
      Swal.fire({
        // icon: 'warning',
        html:
          '<iframe width=480 height=280 frameborder="0" scrolling="no" src="https://screencast-o-matic.com/embed?sc=cr6tYQVlbFD&v=5&ff=1" allowfullscreen="true"></iframe>',
        showCloseButton: true,
        focusConfirm: false,
      });
    }
    

    onSubmitCompromisoAvance(isValid: any){
      if (isValid) {

          
        this.asistenciaActividad.UsuarioRegistra = this.usuId;
          // if (this.accionCompromiso === 'U') {
          //   this.compromiso.FechaActualizada = Date..now().toString();
          // } else {
          //   this.compromiso.FechaRegistro = Date.now().toString();
          // }
          this._actividadService
            .addAsistenciaActividad(this.asistenciaActividad)
            .subscribe((resp) => {
              this.popupCompromisosAvances = false;
              this.CargarCompromisosAvances(this.asistenciaActividad.ActividadId);
              this.getAllCompromisos();
              //this.compromisosAvances = [];
            });
      }
    }

    showAccionCompromisoAvance11(id: number, accion: string) {
      
      this.asistenciaActividad.AsistenciaActividadId = id;
      if(accion === 'C'){
        this.inicializarAvanceCompromiso(id);
      }
      else if (accion === 'U') {
        this._actividadService
        .getAsistenciaActividadByAsistenciaActividadId(id)
        .subscribe((resp: any) => {
          this.asistenciaActividad = resp;
        });
       }
      this.accionCompromiso = accion;
      this.popupCompromisosAvances = true;
    }


    consultarPorCedula(id: any) {
    
      let actividadId = this.asistenciaActividad.ActividadId;;
      let numeroIdentificacion = this.asistenciaActividad.NumeroIdentificacion;
      this._actividadService
        .consultaAsistentePorCedula(this.asistenciaActividad.NumeroIdentificacion)
        .subscribe(
          (result) => {
            
             let bandera: Boolean = false;
            // bandera = result['OperacionExitosa'];
              debugger;
              if(result.NumeroIdentificacion != null){
                this.asistenciaActividad = result;
                this.asistenciaActividad.NumeroIdentificacion = numeroIdentificacion ;
                this.asistenciaActividad.ActividadId = actividadId;
              }
              
  
            // bandera = result['OperacionExitosa'];
            // if (!result['OperacionExitosa']) {
            //   Swal.fire('Alerta', result['Mensaje'], 'error');
            //   this.asistenciaActividad.NumeroIdentificacion = '';
            // }
            
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

    inicializarAvanceCompromiso(id) {
      this.asistenciaActividad = {
        AsistenciaActividadId: null,
        ActividadId: id,
        AvanceCualitativo: '',
        AvanceCuantitativo: null,
        EstadoId: null,
        FechaActualiza: '',
        FechaRegistra: '',
        UsuarioRegistra: null,
        ArchivoId: null,
        TipoActorId: null,
        CargoRolPerfil: '',
        TipoDocumentoId: null,
        NumeroIdentificacion: '',
        NombreCompleto: '',
        OcupacionId: null,
        NivelEscolaridadId: null,
        VictimaConflicto: null,
        Edad: null,
        LenguaMaternaId: null,
        NumeroDocumentoAcompanante: '',
        NombreAcompanante: '',
        IdPadre: null,
        GrupoEtareoId: null,
        IdentidadGeneroId: null,
        IdentidadEtnicoId: null,
        Discapacidad: null,
        CorreoElectronico: '',
        RecibioPublicacion: null,
        NombrePublicacion: '',
        EnlaceLiderazgoCoordinacion: '',
        QueHaceElActor: '',
        PaisId: null,
        MunicipioId: null,
        NombreCompletoRepresentalteLEgal: '',
        TipoDocumentoRepresentalteLegalId: null,
        NumeroIdentificacionRepresentanteLegal: '',
        CorreoElectronicoRepresentanteLegal: '',
        AnoEntidadId: null,
        DireccionEntidad: '',
        CorreoElectronicoEntidad: '',
        TelefonoEntidad: '',
        MunicipioEntidadId: null,
        PaginaWebEntidad: '',
        CentroPobladoId: null,
        CabeceraMunicipal: null,
        AreaRural: null,
        Comuna: '',
        Corregimiento: '',
        Vereda: '',
        TerritorioColectivo: '',
        Resguardo: '',
        ActorGeneroHechoId: null,
        TipoHechoVictimizanteId: null,
        TipoDiscapacidadId: null,
        CiudadResidencia: '',
        DepartamentoId: null,
        DireccionFisica: '',
        HoraActividad: '',
        HoraLimite: '',
        SegundaLenguaId: null,
        FechaNacimiento: '',
        NumeroTelefonico: '',
        SegundoCorreoElectronico: '',
        SegundoNumeroTelefonico:'',
        NumeroIdentificacionConfirmar: '',
        OrientacionSexualId: null,
        TipoDireccionId: null,
        ClasificacionId: null,
        AnoConstitucionId: null,
        TipoDocumentoAcompananteId: null,
        TipoOrganizacionPerteneceId: null,
        PerteneceOrganizacionVictimas: null,
        NombreOrganizacionPertenece: null,
        VeredaLocalidadCorregimientoResguardoBarrio:'',
        Objetos: null,
        OtroTipoOrganizacion:'',
        TieneNumeroIdentificacion: false,
        CargoRolPerfilId: null,
        
      };
    }

    borrarAvanceCompromiso(AsistenciaActividadId, ActividadId ) {
      
      console.log(ActividadId);
      Swal.fire({
        title: 'Borrar Asistencia Actividad?',
        text: 'Ese proceso no se podra revertir!',
        // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar Esto!',
      }).then((result) => {
        if (result.value) {
          this._actividadService.deleteAsistenciaActividad(AsistenciaActividadId, ActividadId).subscribe(
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
             
              this.CargarCompromisosAvances(ActividadId);
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

    cambioCkedTieneDocumento() {
      this.asistenciaActividad.TieneNumeroIdentificacion = !this.asistenciaActividad.TieneNumeroIdentificacion;
      this.tieneNumeroIdentificacion = this.asistenciaActividad.TieneNumeroIdentificacion;
      if(!this.asistenciaActividad.TieneNumeroIdentificacion){
        this.asistenciaActividad.NumeroIdentificacion = '';

      }
      
    }


    showAccionCompromisoAvance(id: number, accion: string) {
      
      this.asistenciaActividad.ActividadId = id;
      if(accion === 'C'){
        this.inicializarAvanceCompromiso(id);
      }
      else if (accion === 'U') {
        this._actividadService
        .getAsistenciaActividadByAsistenciaActividadId(id)
        .subscribe((resp: any) => {
          
          this.asistenciaActividad = resp;
          this.asistenciaActividad.NumeroIdentificacionConfirmar = this.asistenciaActividad.NumeroIdentificacion;
          this.asistenciaActividad.ActividadId = id;
          //this.asistenciaActividad.TipoDireccion = 1;
          this.mostrarMunicipiosRecidencia();
          
        });
       }
      this.accionCompromiso = accion;
      this.popupCompromisosAvances = true;
    }

    showVolverAvance() {
      this.popupCompromisosAvances = false;
    }

    getAnos() {
      this._tipoReferenciaService.getValorReferenciaPorTipoValorId(16).subscribe(
          result => {
              this.AnosLista = result.Lista;
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

    getPaises() {
      this._tipoReferenciaService.getPaises().subscribe(
        (result) => {
          this.paisesLista = result.Lista;
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

    getDep() {
      this._tipoReferenciaService.getDepartamentos().subscribe(
        (result) => {
          
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
      this._actividadService.getAllActividades(this.AnoId)
      .subscribe((resp: any) => {
          this.actividades = resp.Lista;
          
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
  
      this.asistenciaActividades = [];
    }

    CargarCompromisosAvances( id: any) {
      this._actividadService.getAllAsistenciaActividades(id).subscribe((resp: any) => {
        this.asistenciaActividades = resp.Lista;
      });
    }

    CargarProcesoAvances(id:any){
       // this._actividadService.getAllProcesosServices(id).((resp: any) => {
        //this._actividadService.getAllProcesosServices(id).subscribe((resp: any) => {
      //  this.procesosActividades = resp.Lista;
      // });
      let data = [
      {"procesosActividadId":1, "ActividadId": 32,"fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "D. Acuerdos de la Verda",  "TipoProcesoASociado": "Proyecto de apropiación social", "ArticuladoCon":"Museos"},
      {"procesosActividadId":2, "ActividadId": 32,"fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "D Construcción ",  "TipoProcesoASociado": "Asistente evento", "ArticuladoCon":"Construccion de Memoria"},
      {"procesosActividadId":3, "ActividadId": 2105,"fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "D. Archivo y DDHH ",  "TipoProcesoASociado": "tallerista / facilitador", "ArticuladoCon":"Museos"},
      {"procesosActividadId":4, "ActividadId": 2105,"fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "D. Museo de Memoria ",  "TipoProcesoASociado": "Asistente evento", "ArticuladoCon":"Construccion de Memoria"},
      {"procesosActividadId":5, "ActividadId": 2105,"fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "Pedagogía",  "TipoProcesoASociado": "Proyecto de apropiación social", "ArticuladoCon":"Construccion de Memoria"},
      {"procesosActividadId":6, "ActividadId": 1066,"fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "D. Museo de Memoria ",  "TipoProcesoASociado": "Asistente evento", "ArticuladoCon":"Construccion de Memoria"},
      {"procesosActividadId":7, "ActividadId": 1066,"fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "Pedagogía",  "TipoProcesoASociado": "Proyecto de apropiación social", "ArticuladoCon":"Construccion de Memoria"},    
      {"procesosActividadId":8, "ActividadId": 1066,"fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "D Construcción ",  "TipoProcesoASociado": "Asistente evento", "ArticuladoCon":"Construccion de Memoria"}
    ] ;
        data=data.filter(d=>d.ActividadId===id)
        this.procesosActividades =data
    }
    
   borrarProcesoActividad(id:any){
       console.log(id)

      
      

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
          this.procesosActividades =  this.procesosActividades.filter(d=>d.procesosActividadId!==id);
          let resultado = true
              if(resultado)
              {
                Swal.fire('Borrado!', 'Este registro fue borrado.', 'success');
              }
              else
              {
                Swal.fire('ERROR!', 'Existen avances registrados, por favor borrar primero los avances', 'error');
              }
            }
        }
      );

    }


    onSubmitCompromiso(isValid: any){
      if (isValid) {

          
        this.actividad.UsuarioRegistraId = this.usuId;
          // if (this.accionCompromiso === 'U') {
          //   this.compromiso.FechaActualizada = Date..now().toString();
          // } else {
          //   this.compromiso.FechaRegistro = Date.now().toString();
          // }
          this._actividadService
            .addActividad(this.actividad)
            .subscribe((resp) => {
              this.popupCompromisos = false;
              this.getAllCompromisos();
              this.asistenciaActividades = [];
              this.procesosActividades = [];
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
      this._tipoReferenciaService.getValorReferenciaPorTipoValorIdPadre(this.actividad.AreaId).subscribe(
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
        this._actividadService
        .getActividadByActividadId(id)
        .subscribe((resp: any) => {
          this.actividad = resp;
          this.mostrarMunicipios();
          this.getAreas();
        });
       }
      this.accionCompromiso = accion;
      this.popupCompromisos = true;
    }

    borrarCompromiso(ActividadId) {
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
          this._actividadService.deleteActividad(ActividadId).subscribe(
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
      this.actividad = {
        ActividadId: null,
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
        FechaActividad: '',
        FechaLimite: '',
        Observaciones: '',
        UsuarioResponsableReporteId: null,
        UsuarioRegistraId: null,
        FechaRegistro: '',
        FechaActualizada: '',
        DepartamentoId: null,
        tipoActividadId: null,
        NumeroAsistentes: null,
      };
    }
  
    limpiarCamposLugarResidencia() {
      this.asistenciaActividad.CiudadResidencia = '';
      this.asistenciaActividad.DepartamentoId = null;
      this.asistenciaActividad.MunicipioId = null;
    }

    mostrarMunicipios() {
      this._tipoReferenciaService
        .getMunicipiosByDepartamento(this.actividad.DepartamentoId)
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

    mostrarMunicipiosRecidencia() {
      this._tipoReferenciaService
        .getMunicipiosByDepartamento(this.asistenciaActividad.DepartamentoId)
        .subscribe(
          (result) => {
            this.munListaRecidencia = result.Lista;
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

    cargarTiposIdentificacion() {
      this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_TIPO_DOC_IDENTIFICACION')
      .subscribe(
        (result) => {
          
          this.tipoDoc = result.Lista;
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

    cargarPerilCargo() {
      this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_CARGO')
      .subscribe(
        (result) => {
          
          this.tipoCargo = result.Lista;
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

    cargarClasificacion() {
      this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_CLASIFICACION')
      .subscribe(
        (result) => {
          
          this.tipoClasificacion = result.Lista;
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

    cargarTiposOcupacion() {
      this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_OCUPACION')
      .subscribe(
        (result) => {
          
          this.tipoOcupacion = result.Lista;
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

    cargarTiposNivelEscolaridad() {
      this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_NIVEL_ESCOLARIDAD')
      .subscribe(
        (result) => {
          
          this.tipoNivelEscolaridad = result.Lista;
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

    cargarActorGeneraHecho() {
      this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_ACTOR_GENERA_HECHO')
      .subscribe(
        (result) => {
          
          this.tipoActorGeneraHecho = result.Lista;
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

    cargarHechoVictimizante() {
      this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_HECHO_VICTIMIZANTE')
      .subscribe(
        (result) => {
          
          this.tipoHechoVictimizante = result.Lista;
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

    cargarLenguaMaterna() {
      this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_LENGUA_MATERNA')
      .subscribe(
        (result) => {
          
          this.tipoLenguaMaterna = result.Lista;
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

    cargarOrientacionSexual() {
      this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_ORIENTACION_SEXUAL')
      .subscribe(
        (result) => {
          
          this.tipoOrientacionSexual = result.Lista;
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

    

    cargarGrupoEtareo() {
      this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_GRUPO_ETAREO')
      .subscribe(
        (result) => {
          
          this.tipoGrupoEtareo = result.Lista;
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

    
    
    

    cargarIdentidadGenero() {
      this._tipoReferenciaService
        .getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_IDENTIDAD_GENERO')
        .subscribe(
          (result) => {
            
            this.listaIdentidadGenero = result.Lista;
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

    cargarIdentidadEtnica() {
      this._tipoReferenciaService
        .getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_IDENTIDAD_ETNICA')
        .subscribe(
          (result) => {
            
            this.listaIdentidadEtnica = result.Lista;
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

    cargarDiscapacidad() {
      this._tipoReferenciaService
        .getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_DISCAPACIDAD')
        .subscribe(
          (result) => {
            
            this.tipoDiscapacidad = result.Lista;
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

    cargarTiposActor() {
      this._tipoReferenciaService
        .getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_ACTOR')
        .subscribe(
          (result) => {
            
            this.listaTiposActor = result.Lista;
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
      this._actividadService.getUsuariosInternos()
      .subscribe((resp: any) => {
        
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
  
      this.asistenciaActividades = [];
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

    cargarListaVias()
    {
      this._tipoReferenciaService
        .getValorReferenciaPorTipoValorNombre('MA_MUSEO_VIAS')
        .subscribe(
          (result) => {
            
            this.ListaVias = result.Lista;
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


    armarDireccion(e){
      //console.log(e);
      let via = $('.direcc0').val();
      let num1 = $('.direcc1').val();
      let Letra0 = $('.direcc5').val();
      let Letra1 = $('.direcc6').val();
      let Letra7 = $('.direcc7').val();
      let Letra8 = $('.direcc8').val();
      let num2 = $('.direcc2').val();
      let num3 = $('.direcc3').val();
      let num4 = $('.direcc4').val();
      //let otro = $('.direcc4').val();
  
      if(num1 != ""){
        num1 = " "+num1;
      }
      if(Letra0 != ""){
        Letra0 = " "+Letra0;
      }

      if(Letra7 != ""){
        Letra7 = " "+Letra7;
      }

      if(Letra8 != ""){
        Letra8 = " "+Letra8;
      }

      
      

      if(num4 != ""){
        num4 = " - "+num4;
      }
      if(num2 != ""){
        num2 = " "+num2;
      }
      if(num3 != ""){
        num3 = " # "+num3;
      }
      /*if(otro != ""){
        otro = ", "+otro;
      }*/
  
      //$('.direcc').val(via+num1+num2+num3+otro);
      //this.asistenciaActividad.DireccionFisica = (via+num1+num2+num3/+otro/);
      this.asistenciaActividad.DireccionFisica = (via+num1+Letra0+num2+Letra7+num3+Letra1+num4+Letra8);
    }

    armarComplemento(){
      //console.log(e);
      let num1 = $('.direcc9').val();
      let num2 = $('.direcc10').val(); 
      //let otro = $('.direcc4').val();
  
      if(num1 != ""){
        num1 = " "+num1;
      }
      
      if(num2 != ""){
        num2 = " "+num2;
      }
      /*if(otro != ""){
        otro = ", "+otro;
      }*/
  
      //$('.direcc').val(via+num1+num2+num3+otro);
      //this.asistenciaActividad.DireccionFisica = (via+num1+num2+num3/+otro/);
      this.asistenciaActividad.DireccionFisica = this.asistenciaActividad.DireccionFisica+(num1+num2);
    }
  

}

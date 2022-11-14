import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  Entidad,
  OtrosCamposdeAccion,
  EntidadExperiencia,
  Documentos,
} from 'src/app/models/entidad.model';
import { IOption } from 'ng-select';
import { ValorReferencia } from '../../models/valorReferencia.model';
import { TipoReferenciaService } from '../../services/tipoReferencia/tipo-referencia.service';
import { EntidadService } from '../../services/entidades/entidad.service';
import { URL_SERVICIOS } from '../../config/config';
import DataSource from 'devextreme/data/data_source';
import Swal from 'sweetalert2';
import {
  OtrasAreasCamposAccion,
  Salas,
  Proyectos,
  Funciones,
  Cronogramas,
  Presupuestos,
} from '../../models/entidad.model';
import ArrayStore from 'devextreme/data/array_store';
import { OtrasAreas } from 'src/app/models/agente.model';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { UsuarioService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';
import { Session } from '../../models/session.model';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.css'],
})
export class EntidadesComponent implements OnInit {
  @ViewChild('ngxLoading', {
    static: false,
  })
  ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', {
    static: false,
  })
  customLoadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = PrimaryRed;
  public secondaryColour = SecondaryBlue;
  public coloursEnabled = true;

  // #region Variables Globales
  public loadingTemplate: TemplateRef<any>;

  // tslint:disable-next-line: max-line-length
  public config = {
    animationType: ngxLoadingAnimationTypes.none,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: '3px',
  };

  loading = false;

  ocultoExperiencia = 'oculto';
  ocultoDocumento = 'oculto';
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  descripcionDocumento: string;
  tipoExperienciaLista: Array<IOption>;
  listaEntidadesExperiencia = [];
  displayListAgenteExperiencia: boolean;
  valueExperiencia: any[] = [];
  valueProyectoDocumento: any[] = [];
  urlImagenExperiencia: string;
  entidadExperiencia: EntidadExperiencia;
  sala: Salas;
  proyecto: Proyectos;
  funcion: Funciones;
  cronograma: Cronogramas;
  presupuesto: Presupuestos;
  documento: Documentos;
  displayCrearAgenteExperiencia: boolean;
  listaEntidades = [];

  displayListEntidad: boolean;
  displayEntidadAreas: boolean;
  displayCrearEntidad: boolean;
  displayCrearEntidadSalas: boolean;

  validarFechaProyecto: boolean;

  entidad: Entidad;
  tipoDoc: Array<IOption>;
  depLista: Array<IOption>;
  depListaSalas: Array<IOption>;
  depListaProyecto: Array<IOption>;
  depListaFuncion: Array<IOption>;
  depListaProyectoFuncion: Array<IOption>;
  munLista: Array<IOption>;
  munListaSalas: Array<IOption>;
  munListaProyecto: Array<IOption>;
  munListaFuncion: Array<IOption>;
  munListaProyectoFuncion: Array<IOption>;
  areaLista: Array<IOption>;
  caracterLista: Array<IOption>;
  paisesLista: Array<IOption>;
  paisesListaFuncion: Array<IOption>;
  paisesListaProyectoFuncion: Array<IOption>;
  tipoEntidadLista: Array<IOption>;
  tipoNaturalezaLista: Array<IOption>;
  listaModalidad: Array<IOption>;
  listaTenenciaInmueble: Array<IOption>;
  listaCuentaBancaria: Array<IOption>;
  listaRegimenTributario: Array<IOption>;
  listaDisciplinaArtistica: Array<IOption>;
  listaDisciplinaArtisticaProyectoFuncion: Array<IOption>;
  origenInfoLista: Array<IOption>;
  listaProyectoTipoDocumento: Array<IOption>;
  listaTipoEstadoProyecto: Array<IOption>;

  ocupacionLista: Array<ValorReferencia>;
  listaFuncionRealizada: Array<ValorReferencia>;
  listaFuncionAbierta: Array<ValorReferencia>;
  listaFuncionGrupoPlanta: Array<ValorReferencia>;
  listaSalaProgramacionPermanente: Array<ValorReferencia>;
  listaSalaConcertadaNacionalTerritoria: Array<ValorReferencia>;
  listaSalaBeneficiariaLEP: Array<ValorReferencia>;
  listaEntidadInfraestructuraCultural: Array<ValorReferencia>;

  listaProyectoFuncionRealizada: Array<ValorReferencia>;
  listaProyectoFuncionAbierta: Array<ValorReferencia>;
  listaProyectoFuncionGrupoPlanta: Array<ValorReferencia>;

  listaEntidadResponsableICA: Array<ValorReferencia>;

  checkedList = [];
  munNacimientoLista: Array<IOption>;
  ZON_ID_DEP: string;
  DepartamentoId: string;
  tituloVariable: string;
  operacion = 'C';
  title: string;
  value: any[] = [];
  url: string;
  error: any;
  urlImagen: string;
  urlDocumento: string;
  EstiloStep1: string;
  EstiloStep2: string;
  EstiloStep3: string;
  EstiloStep4: string;
  registro: boolean;
  experiencia: boolean;
  salas: boolean;
  proyectos: boolean;
  funciones: boolean;
  tasks: DataSource;
  tasks1 = [];
  datos = [];
  otrasCamposAccion: OtrosCamposdeAccion[];
  selectedItemsAreaPrincipal: any[] = [];
  usuario: User;
  usuarioNombre: string;
  email: string;
  roles: any;
  role: string;
  usuId: number;
  perfilId: number;
  currentSession: Session;
  gestionaActores: boolean;
  EstadoLista: Array<IOption>;

  listaEntidadSala = [];
  listaProyectosSala = [];
  listaFuncionSala = [];
  listaProyectoFuncion = [];
  listaProyectoCronograma = [];
  listaProyectoPresupuesto = [];
  listaProyectoDocumento = [];

  displayListaFuncionProyecto: boolean;
  displayProyectoCronograma: boolean;
  displayProyectoPresupuesto: boolean;
  displayProyectoDocumento: boolean;
  displayListEntidadSalas: boolean;
  displaySala: boolean;
  displayListaProyectos: boolean;
  displayListaFuncion: boolean;
  accionFuncion: string;
  accionProyectoFuncion: string;
  accionProyecto: string;
  accionProyectoDocumento: string;
  public dataSourceOtrasOcupaciones: OtrasAreasCamposAccion[];
  otrasAreas: OtrasAreas[] = [
    {
      OtrasAreasId: 5715,
      nombre: 'Teatro',
    },
    {
      OtrasAreasId: 5716,
      nombre: 'Circo',
    },
  ];

  popupVisibleProyecto: boolean = false;
  popupVisibleFuncion: boolean = false;
  popupVisibleFuncionProyecto: boolean = false;
  popupVisibleProyectoDocumento: boolean = false;
  displayEstadoProyecto: boolean = false;

  startEditAction: string = 'click';
  selectTextOnEditStart: boolean = true;

  // #endregion

  // #region constructor
  // tslint:disable-next-line:max-line-length
  constructor(
    public _entidadService: EntidadService,
    public _tipoReferenciaService: TipoReferenciaService,
    public _usuarioService: UsuarioService
  ) {
    this.displayCrearAgenteExperiencia = false;
    this.displayListAgenteExperiencia = true;
    this.dataSourceOtrasOcupaciones = [];
    this.selectedItemsAreaPrincipal = [];
    this.datos = [];
    this.displayListEntidad = true;
    this.displayCrearEntidad = false;
    this.displayEntidadAreas = false;
    this.registro = true;
    this.experiencia = false;

    this.displayCrearEntidadSalas = false;
    this.displayListEntidadSalas = true;
    this.displayListaProyectos = false;
    this.displayListaFuncionProyecto = false;
    this.displayProyectoCronograma = false;
    this.displayProyectoDocumento = false;

    // Ocultar pestaña Sala de teatro
    this.displaySala = false;
    this.salas = false;
    this.EstiloStep1 = 'active';
    this.EstiloStep2 = '';
    this.checkedList = [];
    this.sala = new Salas(
      null,
      null,
      '',
      '',
      '',
      '',
      '',
      null,
      '',
      '',
      '',
      null,
      null,
      '',
      '',
      '',
      '',
      null,
      null,
      null,
      null,
      '',
      '',
      ''
    );
    this.proyecto = new Proyectos(
      null,
      null,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      null,
      '',
      null,
      '',
      '',
      '',
      '',
      '',
      '',
      null,
      '',
      '',
      '',
      '',
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      '',
      '',
    );
    this.funcion = new Funciones(
      null,
      null,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      null,
      null,
      null,
      null,
      null,
      '',
      '',
      '',
      null,
      null,
      null,
      null
    );
    this.entidad = new Entidad(
      null,
      null,
      '',
      '',
      null,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      null,
      null,
      null,
      '',
      198,
      null,
      '',
      '',
      '',
      '',
      '',
      null,
      '',
      null,
      null,
      '',
      null,
      ''
    );
    this.cronograma = new Cronogramas(
      null,
      null,
      '',
      '',
      '',
      '',
      '',
      null,
      null
    );

    this.presupuesto = new Presupuestos(null, null, '', '', '');
    this.documento = new Documentos(
      null,
      null,
      null,
      '',
      '',
      null,
      null,
      '',
      null,
      null
    );

    const user: any = this._usuarioService.getCurrentUser();
    this.usuario = JSON.parse(user);
    this.usuarioNombre = this.usuario.USU_NOMBRE;
    this.email = this.usuario.USU_CORREO_ELECTRONICO;
    this.usuId = this.usuario.USU_ID;
    this.roles = this.usuario.Perfiles;
    if (this.roles.length > 0) {
      this.role = this.roles[0].PER_NOMBRE;
      this.perfilId = this.roles[0].PER_ID;
      if (this.roles[0].GestionaEntidades !== null) {
        if (this.roles[0].GestionaEntidades) {
          this.gestionaActores = this.roles[0].GestionaEntidades;
          // this.oculto = '';
        } else {
          // this.oculto = 'oculto';
          this.gestionaActores = false;
        }
      } else {
        this.gestionaActores = false;
      }
    }
    this.getFilteredOcupaciones = this.getFilteredOcupaciones.bind(this);
  }
  // #endregion

  addIdParameter(e) {
    this.url = URL_SERVICIOS + '/ApiRest/Entidad/MediaUpload';
  }

  showPanel2(sw: string, id: any) {
    this.registro = false;
    this.experiencia = false;
    this.salas = false;

    if (sw === 'R') {
      // Crear Usuario
      this.registro = true;
      this.EstiloStep1 = 'active';
      this.EstiloStep2 = '';
      this.EstiloStep3 = '';
      this.EstiloStep4 = '';
    } else if (sw === 'P' && this.entidad.EntidadId != null) {
      // Actualizar Usuario
      this.experiencia = true;
      this.EstiloStep1 = 'complete';
      this.EstiloStep2 = 'active';
      this.EstiloStep3 = '';
      this.EstiloStep4 = '';
    } else if (sw === 'O' && this.entidad.EntidadId != null) {
      // Volver al listado
      this.salas = true;
      this.EstiloStep1 = 'complete';
      this.EstiloStep2 = 'complete';
      this.EstiloStep3 = 'active';
      this.EstiloStep4 = '';
    } else if (this.entidad.EntidadId === null) {
      this.registro = true;
    }
  }

  cargarEstado() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorId(3083)
      .subscribe(
        (result) => {
          debugger;
          this.EstadoLista = result.Lista;
        },
        (error) => {
          // this.error = error;
          // if (error.statusText === 'Unauthorized') {listaPublicoDir
          //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          //     this.authenticationService.logout().subscribe(response => { });
          //     this.storageService.logout();
          // }
          console.log(<any>error);
        }
      );
  }

  showPanelExperiencia(sw: string, id: any) {
    if (sw === 'C') {
      // Crear Experiencia
      this.displayListAgenteExperiencia = false;
      this.displayCrearAgenteExperiencia = true;
      this.inicializarModeloExperiencia();
    } else if (sw === 'U') {
      // Actualizar Experiencia
      this.displayListAgenteExperiencia = false;
      this.displayCrearAgenteExperiencia = true;
      this.getAgenteExperienciaById(id);
      this.operacion = 'U';
    } else if (sw === 'V') {
      // Volver al listado de Experiencia
      this.displayListAgenteExperiencia = true;
      this.displayCrearAgenteExperiencia = false;
      this.inicializarModeloExperiencia();
      // recargar la tabla
      this.cargarAgentesExperiencia(this.entidad.EntidadId);
    }
  }

  getAgenteExperienciaById(id: any) {
    this._entidadService.getAgenteExperienciaByAgenteId(id).subscribe(
      (result) => {
        this.entidadExperiencia = result;
        this.urlImagenExperiencia = this.entidadExperiencia.Fotografia;
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

  cargarAgentesExperiencia(id: number) {
    this._entidadService.cargarAgentesExperiencia(id).subscribe((resp: any) => {
      this.listaEntidadesExperiencia = resp.Lista;
    });
  }

  onSubmitExperiencia(isValid: any, paso: any) {
    // debugger;
    if (this.entidadExperiencia.Fotografia === '') {
      Swal.fire(
        'Mensaje',
        'Debe Seleccionar el archivo y hacer clic en el boton subir archivo',
        'error'
      );
      return;
    }
    let incorrecto = false;
    let fechaInicio: any;
    const arrayFI: Array<string> = this.entidadExperiencia.EntidadExperienciaFechaInicio.split(
      '/'
    );
    fechaInicio = arrayFI[3083] + '/' + arrayFI[0] + '/' + arrayFI[2];
    let fechaFin: any;
    const arrayFF: Array<string> = this.entidadExperiencia.EntidadExperienciaFechaFin.split(
      '/'
    );
    fechaFin = arrayFF[1] + '/' + arrayFF[0] + '/' + arrayFF[2];
    if (arrayFI[2] > arrayFF[2]) {
      incorrecto = true;
    } else if (arrayFI[2] === arrayFF[2] && arrayFI[1] > arrayFF[1]) {
      incorrecto = true;
    } else if (
      arrayFI[2] === arrayFF[2] &&
      arrayFI[1] === arrayFF[1] &&
      arrayFI[0] > arrayFF[0]
    ) {
      incorrecto = true;
    } else {
      incorrecto = false;
    }
    if (incorrecto) {
      alert(
        'la fecha fin: ' +
          this.entidadExperiencia.EntidadExperienciaFechaFin +
          ' no puede ser menor a la fecha de inicio' +
          fechaInicio
      );
      this.entidadExperiencia.EntidadExperienciaFechaFin = '';
    } else {
      if (isValid) {
        this.entidadExperiencia.EstadoRevisionId = 1221;
        this._entidadService
          .crearAgenteExperiencia(this.entidadExperiencia)
          .subscribe((resp) => {
            this.showPanelExperiencia('V', null);
          });
      }
    }
  }

  CambioFechaExperiencia(e: string) {
    let incorrecto = false;
    let fechaInicio: any;
    const arrayFI: Array<string> = this.entidadExperiencia.EntidadExperienciaFechaInicio.split(
      '/'
    );
    fechaInicio = arrayFI[1] + '/' + arrayFI[0] + '/' + arrayFI[2];
    let fechaFin: any;
    const arrayFF: Array<string> = e.split('/');
    fechaFin = arrayFF[1] + '/' + arrayFF[0] + '/' + arrayFF[2];
    if (arrayFI[2] > arrayFF[2]) {
      incorrecto = true;
    } else if (arrayFI[2] === arrayFF[2] && arrayFI[1] > arrayFF[1]) {
      incorrecto = true;
    } else if (
      arrayFI[2] === arrayFF[2] &&
      arrayFI[1] === arrayFF[1] &&
      arrayFI[0] > arrayFF[0]
    ) {
      incorrecto = true;
    } else {
      incorrecto = false;
    }

    if (incorrecto) {
      alert(
        'la fecha fin: ' +
          e +
          ' no puede ser menor a la fecha de inicio ' +
          fechaInicio
      );
      e = '';
      this.entidadExperiencia.EntidadExperienciaFechaFin = '';
    }
  }

  subidaCompletaPdfExperiencia(e: {
    request: {
      status: number;
      response: string;
    };
  }) {
    if (e.request.status === 201) {
      const obj = JSON.parse(e.request.response);
      console.log(obj.Message.split('|')[1]);
      this.entidadExperiencia.Fotografia = obj.Message.split('|')[1];
      this.urlImagenExperiencia =
        URL_SERVICIOS + '/Medios/Agentes/' + obj.Message.split('|')[1];
      setTimeout(() => {
        // swal('Archivo cargado', 'Los datos se han subido correctamente!', 'success' );
        Swal.fire(
          'Archivo cargado!',
          'Los datos se han subido correctamente!.',
          'success'
        );
      }, 15);
    } else {
      setTimeout(() => {
        // swal('ERROR', 'Los datos NO se han subido correctamente!', 'success' )
        Swal.fire(
          'ERROR!',
          'Los datos NO se han subido correctamente!',
          'error'
        );
      }, 15);
    }
  }

  addIdParameterPdf(e: any) {
    this.url = URL_SERVICIOS + '/ApiRest/Agente/MediaUploadPdf';
  }

  descargarArchivoExperiencia() {
    if (this.entidadExperiencia.EntidadExperienciaId !== null) {
      this.loading = true;
      this._entidadService
        .downloadMediosExperienciaById(
          this.entidadExperiencia.EntidadExperienciaId
        )
        .subscribe(
          (res) => {
            console.log('start download:', res);
            const url = window.URL.createObjectURL(res);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = 'archivo.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove(); // remove the element
            this.loading = false;
          },
          (error) => {
            this.error = error;
            this.loading = false;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('TYC', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(<any>error);
          }
        );
    }
  }

  borrarEntidad(id) {
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
        this._entidadService.deleteEntidad(id).subscribe(
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
            this.cargarEntidades();
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

  borrarEntidadExperiencia(id: any) {
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
        this._entidadService.deleteEntidadExperiencia(id).subscribe(
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
            this.cargarAgentesExperiencia(this.entidad.EntidadId);
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

  ngOnInit() {
    this.cargarEntidades();
    this.cargarAreas();
    this.cargarTiposEntidad();
    this.cargarTiposNaturaleza();
    this.getDep();
    this.cargarTiposIdentificacion();
    this.getPaises();
    this.cargarTiposOcupacionOtros();
    this.cargarTipoExperiencia();
    this.cargarEstado();
    this.cargarSalaTenenciaInmueble();
    this.cargarSalaModalidad();
    this.cargarSalaBeneficiariaLEP();
    this.cargarSalaConcertadaNacionalTerritoria();
    this.cargarSalaProgramacionPermanente();
    this.cargarEntidadInfraestructuraCultural();
  }

  aprobarEntidad(id: any) {
    Swal.fire({
      title: 'Cambiar estado de la entidad?',
      text: 'Este proceso cambiara el estado del registro!',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiar de estado!',
    }).then((result) => {
      this.loading = true;
      this._entidadService
        .cambiarEstadoEntidad(this.entidad)
        .subscribe((resp) => {
          this.entidad.EntidadId = this._entidadService.EntidadId;
          this.loading = false;
        });

      if (result.value) {
        Swal.fire(
          'Cambio de estado!',
          'su registro cambiado de estado.',
          'success'
        );
      }
    });
  }

  cargarTipoExperiencia() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorId(50).subscribe(
      (result) => {
        this.tipoExperienciaLista = result.Lista;
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
    // Alcibiades
    // Ocultar pestaña sala teatro
    debugger;
    if (Number(this.entidad.AreaId) === 5715) {
      this.tituloVariable = 'Sala de teatro';
      this.displaySala = true;
    } else if (Number(this.entidad.AreaId) === 5716) {
      this.tituloVariable = 'Carpa';
      this.displaySala = true;
    } else {
      this.displaySala = false;
    }

    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorIdPadre(this.entidad.AreaId)
      .subscribe(
        (result) => {
          this.ocupacionLista = result.Lista;
          const resultArray = this.ocupacionLista.map((elm) => ({
            id: elm.idValorReferencia,
            text: elm.nombre,
          }));
          this.tasks = new DataSource({
            store: new ArrayStore({
              key: 'id',
              data: resultArray,
            }),
          });
          this.datos = this.entidad.TipoCampoAccion;
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

  cargarTiposOcupacionOtros() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorId('3081')
      .subscribe(
        (result) => {
          // tslint:disable-next-line:max-line-length
          this.otrasCamposAccion = result.Lista.map((elm) => ({
            TipoCampodeAccionId: elm.idValorReferencia,
            nombre: elm.nombre,
            OtrasAreasId: elm.idValorReferenciaPadre,
          }));
          // console.log(this.ocupacionLista);
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

  limpiarCampos() {
    this.entidad.EntidadCiudadUbicacion = '';
    this.entidad.DepartamentoId = null;
    this.entidad.MunicipioId = null;
  }

  getPaises() {
    this._tipoReferenciaService.getPaises().subscribe(
      (result) => {
        this.paisesLista = result.Lista;
        this.paisesListaFuncion = result.Lista;
        this.paisesListaProyectoFuncion = result.Lista;
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

  onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.checkedList.push(option.idValorReferencia);
    } else {
      for (let i = 0; i < this.areaLista.length; i++) {
        if (this.checkedList[i] === option.idValorReferencia) {
          this.checkedList.splice(i, 1);
        }
      }
    }
    console.log(this.checkedList);
  }

  cargarEntidades() {
    this._entidadService.cargarEntidades().subscribe((resp: any) => {
      debugger;
      this.listaEntidades = resp.Lista;
    });
  }

  getDep() {
    this._tipoReferenciaService.getDepartamentos().subscribe(
      (result) => {
        // debugger;
        this.depLista = result.Lista;
        this.depListaSalas = result.Lista;
        this.depListaProyecto = result.Lista;
        this.depListaFuncion = result.Lista;
        this.depListaProyectoFuncion = result.Lista;
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

  showPanel(sw, id) {
    if (sw === 'CA') {
      // Crear Usuario
      this.displayEntidadAreas = false;
      this.displayCrearEntidad = true;
      this.displayListEntidad = false;
    } else if (sw === 'C') {
      // Crear Usuario
      this.displayListEntidad = false;
      this.displayCrearEntidad = true;
      this.displayEntidadAreas = false;
      this.inicializarModelo();
    } else if (sw === 'U') {
      // Actualizar Usuario
      this.displayEntidadAreas = false;
      this.displayListEntidad = false;
      this.displayCrearEntidad = true;
      this.getEntidadById(id);
      this.operacion = 'U';
    } else if (sw === 'V') {
      // Retornar al Listado
      this.displayListEntidad = true;
      this.displayCrearEntidad = false;
      this.displayEntidadAreas = false;
      this.inicializarModelo();
      // Alcibiades
      // Iniciar pestañas al retornar entidades
      // debugger;
      this.showPanel2('R', id);
      // recargar la tabla
      this.cargarEntidades();
    }
  }

  getEntidadById(id) {
    debugger;
    this._entidadService.getEntidadById(id).subscribe(
      (result) => {
        this.entidad = result;
        //   for ( let i = 0; i <  this.agente.TipoOcupacion.length; i++) {
        //     this.setPublicoDirigidoCheck(this.agente.TipoOcupacion[i]);
        // }
        this.cargarTiposOcupacion();
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:max-line-length
        this.dataSourceOtrasOcupaciones = this.entidad.OtrasAreasCampoAccion; // .map(elm => ({ AgenteOcupacionId: elm.AgenteOcupacionId, AgenteId: elm.AgenteId, OtrasAreasId: elm.OtrasAreasId, TipoOcupacionId: elm.TipoOcupacionId }));

        this.urlImagen = this.entidad.Fotografia;
        this.mostrarMunicipios();
        this.cargarAgentesExperiencia(this.entidad.EntidadId);
        this.cargarSalasPorEntidadId(this.entidad.EntidadId);
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

  onSubmit(isValid: any, paso: string) {
    // debugger;
    if (isValid) {
      // if (this.operacion === 'U') {
      //   this.tipoReferenciaService.actualizarValorReferencia(this.valorReferencia)
      //   .subscribe(resp => {
      //     this.showPanel('V', null);
      //     }
      //   );
      // } else
      // if (this.operacion === 'C') {
      //
      // this.agente.TipoOcupacion = this.checkedList;

      this.entidad.TipoCampoAccion = [];
      for (let i = 0; i < this.selectedItemsAreaPrincipal.length; i++) {
        this.entidad.TipoCampoAccion.push(
          this.selectedItemsAreaPrincipal[i].id
        );
      }

      this.entidad.OtrasAreasCampoAccion = this.dataSourceOtrasOcupaciones;

      this._entidadService.crearEntidad(this.entidad).subscribe((resp) => {
        this.entidad.EntidadId = this._entidadService.EntidadId;
      });

      this.registro = false;
      this.experiencia = false;
      this.salas = false;
      if (paso === 'R') {
        // Crear Usuario
        this.registro = true;
        this.EstiloStep1 = 'active';
        this.EstiloStep2 = '';
        this.EstiloStep3 = '';
        this.EstiloStep4 = '';
      } else if (paso === 'P') {
        // Actualizar Usuario
        this.experiencia = true;
        this.EstiloStep1 = 'complete';
        this.EstiloStep2 = 'active';
        this.EstiloStep3 = '';
        this.EstiloStep4 = '';
      } else if (paso === 'O') {
        // Volver al listado de contratistas
        // this.formacion = true;
        this.salas = true;
        this.EstiloStep1 = 'complete';
        this.EstiloStep2 = 'complete';
        this.EstiloStep3 = 'active';
        this.EstiloStep4 = '';
      }
    }
  }

  getFilteredOcupaciones(options) {
    return {
      store: this.otrasCamposAccion,
      filter: options.data
        ? ['OtrasAreasId', '=', options.data.OtrasAreasId]
        : null,
    };
  }

  onEditorPreparingOtrasOcupaciones(e) {
    if (e.parentType === 'dataRow' && e.dataField === 'TipoCampodeAccionId') {
      e.editorOptions.disabled = typeof e.row.data.OtrasAreasId !== 'number';
    }
  }

  setOtrasAreasValue(rowData: any, value: any): void {
    rowData.TipoCampodeAccionId = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }

  cargarAreas() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorId(3082)
      .subscribe(
        (result) => {
          this.areaLista = result.Lista;
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

  cargarEntidadInfraestructuraCultural() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre(
        'MA_ENTIDAD_INFRAESTRUCTURA_CULTURAL'
      )
      .subscribe(
        (result) => {
          this.listaEntidadInfraestructuraCultural = result.Lista;
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

  cargarTiposEntidad() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_TIPO_ENTIDAD')
      .subscribe(
        (result) => {
          this.tipoEntidadLista = result.Lista;
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
  cargarTiposNaturaleza() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_TIPO_NATURALEZA')
      .subscribe(
        (result) => {
          this.tipoNaturalezaLista = result.Lista;
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

  mostrarMunicipios() {
    this._tipoReferenciaService
      .getMunicipiosByDepartamento(this.entidad.DepartamentoId)
      .subscribe(
        (result) => {
          // debugger;
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

  cargarTiposIdentificacion() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorId(3).subscribe(
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

  subidaCompleta(e) {
    if (e.request.status === 201) {
      const obj = JSON.parse(e.request.response);
      console.log(obj.Message.split('|')[1]);
      this.entidad.Fotografia = obj.Message.split('|')[1];
      this.urlImagen =
        URL_SERVICIOS + '/Medios/Entidades/' + obj.Message.split('|')[1];
      setTimeout(() => {
        Swal.fire(
          'Archivo cargado',
          'Los datos se han subido correctamente!',
          'success'
        );
      }, 15);
    } else {
      setTimeout(() => {
        Swal.fire(
          'ERROR',
          'Los datos NO se han subido correctamente!',
          'success'
        );
      }, 15);
    }
  }

  // #region inicializarModelo Entidad

  inicializarModelo() {
    this.entidad = {
      EntidadId: null,
      TipoEntidadId: null,
      EntidadNombre: '',
      EntidadFechaCreacion: '',
      EntidadNaturalezaId: null,
      EntidadPrimerNombreResponsable: '',
      EntidadSegundoNombreResponsable: '',
      EntidadPrimerApellidoResponsable: '',
      EntidadSegundoApellidoResponsable: '',
      EntidadTelefonoResponsable: '',
      EntidadCelularResponsable: '',
      EntidadEmailResponsable: '',
      EntidadResena: '',
      EntidadDireccion: '',
      EntidadTelefonoFijo: '',
      EntidadTelefonoMovil: '',
      EntidadPaginaWeb: '',
      EntidadEmail: '',
      EntidadDescripcion: '',
      EntidadClasificacion: '',
      EntidadClasificacionOtro: '',
      EntidadNumIdentificacion: '',
      EntidadFecInicioActividad: '',
      EntidadNombreContacto: '',
      EntidadApellidoContacto: '',
      EntidadTelContacto: '',
      EntidadMovilContacto: '',
      EntidadEmailContacto: '',
      EntidadFechaRegistro: '',
      CuentaUsuario: '',
      EntidadFechaEdito: '',
      CuentaUsuarioEdito: '',
      EntidadObservaciones: '',
      EntidadFechaAprobacion: '',
      AreaId: null,
      DepartamentoId: null,
      MunicipioId: null,
      Fotografia: '',
      EntidadEstadoId: null,
      TipoIdentificacionId: null,
      PefilFacebook: '',
      PerfilTwitter: '',
      PerfilFlickr: '',
      CanalYoutube: '',
      PerfilInstagram: '',
      PaisIdUbicacion: null,
      EntidadCiudadUbicacion: '',
      TipoCampoAccion: null,
      OtrasAreasCampoAccion: null,
      EstadoNombre: '',
      EntidadCantidadPersonas: null,
      EntidadInfraestructuraCultural: '',
    };
    this.inicializarModeloExperiencia();
    this.inicializarModeloSalas();
    this.datos = [];
    this.selectedItemsAreaPrincipal = [];
    // this.limpiarListCheckBox();
    this.urlImagen = '';
    this.dataSourceOtrasOcupaciones = null;
    this.tasks = new DataSource({
      store: new ArrayStore({
        key: 'id',
        data: this.tasks1,
      }),
    });
  }

  inicializarModeloExperiencia() {
    this.entidadExperiencia = {
      EntidadExperienciaId: null,
      EntidadId: this.entidad.EntidadId,
      TipoExperienciaId: null,
      EntidadExperienciaActividadDesarrollada: '',
      EntidadExperienciaFechaInicio: '',
      EntidadExperienciaFechaFin: '',
      EntidadExperienciaEntidad: '',
      Fotografia: '',
      ArchivoId: null,
      EstadoRevisionId: null,
      EntidadExperienciaFechaEdito: '',
      CuentaUsuarioIdEdito: null,
      CuentaUsuarioIdCreacion: null,
      CuentaUsuarioIdGestiona: null,
      EntidadExperienciaObservaciones: '',
      NombreTipoExperiencia: '',
    };
    this.urlImagenExperiencia = '';
    this.valueExperiencia = [];
  }

  // #endregion

  // #region Salas

  showPanelEntidadSalas(sw: string, id: any) {
    //  // debugger;
    if (sw === 'C') {
      // Crear Sala
      this.displayListEntidadSalas = false;
      this.displayCrearEntidadSalas = true;
      this.displayListaProyectos = false;
      this.displayListaFuncion = false;
      this.inicializarModeloSalas();
      this.operacion = 'C';
    } else if (sw === 'U') {
      // Actualizar Sala y mostrar funciones y proyectos
      this.displayListEntidadSalas = false;
      this.displayCrearEntidadSalas = true;
      this.getSalaBysalaId(id);
      this.getAllProyectoBySala(id);
      this.getAllFuncionBySala(id);
      this.displayListaProyectos = true;
      this.displayListaFuncion = true;
      this.operacion = 'U';
    } else if (sw === 'V') {
      // Volver al listado de salas
      this.displayListEntidadSalas = true;
      this.displayCrearEntidadSalas = false;
      this.displayListaProyectos = false;
      this.displayListaFuncion = false;
      this.inicializarModeloSalas();
      // recargar la tabla
      this.cargarSalasPorEntidadId(this.entidad.EntidadId);
    }
  }

  // verificarFechaProyecto(){
  //   debugger;
  //   this.validarFechaProyecto = false;
  //   const fechaUpdate = new Date();
  //   const strFechaUpdate = fechaUpdate.toLocaleDateString();

  //   if (this.sala.FechaInicioVisualizacionProyecto < strFechaUpdate && this.sala.FechaFinVisualizacionProyecto > strFechaUpdate){
  //     this.validarFechaProyecto = true;
  //   }
  // }

  verificarFechaProyecto() {
    this._tipoReferenciaService.getTipoReferenciaById(3085).subscribe(
      (result) => {
        const fechaUpdate: Date = new Date();
        const fechaInicio: Date = new Date(result.fechaIniVigencia);
        const fechaFin: Date = new Date(result.fechaFinVigencia);
        if (fechaInicio < fechaUpdate) {
          if (fechaFin > fechaUpdate) {
            this.validarFechaProyecto = true;
          }
        }
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

  cargarSalasPorEntidadId(id: number) {
    // tslint:disable-next-line: no-// debugger
    // debugger;
    this._entidadService.getSalasByEntidad(id).subscribe((resp: any) => {
      this.listaEntidadSala = resp.Lista;
    });
  }

  inicializarModeloSalas() {
    this.sala = {
      EntidadId: this.entidad.EntidadId,
      SalaNombre: '',
      SalaId: null,
      SalaMision: '',
      SalaResenaHistorica: '',
      SalaTrayectoria: '',
      SalaDireccion: '',
      MunicipioId: null,
      SalaTelefonoMovil: '',
      SalaTelefonoFijo: '',
      SalaEmail: '',
      ModalidadSalaId: null,
      TeneciaInmubleId: null,
      SalaFechaInicioProgramacion: '',
      SalaFechaRegistro: '',
      SalaFechaAprobacion: '',
      SalaFechaEdito: '',
      CuentaUsuarioIdEdito: null,
      CuentaUsuarioIdCreacion: null,
      SalaEstadoId: null,
      DepartamentoId: null,
      SalaProgramacionPermanente: '',
      SalaConcertadaNacionalTerritoria: '',
      SalaBeneficiariaLEP: '',
    };
  }

  cargarSalaModalidad() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_SALA_MODALIDAD')
      .subscribe(
        (result) => {
          this.listaModalidad = result.Lista;
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

  cargarSalaProgramacionPermanente() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_SALA_PROGRAMACION_PERMANENTE')
      .subscribe(
        (result) => {
          this.listaSalaProgramacionPermanente = result.Lista;
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

  cargarSalaConcertadaNacionalTerritoria() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre(
        'MA_SALA_CONCERTADA_NACIONAL_TERRITORIAL'
      )
      .subscribe(
        (result) => {
          this.listaSalaConcertadaNacionalTerritoria = result.Lista;
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

  cargarSalaBeneficiariaLEP() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_SALA_BENEFICIARIA_LEP')
      .subscribe(
        (result) => {
          this.listaSalaBeneficiariaLEP = result.Lista;
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

  cargarSalaTenenciaInmueble() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_SALA_TENENCIA_INMUEBLE')
      .subscribe(
        (result) => {
          // debugger;
          this.listaTenenciaInmueble = result.Lista;
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

  mostrarMunicipiosSalas() {
    this._tipoReferenciaService
      .getMunicipiosByDepartamento(this.sala.DepartamentoId)
      .subscribe(
        (result) => {
          this.munListaSalas = result.Lista;
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

  onSubmitSala(isValid: any, paso: any) {
    if (isValid) {
      // tslint:disable-next-line: no-// debugger
      debugger;
      if (this.operacion === 'U') {
        this.sala.CuentaUsuarioIdEdito = this.usuId;
      } else {
        this.sala.CuentaUsuarioIdCreacion = this.usuId;
      }
      this._entidadService.crearSala(this.sala).subscribe((resp) => {
        this.showPanelEntidadSalas('V', null);
      });
    }
  }

  getSalaBysalaId(id: any) {
    this._entidadService.getSalaBysalaId(id).subscribe(
      (result) => {
        this.sala = result;
        this.mostrarMunicipiosSalas();
        this.verificarFechaProyecto();
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

  borrarEntidadSala(id: any) {
    Swal.fire({
      title: 'Borrar Sala?',
      text: 'Ese proceso no se podra revertir!',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Esto!',
    }).then((result) => {
      if (result.value) {
        this._entidadService.deleteSala(id).subscribe(
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
            // this.cargarS(this.entidad.EntidadId);
            this.showPanelEntidadSalas('V', null);
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

  // #endregion

  //#region Proyectos
  inicializarModeloProyecto() {
    this.proyecto = {
      ProyectoId: null,
      SalaId: null,
      ProyectoPrimerNombreEncargado: '',
      ProyectoPrimerApellidoEncargado: '',
      ProyectoOtrosNombresEncargado: '',
      ProyectoSegundoApellidoEncargado: '',
      ProyectoTelefonoFijo: '',
      ProyectoTelefonoMovil: '',
      ProyectoEntidadBancaria: '',
      MunicipioIdEntidadBancaria: null,
      ProyectoNumeroCuentaBancaria: '',
      TipoCuentaBancariaId: null,
      ProyectoNecesidadSala: '',
      ProyectoObjetivoGeneral: '',
      ProyectoObjetivosEspecificos: '',
      ProyectoJustificacion: '',
      ProyectoDescripcion: '',
      ProyectoPropuestaSostenibilidad: '',
      ProyectoCantidadPoblacionBeneficiada: null,
      ProyectoDescripcionPoblacionBeneficiada: '',
      ProyectoResultadosEsperados: '',
      ProyectoFechaRegistro: '',
      ProyectoFechaEdito: '',
      ProyectoUsuarioIdEdito: null,
      ProyectoUsuarioIdCreacion: null,
      ProyectoEstadoId: null,
      AnoId: null,
      RegimenTributarioId: null,
      EntidadResponsableICA: null,
      EntidadTarifaICA: null,
      DepartamentoIdEntidadBancaria: null,
      ProyectoObservaciones: '',
      ProyectoEstadoNombre: '',

    };
  }

  showAccionProyecto(ProyectoId: number, accion: string) {
    //  // debugger;
    this.displayEstadoProyecto = false;
    this.popupVisibleFuncion = false;
    this.popupVisibleFuncionProyecto = false;
    this.displayProyectoCronograma = false;
    this.displayProyectoPresupuesto = false;
    this.displayProyectoDocumento = false;
    this.displayListaFuncionProyecto = false;
    this.inicializarModeloProyecto();
    this.listaProyectoFuncion = null;
    this.listaProyectoDocumento = null;
    this.listaProyectoCronograma = null;
    this.listaProyectoPresupuesto = null;
    this.cargarTipoCuentaBancaria();
    this.cargarRegimenTributario();
    this.cargarTipoEstadoProyecto();
    this.cargarRespICA();
    if (accion === 'U') {
      this.loading = true;
      this.getProyectoByProyectoId(ProyectoId);
      this.getProyectoFuncionByProyectoId(ProyectoId);
      this.getAllProyectoCronograma(ProyectoId);
      this.getAllProyectoPresupuesto(ProyectoId);
      this.getAllProyectoDocumento(ProyectoId);

      this.displayListaFuncionProyecto = true;
      this.displayProyectoCronograma = true;
      this.displayProyectoPresupuesto = true;
      this.displayProyectoDocumento = true;
      this.displayEstadoProyecto = true;
    }
    this.popupVisibleProyecto = true;
    this.accionProyecto = accion;
  }

  mostrarMunicipiosProyectos() {
    // debugger;
    console.log(this.proyecto.DepartamentoIdEntidadBancaria);
    this._tipoReferenciaService
      .getMunicipiosByDepartamento(this.proyecto.DepartamentoIdEntidadBancaria)
      .subscribe(
        (result) => {
          this.munListaProyecto = result.Lista;
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
    this.loading = false;
  }

  getAllProyectoBySala(SalaId: number) {
    // tslint:disable-next-line: no-// debugger
    // debugger;
    this._entidadService.getProyectoBySalaId(SalaId).subscribe((resp: any) => {
      this.listaProyectosSala = resp.Lista;
    });
  }

  getProyectoByProyectoId(ProyectoId: number) {
    this._entidadService
      .getProyectoByProyectoId(ProyectoId)
      .subscribe((resp: any) => {
        if (resp !== null) {
          this.proyecto = resp;
        }

        this.mostrarMunicipiosProyectos();
      });
  }

  onSubmitProyecto(isValid: any) {
    // debugger;
    if (isValid) {
      this.salvarProyecto();
    }
  }

  salvarProyecto() {
    //debugger;
    this.proyecto.SalaId = this.sala.SalaId;
    if (this.accionProyecto === 'U') {
      this.proyecto.ProyectoUsuarioIdEdito = this.usuId;
    } else {
      this.proyecto.ProyectoUsuarioIdCreacion = this.usuId;
    }
    this._entidadService.salvarProyecto(this.proyecto).subscribe((resp) => {
      this.popupVisibleProyecto = false;
      this.getAllProyectoBySala(this.proyecto.SalaId);
    });
  }

  borrarProyecto(ProyectoId: number) {
    Swal.fire({
      title: 'Borrar Proyecto?',
      text: 'Ese proceso no se podra revertir!',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Esto!',
    }).then((result) => {
      if (result.value) {
        this._entidadService.deleteProyecto(ProyectoId).subscribe(
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
            this.getAllProyectoBySala(this.sala.SalaId);
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

  cargarTipoEstadoProyecto() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_ESTADO_PROYECTO_SALA')
      .subscribe(
        (result) => {
          // debugger;
          this.listaTipoEstadoProyecto = result.Lista;
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

  cargarTipoCuentaBancaria() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_TIPO_CUENTA_BANCARIA')
      .subscribe(
        (result) => {
          // debugger;
          this.listaCuentaBancaria = result.Lista;
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

  cargarRegimenTributario() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_REGIMEN_TRIBUTARIO')
      .subscribe(
        (result) => {
          // debugger;
          this.listaRegimenTributario = result.Lista;
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

  cargarRespICA() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_ENTIDAD_RESPONSABLE_ICA')
      .subscribe(
        (result) => {
          // debugger;
          this.listaEntidadResponsableICA = result.Lista;
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

  showPanelVolverProyecto() {
    this.popupVisibleProyecto = false;
    this.showPanelEntidadSalas('U', this.sala.SalaId);
  }

  popupHidingProyecto(e: any) {
    this.showPanelVolverProyecto();
  }

  aprobarProyecto(id: any) {
    Swal.fire({
      title: 'Cambiar estado del proyecto?',
      text: 'Este proceso cambiara el estado del registro!',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiar de estado!',
    }).then((result) => {
      this.loading = true;
      this._entidadService
        .cambiarEstadoProyecto(this.proyecto)
        .subscribe((resp) => {
          // this.showPanel('V', null);
          //this.agente.AgenteId = this._agenteService.AgenteId;
          this.loading = false;
        });

      if (result.value) {
        Swal.fire(
          'Cambio de estado!',
          'su registro cambiado de estado.',
          'success'
        );
      }
    });
  }

  //#endregion

  //#region Función
  inicializarModeloFuncion() {
    this.funcion = {
      FuncionId: null,
      SalaId: null,
      FuncionRealizada: '',
      FuncionFecha: '',
      FuncionAbierta: '',
      FuncionNombre: '',
      FuncionCodigoPULEP: '',
      FuncionNombreGrupo: '',
      FuncionGrupoPlanta: '',
      FuncionCantidad: null,
      DisciplinaArtisticaId: null,
      PaisIdProcedenciaGrupo: null,
      MunicipioIdProcedenciaGrupo: null,
      DepartamentoIdProcedenciaGrupo: null,
      FuncionCiudadProcedenciaGrupoOtroPais: '',
      FuncionFechaRegistro: '',
      FuncionFechaEdito: '',
      FuncionUsuarioIdEdito: null,
      FuncionUsuarioIdCreacion: null,
      ProyectoId: null,
      TipoFuncionId: null,
    };
  }

  showAccionFuncion(FuncionId: number, accion: string) {
    // debugger;
    this.popupVisibleFuncionProyecto = false;
    this.inicializarModeloFuncion();
    this.mostrarMunicipiosFuncion();
    this.cargarDisciplinaArtistica();
    this.cargarFuncionRealizada();
    this.cargarFuncionAbierta();
    this.cargarFuncionGrupoPlanta();

    if (accion === 'U') {
      this.getFuncionByFuncionId(FuncionId);
    }

    this.popupVisibleFuncion = true;
    this.accionFuncion = accion;
  }

  getAllFuncionBySala(SalaId: number) {
    // debugger;
    this._entidadService.getFuncionBySalaId(SalaId).subscribe((resp: any) => {
      this.listaFuncionSala = resp.Lista;
    });
  }

  getFuncionByFuncionId(FuncionId: number) {
    this._entidadService
      .getFuncionByFuncionId(FuncionId)
      .subscribe((resp: any) => {
        this.funcion = resp;
        this.mostrarMunicipiosFuncion();
      });
  }

  mostrarMunicipiosFuncion() {
    // debugger;
    this._tipoReferenciaService
      .getMunicipiosByDepartamento(this.funcion.DepartamentoIdProcedenciaGrupo)
      .subscribe(
        (result) => {
          this.munListaFuncion = result.Lista;
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

  salvarFuncion() {
    // debugger;
    this.funcion.SalaId = this.sala.SalaId;
    this.funcion.TipoFuncionId = 1;
    if (this.accionFuncion === 'U') {
      this.funcion.FuncionUsuarioIdEdito = this.usuId;
    } else {
      this.funcion.FuncionUsuarioIdCreacion = this.usuId;
    }
    this._entidadService.salvarFuncion(this.funcion).subscribe((resp) => {
      this.popupVisibleFuncion = false;
      this.getAllFuncionBySala(this.funcion.SalaId);
    });
  }

  borrarFuncion(FuncionId) {
    Swal.fire({
      title: 'Borrar Función?',
      text: 'Ese proceso no se podra revertir!',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Esto!',
    }).then((result) => {
      if (result.value) {
        this._entidadService.deleteFuncion(FuncionId).subscribe(
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
            this.getAllFuncionBySala(this.sala.SalaId);
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

  onSubmitFuncion(isValid: any) {
    if (isValid) {
      this.salvarFuncion();
    }
  }

  cargarDisciplinaArtistica() {
    // debugger;
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_DISCIPLINA_ARTISTICA')
      .subscribe(
        (result) => {
          this.listaDisciplinaArtistica = result.Lista;
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

  cargarFuncionRealizada() {
    // debugger;
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_FUNCION_REALIZADA')
      .subscribe(
        (result) => {
          this.listaFuncionRealizada = result.Lista;
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

  cargarFuncionAbierta() {
    // debugger;
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_FUNCION_ABIERTA')
      .subscribe(
        (result) => {
          this.listaFuncionAbierta = result.Lista;
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

  cargarFuncionGrupoPlanta() {
    // debugger;
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_FUNCION_GRUPO_PLANTA')
      .subscribe(
        (result) => {
          this.listaFuncionGrupoPlanta = result.Lista;
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

  showVolverFuncion() {
    this.popupVisibleFuncion = false;
    this.showPanelEntidadSalas('U', this.sala.SalaId);
  }

  popupHidingFuncion(e: any) {
    this.showVolverFuncion();
  }

  //#endregion

  // #region Función de proyectos

  showAccionProyectoFuncion(FuncionId: number, accion: string) {
    // debugger;
    this.popupVisibleProyecto = false;
    this.inicializarModeloFuncion();
    this.mostrarMunicipiosProyectoFuncion();
    this.cargarDisciplinaArtisticaProyectoFuncion();
    this.cargarProyectoFuncionRealizada();
    this.cargarProyectoFuncionAbierta();
    this.cargarProyectoFuncionGrupoPlanta();

    if (accion === 'U') {
      this.getProyectoFuncionByProyectoFuncionId(FuncionId);
    }
    this.popupVisibleFuncionProyecto = true;
    this.accionProyectoFuncion = accion;
  }

  onSubmitProyectoFuncion(isValid: any) {
    if (isValid) {
      // debugger;
      this.salvarProyectofuncion();
    }
  }

  salvarProyectofuncion() {
    // debugger;
    this.funcion.ProyectoId = this.proyecto.ProyectoId;
    this.funcion.TipoFuncionId = 1; //  TODO: Pendiente determinar tipo de función
    if (this.accionFuncion === 'U') {
      this.funcion.FuncionUsuarioIdEdito = this.usuId;
    } else {
      this.funcion.FuncionUsuarioIdCreacion = this.usuId;
    }
    this._entidadService
      .salvarProyectoFuncion(this.funcion)
      .subscribe((resp) => {
        this.popupVisibleFuncionProyecto = false;
        this.getProyectoFuncionByProyectoId(this.funcion.ProyectoId);
        this.showAccionProyecto(this.proyecto.ProyectoId, 'U');
      });
  }

  borrarProyectoFuncion(proyectoFucnionId: number) {
    Swal.fire({
      title: 'Borrar función del Proyecto?',
      text: 'Ese proceso no se podra revertir!',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Esto!',
    }).then((result) => {
      if (result.value) {
        this._entidadService.deleteProyectoFuncion(proyectoFucnionId).subscribe(
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
            this.getProyectoFuncionByProyectoId(this.proyecto.ProyectoId);
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

  getProyectoFuncionByProyectoId(proyectoId: number) {
    this._entidadService
      .getProyectoFuncionByProyectoId(proyectoId)
      .subscribe((resp: any) => {
        // debugger;
        this.listaProyectoFuncion = resp.Lista;
      });
  }

  getProyectoFuncionByProyectoFuncionId(FuncionId: number) {
    this._entidadService
      .getProyectoFuncionByProyectoFuncionId(FuncionId)
      .subscribe((resp: any) => {
        this.funcion = resp;
        this.mostrarMunicipiosProyectoFuncion();
      });
  }

  mostrarMunicipiosProyectoFuncion() {
    // debugger;
    this._tipoReferenciaService
      .getMunicipiosByDepartamento(this.funcion.DepartamentoIdProcedenciaGrupo)
      .subscribe(
        (result) => {
          this.munListaProyectoFuncion = result.Lista;
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

  cargarDisciplinaArtisticaProyectoFuncion() {
    // debugger;
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_DISCIPLINA_ARTISTICA')
      .subscribe(
        (result) => {
          this.listaDisciplinaArtisticaProyectoFuncion = result.Lista;
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

  showVolverProyectosFuncion() {
    this.popupVisibleFuncionProyecto = false;
    this.showAccionProyecto(this.proyecto.ProyectoId, 'U');
  }

  popupHidingFuncionProyecto(e: any) {
    this.showVolverProyectosFuncion();
  }

  cargarProyectoFuncionRealizada() {
    // debugger;
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_FUNCION_REALIZADA')
      .subscribe(
        (result) => {
          this.listaProyectoFuncionRealizada = result.Lista;
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

  cargarProyectoFuncionAbierta() {
    // debugger;
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_FUNCION_ABIERTA')
      .subscribe(
        (result) => {
          this.listaProyectoFuncionAbierta = result.Lista;
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

  cargarProyectoFuncionGrupoPlanta() {
    // debugger;
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_FUNCION_GRUPO_PLANTA')
      .subscribe(
        (result) => {
          this.listaProyectoFuncionGrupoPlanta = result.Lista;
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

  //#endregion

  // #region Proyecto cronograma

  inicializarCronograma() {
    this.cronograma = {
      CronogramaId: null,
      ProyectoId: null,
      CronogramaActividad: '',
      CronogramaFechaInicio: '',
      CronogramaFechaFin: '',
      CronogramaFechaRegistro: '',
      CronogramaFechaEdito: '',
      CronogramaUsuarioIdEdito: null,
      CronogramaUsuarioIdCreacion: null,
    };
  }

  getAllProyectoCronograma(proyectoId: number) {
    this._entidadService
      .getAllProyectoCronograma(proyectoId)
      .subscribe((resp: any) => {
        // debugger;
        this.listaProyectoCronograma = resp.Lista;
      });
  }

  actualizarCronograma(item): void {
    // debugger;
    this.inicializarCronograma();
    this.cronograma.ProyectoId = this.proyecto.ProyectoId;
    this.cronograma.CronogramaUsuarioIdEdito = this.usuId;
    this.cronograma.CronogramaId = item.data.CronogramaId;
    this.cronograma.CronogramaActividad = item.data.CronogramaActividad;
    this.cronograma.CronogramaFechaInicio = item.data.CronogramaFechaInicio;
    this.cronograma.CronogramaFechaFin = item.data.CronogramaFechaFin;
    this._entidadService.salvarCronograma(this.cronograma).subscribe((resp) => {
      this.getAllProyectoCronograma(this.proyecto.ProyectoId);
    });
  }
  agregarCronograma(item): void {
    // debugger;
    this.inicializarCronograma();
    this.cronograma.ProyectoId = this.proyecto.ProyectoId;
    this.cronograma.CronogramaUsuarioIdCreacion = this.usuId;
    this.cronograma.CronogramaActividad = item.data.CronogramaActividad;
    this.cronograma.CronogramaFechaInicio = item.data.CronogramaFechaInicio;
    this.cronograma.CronogramaFechaFin = item.data.CronogramaFechaFin;
    this._entidadService.salvarCronograma(this.cronograma).subscribe((resp) => {
      // debugger;
      this.getAllProyectoCronograma(this.proyecto.ProyectoId);
    });
  }

  borrarCronograma(item): void {
    Swal.fire({
      title: 'Borrar cronograma del Proyecto?',
      text: 'Ese proceso no se podra revertir!',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Esto!',
    }).then((result) => {
      if (result.value) {
        const CronogramaId = item.data['CronogramaId'];
        this._entidadService.deleteProyectoCronograma(CronogramaId).subscribe(
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
            this.getAllProyectoCronograma(this.proyecto.ProyectoId);
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

  //#endregion

  // #region Presupuesto

  inicializarPresupuesto() {
    this.presupuesto = {
      PresupuestoId: null,
      ProyectoId: null,
      PresupuestoComponente: '',
      PresupuestoTipoGasto: '',
      PresupuestoValor: '',
    };
  }

  getAllProyectoPresupuesto(proyectoId: number) {
    this._entidadService
      .getAllProyectoPresupuesto(proyectoId)
      .subscribe((resp: any) => {
        // debugger;
        this.listaProyectoPresupuesto = resp.Lista;
      });
  }

  actualizarPresupuesto(item): void {
    this.inicializarPresupuesto();
    this.presupuesto.PresupuestoId = item.data.PresupuestoId;
    this.presupuesto.ProyectoId = this.proyecto.ProyectoId;
    this.presupuesto.PresupuestoComponente = item.data.PresupuestoComponente;
    this.presupuesto.PresupuestoTipoGasto = item.data.PresupuestoTipoGasto;
    this.presupuesto.PresupuestoValor = item.data.PresupuestoValor;

    this._entidadService
      .salvarPresupuesto(this.presupuesto)
      .subscribe((resp) => {
        this.getAllProyectoPresupuesto(this.proyecto.ProyectoId);
      });
  }
  agregarPresupuesto(item): void {
    // debugger;
    this.inicializarPresupuesto();
    this.presupuesto.ProyectoId = this.proyecto.ProyectoId;
    this.presupuesto.PresupuestoComponente = item.data.PresupuestoComponente;
    this.presupuesto.PresupuestoTipoGasto = item.data.PresupuestoTipoGasto;
    this.presupuesto.PresupuestoValor = item.data.PresupuestoValor;

    this._entidadService
      .salvarPresupuesto(this.presupuesto)
      .subscribe((resp) => {
        this.getAllProyectoPresupuesto(this.proyecto.ProyectoId);
      });
  }
  borrarPresupuesto(item): void {
    const CronogramaId = item.data['PresupuestoId'];
    this._entidadService
      .deleteProyectoPresupuesto(CronogramaId)
      .subscribe((resp) => {
        this.getAllProyectoPresupuesto(this.proyecto.ProyectoId);
      });
  }

  //#endregion

  //#region Proyecto Documento
  inicializarDocumento() {
    this.documento = {
      DocumentoProyectoId: null,
      ProyectoId: null,
      ArchivoId: null,
      DocumentoProyectoNombre: '',
      DocumentoProyectoFechaRegistro: '',
      DocumentoProyectoUsuarioIdCreacion: null,
      DocumentoProyectoEstadoId: null,
      DocumentoProyectoObservacionesRevision: '',
      ProyectoTipoDocumentoId: null,
      DocumentoCaracterEntidadId: null,
    };
    this.listaProyectoTipoDocumento = [];
  }

  showAccionProyectoDocumento(DocumentoId: number, accion: string) {
    this.inicializarDocumento();
    this.valueProyectoDocumento = [];
    this.cargarTipoDocumentos();
    this.cargarCaracterEntidad();
    debugger;
    if (accion === 'U') {
      this.getProyectoDocumentoByProyectoDocumentoId(DocumentoId);
    }
    this.popupVisibleProyectoDocumento = true;
    this.accionProyectoDocumento = accion;
  }

  salvarDocumento() {
    debugger;
    this.documento.ProyectoId = this.proyecto.ProyectoId;
    if (this.accionProyectoDocumento === 'C') {
      this.documento.DocumentoProyectoUsuarioIdCreacion = this.usuId;
    }
    this._entidadService.salvarDocumento(this.documento).subscribe((resp) => {
      this.popupVisibleProyectoDocumento = false;
      this.getProyectoByProyectoId(this.proyecto.ProyectoId);
      this.showAccionProyecto(this.proyecto.ProyectoId, 'U');
    });
  }

  cargarCaracterEntidad() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorIdPadre(this.entidad.AreaId).subscribe(
      (result) => {
        this.caracterLista = result.Lista.filter(item=>item.idTipoReferencia == "3094" );
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

  cargarTipoDocumentos() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorIdPadre(this.documento.DocumentoCaracterEntidadId).subscribe(
      (result) => {
        this.listaProyectoTipoDocumento = result.Lista;
        
        //this.otrasAreas = result.Lista.map(elm => ({ OtrasAreasId: elm.idValorReferencia, nombre: elm.nombre }));
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
    this.descripcionDocumento = '';
        this.documento.ProyectoTipoDocumentoId = null;
  }

  mostrarDescripcionDocumento(){
    debugger;
    this._tipoReferenciaService.getValorReferenciaById(this.documento.ProyectoTipoDocumentoId)
      .subscribe(

        (resp: any) => {
      //    debugger;
          // console.log(resp);
          this.descripcionDocumento = resp.descripcion;
        });

    //this.descripcionDocumento = '';
      //this.descripcionDocumento = selectedValue.innerText;
  }

  cargarTipoDocumentosold() {
    this.listaProyectoTipoDocumento = [];
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_DOCUMENTO_SALA')
      .subscribe(
        (result) => {
          debugger;
          this.listaProyectoTipoDocumento = result.Lista;
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

  onSubmitProyectoDocumento(isValid: any) {
    this.salvarDocumento();
  }

  getAllProyectoDocumento(ProyectoId: number) {
    // debugger;
    this._entidadService
      .getAllProyectoDocumento(ProyectoId)
      .subscribe((resp: any) => {
        this.listaProyectoDocumento = resp.Lista;
      });
  }

  popupHidingProyectoDocumento(e: any) {
    this.showVolverProyectoDocumento();
  }

  getProyectoDocumentoByProyectoDocumentoId(DocumentoId: number) {
    this._entidadService
      .getProyectoDocumentoByProyectoDocumentoId(DocumentoId)
      .subscribe((resp: any) => {
        this.documento = resp;
      });
  }

  borrarProyectoDocumento(DocumentoId) {
    Swal.fire({
      title: 'Borrar Documento?',
      text: 'Ese proceso no se podra revertir!',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Esto!',
    }).then((result) => {
      if (result.value) {
        this._entidadService.deleteProyectoDocuemnto(DocumentoId).subscribe(
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
            this.getAllProyectoDocumento(this.proyecto.ProyectoId);
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

  showVolverProyectoDocumento() {
    this.popupVisibleProyectoDocumento = false;
    this.showAccionProyecto(this.proyecto.ProyectoId, 'U');
  }

  addIdParameterPdfDocumento(e: any) {
    this.urlDocumento = URL_SERVICIOS + 'ApiRest/Salas/MediaUploadDocumentoPDF';
  }

  descargarArchivoDocumento(id: number) {
    if (id !== null) {
      this.loading = true;
      this._entidadService.downloadMediosDocumentoById(id).subscribe(
        (res) => {
          console.log('start download:', res);
          const url = window.URL.createObjectURL(res);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = 'DocumentoProyecto.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove(); // remove the element
          this.loading = false;
        },
        (error) => {
          this.error = error;
          this.loading = false;
          // if (error.statusText === 'Unauthorized') {
          //     this.servicePNotify.error('TYC', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          //     this.authenticationService.logout().subscribe(response => { });
          //     this.storageService.logout();
          // }
          console.log(<any>error);
        }
      );
    }
  }

  subidaCompletaPdfDocumento(e: {
    request: {
      status: number;
      response: string;
    };
  }) {
    debugger;
    if (e.request.status === 201) {
      const obj = JSON.parse(e.request.response);
      console.log(obj.Message.split('|')[1]);
      this.documento.DocumentoProyectoNombre = obj.Message.split('|')[1];
      this.urlDocumento =
        URL_SERVICIOS + '/Medios/SalaProyectos/' + obj.Message.split('|')[1];
      setTimeout(() => {
        // swal('Archivo cargado', 'Los datos se han subido correctamente!', 'success' );
        Swal.fire(
          'Archivo cargado!',
          'Los datos se han subido correctamente!.',
          'success'
        );
      }, 15);
    } else {
      setTimeout(() => {
        // swal('ERROR', 'Los datos NO se han subido correctamente!', 'success' )
        Swal.fire(
          'ERROR!',
          'Los datos NO se han subido correctamente!',
          'error'
        );
      }, 15);
    }
  }

  
}
//#endregion

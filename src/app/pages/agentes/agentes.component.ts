import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import {
  AgenteService,
  TipoReferenciaService,
  UsuarioService,
} from 'src/app/services/service.index';
import {
  Agente,
  AgenteExperiencia,
  AgenteFormacion,
} from 'src/app/models/agente.model';
import { IOption } from 'ng-select';
// import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { URL_SERVICIOS } from '../../config/config';
import { ValorReferencia, Formacion } from '../../models/valorReferencia.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { User } from '../../models/user.model';
import { Session } from '../../models/session.model';
import { CurrencyPipe } from '@angular/common';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import dxDataGrid from 'devextreme/ui/data_grid';
import { OtrasAreasOcupaciones, OtrasAreas, OtrasOcupaciones, } from '../../models/agente.model';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';

@Component({
  selector: 'app-agentes',
  templateUrl: './agentes.component.html',
  styleUrls: ['./agentes.component.css'],
})
export class AgentesComponent implements OnInit {

  // #region Variables Globales
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', { static: false })
  customLoadingTemplate: TemplateRef<any>;
  @ViewChild(DxPivotGridComponent, { static: false })
  pivotGrid: DxPivotGridComponent;
  gridOtrasOcupaciones: dxDataGrid;
  @ViewChild(DxChartComponent, { static: false }) chart: DxChartComponent;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = PrimaryRed;
  public secondaryColour = SecondaryBlue;
  public coloursEnabled = true;
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
  dataSource: any;
  usuario: User;
  usuarioNombre: string;
  email: string;
  roles: any;
  role: string;
  usuId: number;
  perfilId: number;
  currentSession: Session;
  gestionaActores: boolean;
  mostrarPuntaje: boolean;
  gestionaActoresHtml: string;
  tasks: DataSource;
  tasks1 = [];
  // =
  //   [
  //     { id: 1, text: 'Prepare 2016 Financial' },
  //     { id: 2, text: 'Prepare 2016 Marketing Plan' },
  //     { id: 3, text: 'Update Personnel Files' },
  //     { id: 4, text: 'Review Health Insurance Options Under the Affordable Care Act' },
  //     { id: 5, text: 'New Brochures' }
  //   ];

  datos = [];

  listaAgentes = [];
  listOcupacion: any;
  listaAgentesExperiencia = [];
  listaAgentesFormacion = [];
  displayListAgente: boolean;
  displayCrearAgente: boolean;
  registro: boolean;
  experiencia: boolean;
  displayListAgenteExperiencia: boolean;
  displayCrearAgenteExperiencia: boolean;

  formacion: boolean;
  displayListAgenteFormacion: boolean;
  displayCrearAgenteFormacion: boolean;

  agente: Agente;
  appointmentsData: Appointment[];
  agenteExperiencia: AgenteExperiencia;
  agenteFormacion: AgenteFormacion;
  tipoDoc: Array<IOption>;
  tipoDiscapacidad: Array<IOption>;
  depLista: Array<IOption>;
  paisesLista: Array<IOption>;
  paisesResidenciaLista: Array<IOption>;
  munLista: Array<IOption>;
  areaLista: Array<IOption>;
  seguridadSocialLista: Array<IOption>;
  tipoExperienciaLista: Array<IOption>;
  nivelFormacionLista: Array<IOption>;
  origenInfoLista: Array<IOption>;
  EstadoLista: Array<IOption>;
  ocupacionLista: Array<ValorReferencia>;
  checkedList = [];
  munNacimientoLista: Array<IOption>;
  ZON_ID_DEP: string;
  DepartamentoNacimientoId: string;
  operacion = 'C';
  title: string;
  value: any[] = [];
  valueExperiencia: any[] = [];
  valueFormacion: any[] = [];
  url: string;
  error: any;
  EstiloStep1: string;
  EstiloStep2: string;
  EstiloStep3: string;
  EstiloStep4: string;

  urlImagen: string;
  urlImagenExperiencia: string;
  urlImagenFormacion: string;
  oculto = 'oculto';
  ocultoExperiencia = 'oculto';
  ocultoFormacion = 'oculto';

  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  selectedItemsAreaPrincipal: any[] = [];

  public dataSourceOtrasOcupaciones: OtrasAreasOcupaciones[];
  // =
  // [{
  //   'AgenteOcupacionId': 1,
  //   'AgenteId': 10010,
  //   'OtrasAreasId': 141,
  //   'TipoOcupacionId': 2044
  // }, {
  //   'AgenteOcupacionId': 2,
  //   'AgenteId': 10010,
  //   'OtrasAreasId': 141,
  //   'TipoOcupacionId': 2045
  // }];



  otrasAreas: OtrasAreas[] = [
    {
      'OtrasAreasId': 3514,
      'nombre': 'Música'
    },
    {
      'OtrasAreasId': 3515,
      'nombre': 'Teatro'
    },
    {
      'OtrasAreasId': 3513,
      'nombre': 'Literatura y Editorial'
    },
    {
      'OtrasAreasId': 3509,
      'nombre': 'Artes Visuales'
    },
    {
      'OtrasAreasId': 3512,
      'nombre': 'Danza'
    }
    ,
    {
      'OtrasAreasId': 3350,
      'nombre': 'Circo'
    }
    ,
    {
      'OtrasAreasId': 3510,
      'nombre': 'Cine y Audiovisuales'
    }
  ];

  otrasOcupaciones: OtrasOcupaciones[];

  // = [{
  //   'TipoOcupacionId': 2044,
  //   'nombre': 'ocupacion 1',
  //   'OtrasAreasId': 141
  // },
  // {
  //   'TipoOcupacionId': 2045,
  //   'nombre': 'Ocupacion 2',
  //   'OtrasAreasId': 141
  // }
  // ];

  // #endregion

  //#region Constructor
  constructor(
    public _agenteService: AgenteService,
    private currencyPipe: CurrencyPipe,
    public _tipoReferenciaService: TipoReferenciaService,
    public _usuarioService: UsuarioService
  ) {
    this.selectedItemsAreaPrincipal = [];
    this.dataSourceOtrasOcupaciones = [];
    this.tasks = new DataSource({
      store: new ArrayStore({
        key: 'id',
        data: this.tasks1
      })
    });
    this.customizeTooltip = this.customizeTooltip.bind(this);
    const user: any = this._usuarioService.getCurrentUser();
    this.usuario = JSON.parse(user);
    this.usuarioNombre = this.usuario.USU_NOMBRE;
    this.email = this.usuario.USU_CORREO_ELECTRONICO;
    this.usuId = this.usuario.USU_ID;
    this.roles = this.usuario.Perfiles;
    if (this.roles.length > 0) {
      this.role = this.roles[0].PER_NOMBRE;
      this.perfilId = this.roles[0].PER_ID;
      if (this.roles[0].GestionaActores !== null) {
        if (this.roles[0].GestionaActores) {
          this.gestionaActores = this.roles[0].GestionaActores;
          this.oculto = '';
        } else {
          this.oculto = 'oculto';
          this.gestionaActores = false;
        }
      } else {
        this.gestionaActores = false;
      }

      this.getFilteredOcupaciones = this.getFilteredOcupaciones.bind(this);

    }

    this.mostrarPuntaje = false;
    this.displayListAgente = true;
    this.displayCrearAgente = false;
    this.registro = true;
    this.experiencia = false;
    this.displayListAgenteExperiencia = true;
    this.displayCrearAgenteExperiencia = false;

    this.formacion = false;
    this.displayListAgenteFormacion = true;
    this.displayCrearAgenteFormacion = false;

    // tslint:disable-next-line: max-line-length
    this.checkedList = [];
    this.datos = [];
    // tslint:disable-next-line:max-line-length
    this.agente = new Agente(null, null,
      146,
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
      '',
      null,
      null,
      '',
      '',
      null,
      this.usuId,
      null,
      198,
      '',
      null,
      null,
      null,
      null,
      '',
      '',
      null,
      null,
      '',
      false,
      null,
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
      null,
      null,
      null,
      '',
      '',
      null,
      null,
    );
    this.agenteExperiencia = new AgenteExperiencia(
      null,
      '',
      '',
      '',
      '',
      '',
      null,
      null,
      null,
      null,
      '',
      null,
      '',
      null,
      ''
    );
    this.agenteFormacion = new AgenteFormacion(
      null,
      '',
      '',
      '',
      '',
      '',
      null,
      null,
      null,
      null,
      '',
      null,
      null,
      null
    );
    this.EstiloStep1 = 'active';
    this.EstiloStep2 = '';
    this.EstiloStep3 = '';
    this.EstiloStep4 = '';
  }
  //#endregion

  setAreasValue(rowData: any, value: any): void {
    rowData.idValorReferencia = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }

  setOtrasAreasValue(rowData: any, value: any): void {
    rowData.TipoOcupacionId = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }

  getFilteredOcupaciones(options) {
    return {
      store: this.otrasOcupaciones,
      filter: options.data ? ['OtrasAreasId', '=', options.data.OtrasAreasId] : null
    };
  }

  onEditorPreparingOtrasOcupaciones(e) {
    if (e.parentType === 'dataRow' && e.dataField === 'TipoOcupacionId') {
      e.editorOptions.disabled = (typeof e.row.data.OtrasAreasId !== 'number');
    }
  }

  customizeTooltip(args) {
    return {
      html:
        args.seriesName +
        ' | Total<div class=\'currency\'>' +
        args.valueText +
        '</div>',
    };
  }

  ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: 'splitPanes',
      alternateDataFields: false,
    });

    setTimeout(() => {
      // tslint:disable-next-line:prefer-const
      let dataSource = this.pivotGrid.instance.getDataSource();
      // dataSource.expandHeaderItem('row', ['North America']);
      // dataSource.expandHeaderItem('column', [2013]);
    }, 0);
    // this.cargarPrograma();
  }

  ngOnInit() {
    this.cargarAgentes();
    this.cargarTiposIdentificacion();
    this.getDep();
    this.getPaises();
    //this.cargarTiposOcupacion();
    this.cargarAreas();
    this.cargarOrigenInformacion();
    this.cargarTipoExperiencia();
    this.cargarNivelFormacion();
    this.cargarTiposDiscapacidad();
    this.cargarEstado();
    this.cargarSeguridadSocial();
    this.cargarTiposOcupacionOtros();

    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: 'splitPanes',
      alternateDataFields: false,
    });

    setTimeout(() => {
      let dataSource = this.pivotGrid.instance.getDataSource();
      // dataSource.expandHeaderItem('row', ['North America']);
      // dataSource.expandHeaderItem('column', [2013]);
    }, 0);
  }

  ayudaIngreso() {
    Swal.fire({
      // icon: 'warning',
      html:
        '<iframe width=480 height=280 frameborder="0" scrolling="no" src="https://screencast-o-matic.com/embed?sc=cYijF355eM&v=5&ff=1" allowfullscreen="true"></iframe>',
      showCloseButton: true,
      focusConfirm: false,
    });
  }

  cargarFicha() {
    this.dataSource = {
      fields: [
        {
          caption: 'Estado',
          dataField: 'AgenteEstadoNombre',
          width: 150,
          area: 'filter',
        },
        // {
        //   caption: 'Genero',
        //   dataField: 'AgenteGenero',
        //   width: 150,
        //   area: 'filter',
        // },
        {
          caption: 'Estrato',
          dataField: 'AgenteEstrato',
          width: 150,
          area: 'filter',
        },
        {
          caption: 'Ingresos Mensuales',
          dataField: 'AgenteIngresosMensuales',
          width: 150,
          area: 'filter',
        },
        {
          caption: 'Departamento Residencia',
          dataField: 'DepartamentoRecidenciaNombre',
          area: 'row',
        },
        {
          caption: 'Municipio Residencia',
          dataField: 'MunicipioResidenciaNombre',
          area: 'row',
        },
        {
          dataField: 'Sistema',
          dataType: 'Sistema',
          area: 'column',
        },

        {
          caption: 'AgenteNumeroIdentificacion',
          dataField: 'AgenteNumeroIdentificacion',
          // dataType: "number",
          // summaryType: "sum",
          // format: "fixedPoint",
          area: 'data',
        },
        // {
        //   caption: "Beneficiarios",
        //   dataField: "OfertaProgramaRegionalizadoCantidadBeneficiarios",
        //   dataType: "number",
        //   summaryType: "sum",
        //   format: "fixedPoint",
        //   area: "data",
        // },
        // {
        //   caption: "Cofinanciación Actividades",
        //   dataField: "OfertaProgramaRegionalizadoCofinanciacion",
        //   dataType: "number",
        //   summaryType: "sum",
        //   format: "currency",
        // },
        // {
        //   caption: "Contrapartidas Actividades",
        //   dataField: "OfertaProgramaRegionalizadoContrapartida",
        //   dataType: "number",
        //   summaryType: "sum",
        //   format: "currency",
        // },
        // {
        //   caption: "Aplazamientos Actividades",
        //   dataField: "OfertaProgramaRegionalizadoRecursoAplazado",
        //   dataType: "number",
        //   summaryType: "sum",
        //   format: "currency",
        // },
      ],
      store: this.appointmentsData,
    };
  }

  changeSeguridadSocial() {
    this.agente.AgentePuntajeSisben = null;
    if (this.agente.AgenteSeguridadSocialId === 3376) {
      this.mostrarPuntaje = true;
    } else {
      this.mostrarPuntaje = false;
    }
  }

  addIdParameter(e: any) {
    this.url = URL_SERVICIOS + '/ApiRest/Agente/MediaUpload';
  }

  addIdParameterPdf(e: any) {
    this.url = URL_SERVICIOS + '/ApiRest/Agente/MediaUploadPdf';
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
    } else if (sw === 'P' && this.agente.AgenteId != null) {
      // Actualizar Usuario
      this.experiencia = true;
      this.EstiloStep1 = 'complete';
      this.EstiloStep2 = 'active';
      this.EstiloStep3 = '';
      this.EstiloStep4 = '';
    } else if (sw === 'O' && this.agente.AgenteId != null) {
      // Volver al listado
      this.formacion = true;
      this.EstiloStep1 = 'complete';
      this.EstiloStep2 = 'complete';
      this.EstiloStep3 = 'active';
      this.EstiloStep4 = '';
    } else if (this.agente.AgenteId === null) {
      this.registro = true;
    }
  }

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
      this.cargarAgentesExperiencia(this.agente.AgenteId);
    }
  }

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
      this.cargarAgentesFormacion(this.agente.AgenteId);
    }
  }

  subidaCompleta(e: { request: { status: number; response: string } }) {
    if (e.request.status === 201) {
      const obj = JSON.parse(e.request.response);
      console.log(obj.Message.split('|')[1]);
      this.agente.Fotografia = obj.Message.split('|')[1];
      this.urlImagen =
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

  subidaCompletaPdfExperiencia(e: {
    request: { status: number; response: string };
  }) {
    if (e.request.status === 201) {
      const obj = JSON.parse(e.request.response);
      console.log(obj.Message.split('|')[1]);
      this.agenteExperiencia.Fotografia = obj.Message.split('|')[1];
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

  subidaCompletaPdfFormacion(e: {
    request: { status: number; response: string };
  }) {
    if (e.request.status === 201) {
      const obj = JSON.parse(e.request.response);
      console.log(obj.Message.split('|')[1]);
      this.agenteFormacion.Fotografia = obj.Message.split('|')[1];
      this.urlImagenFormacion =
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

  descargarArchivo() {
    if (this.agente.AgenteId !== null) {
      this._agenteService.downloadMediosById(this.agente.AgenteId).subscribe(
        (res) => {
          console.log('start download:', res);
          const url = window.URL.createObjectURL(res);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = 'FotoAgente.jpg';
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove(); // remove the element
        },
        (error) => {
          this.error = error;
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

  descargarArchivoExperiencia() {
    if (this.agenteExperiencia.AgenteExperienciaId !== null) {
      this.loading = true;
      this._agenteService
        .downloadMediosExperienciaById(
          this.agenteExperiencia.AgenteExperienciaId
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

  descargarArchivoFormacion() {
    if (this.agenteFormacion.AgenteFormacionId !== null) {
      this.loading = true;
      this._agenteService
        .downloadMediosFormacionById(this.agenteFormacion.AgenteFormacionId)
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

  cargarAgentes() {
    this.loading = true;
    this._agenteService
      .cargarAgentes(this.usuId, this.perfilId)
      .subscribe((resp: any) => {
        this.listaAgentes = resp.Lista;
        this.appointmentsData = resp.Lista;
        this.cargarFicha();
        this.loading = false;
      });
  }

  cargarAgentesExperiencia(id: number) {
    this._agenteService.cargarAgentesExperiencia(id).subscribe((resp: any) => {
      this.listaAgentesExperiencia = resp.Lista;
    });
  }

  cargarAgentesFormacion(id: number) {
    this._agenteService.cargarAgentesFormacion(id).subscribe((resp: any) => {
      this.listaAgentesFormacion = resp.Lista;
    });
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

  cargarTiposDiscapacidad() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorId(1047)
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

  cargarOrigenInformacion() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorId(23).subscribe(
      (result) => {
        this.origenInfoLista = result.Lista;
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

  cargarEstado() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorId(18).subscribe(
      (result) => {
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

  cargarAreas() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorIdPadre(3503).subscribe(
      (result) => {
        this.areaLista = result.Lista;
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
  }

  cargarSeguridadSocial() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorId(2057)
      .subscribe(
        (result) => {
          this.seguridadSocialLista = result.Lista;
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

  cargarNivelFormacion() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorId(48).subscribe(
      (result) => {
        this.nivelFormacionLista = result.Lista;
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
    debugger;
    this._tipoReferenciaService.getValorReferenciaOcupacionesPorTipoValorIdPadre(this.agente.AreaId).subscribe(
      (result) => {
        this.ocupacionLista = result.Lista;
        const resultArray = this.ocupacionLista.map(elm => ({ id: elm.idValorReferencia, text: elm.nombre }));
        this.tasks = new DataSource({
          store: new ArrayStore({
            key: 'id',
            data: resultArray
          })
        });
        this.datos = this.agente.TipoOcupacion;
        //console.log(this.ocupacionLista);
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
    this._tipoReferenciaService.getValorReferenciaPorTipoValorId('22').subscribe(
      (result) => {
        // tslint:disable-next-line:max-line-length
        this.otrasOcupaciones = result.Lista.map(elm => ({ TipoOcupacionId: elm.idValorReferencia, nombre: elm.nombre, OtrasAreasId: elm.idValorReferenciaPadre }));
        //console.log(this.ocupacionLista);
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

  onCheckboxChange(
    option: { idValorReferencia: any },
    event: { target: { checked: any } }
  ) {
    if (event.target.checked) {
      this.checkedList.push(option.idValorReferencia);
    } else {
      for (let i = 0; i < this.ocupacionLista.length; i++) {
        if (this.checkedList[i] === option.idValorReferencia) {
          this.checkedList.splice(i, 1);
        }
      }
    }
    console.log(this.checkedList);
  }

  limpiarListCheckBox() {
    if ( this.ocupacionLista != null) {
      for (let i = 0; i < this.ocupacionLista.length; i++) {
        this.ocupacionLista[i].checked = false;
      }
    }
  }

  borrarAgente(id: any, sistema: string) {
    // if (sistema === 'Siartes') {
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
          this._agenteService.deleteAgente(id).subscribe(
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
              if (!result['OperacionExitosa']) {
                Swal.fire('Alerta', result['Mensaje'], 'error');
              }

              this.cargarAgentes();
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
    // } else {
    //   Swal.fire(
    //     'Alerta',
    //     'Este agente pertenece a otro sistema y no se puede borrar',
    //     'error'
    //   );
    // }
  }

  cargarLink(id, sistema) {
    if (sistema === 'Simus') {
      return 'https://simus.mincultura.gov.co/Home/DetalleAgente/' + id;
    } else if (sistema === 'Pulep') {
      return 'https://simus.mincultura.gov.co/Home/DetalleAgente/' + id;
    } else if (sistema === 'Sidanza') {
      return 'https://simus.mincultura.gov.co/Home/DetalleAgente/' + id;
    } else {
      return '';
    }
  }

  consultarPorCedula(id: any) {
    this._agenteService
      .consultaAgentePorCedula(this.agente.AgenteNumeroIdentificacion)
      .subscribe(
        (result) => {
          let bandera: Boolean = false;
          if (
            result['AgentePrimerNombre'] !== '' &&
            result['AgentePrimerNombre'] !== null
          ) {
            this.agente.AgentePrimerNombre = result['AgentePrimerNombre'];
            this.agente.AgenteSegundoNombre = result['AgenteSegundoNombre'];
            this.agente.AgentePrimerApellido = result['AgentePrimerApellido'];
            this.agente.AgenteSegundoApellido = result['AgenteSegundoApellido'];
            this.agente.AgenteFechaNacimiento = result['AgenteFechaNacimiento'];
            //this.agente.AgenteGenero = result['AgenteGenero'];
            this.agente.AgenteDireccion = result['AgenteDireccion'];
            this.agente.AgenteTelefonoFijo = result['AgenteTelefonoFijo'];
            this.agente.AgenteEmail = result['AgenteEmail'];
            this.agente.DepartamentoNacimientoId =
              result['DepartamentoNacimientoId'];
            this.agente.MunicipioNacimientoId = result['MunicipioNacimientoId'];
            if (result['Sistema'] === 'Simus') {
              this.agente.AreaId = 139;
            }
            this.mostrarMunicipiosDeNacimiento();

            Swal.fire('Mensaje', result['Mensaje'], 'success');
          }

          bandera = result['OperacionExitosa'];
          if (!result['OperacionExitosa']) {
            //  alert();
            Swal.fire('Alerta', result['Mensaje'], 'error');
            this.agente.AgenteNumeroIdentificacion = '';
            //     this.getRedSocialByAgente();
            //     this.servicePNotify.warn('Eliminar', 'Datos eliminados correctamente!');
            //} //else {
            //     this.servicePNotify.html(
            //         '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
            //         'error'
            //     );
          }
          //this.cargarAgentesExperiencia(this.agente.AgenteId);
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

  consultarPorCorreo(id: any) {
    this._agenteService
      .consultaAgentePorCorreo(this.agente.AgenteEmail)
      .subscribe(
        (result) => {
          let bandera: Boolean = false;

          bandera = result['OperacionExitosa'];
          if (!result['OperacionExitosa']) {
            //  alert();
            Swal.fire('Alerta', result['Mensaje'], 'error');
            this.agente.AgenteEmail = '';
            //     this.getRedSocialByAgente();
            //     this.servicePNotify.warn('Eliminar', 'Datos eliminados correctamente!');
            //} //else {
            //     this.servicePNotify.html(
            //         '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
            //         'error'
            //     );
          }
          //this.cargarAgentesExperiencia(this.agente.AgenteId);
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
        this._agenteService.deleteAgenteExperiencia(id).subscribe(
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
            this.cargarAgentesExperiencia(this.agente.AgenteId);
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
        this._agenteService.deleteAgenteFormacion(id).subscribe(
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
            this.cargarAgentesFormacion(this.agente.AgenteId);
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

  aprobarAgente(id: any) {
    Swal.fire({
      title: 'Cambiar estado de agente?',
      text: 'Este proceso cambiara el estado del registro!',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiar de estado!',
    }).then((result) => {
      this.loading = true;
      this._agenteService.cambiarEstadoAgente(this.agente).subscribe((resp) => {
        // this.showPanel('V', null);
        this.agente.AgenteId = this._agenteService.AgenteId;
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

  showPanel(sw: string, id: any, sistema: string) {
    if (sw === 'C') {
      // Crear Usuario
      this.displayListAgente = false;
      this.displayCrearAgente = true;
      this.inicializarModelo();
      this.experiencia = false;
      this.formacion = false;
      this.registro = true;
      this.EstiloStep1 = 'active';
      this.EstiloStep2 = '';
      this.EstiloStep3 = '';
      this.EstiloStep4 = '';
    } else if (sw === 'U') {
      // Actualizar Usuario
     // if (sistema === 'Siartes' || sistema === 'Soy Cultura') {
        this.displayListAgente = false;
        this.displayCrearAgente = true;
        this.getAgenteById(id);
        this.operacion = 'U';
        this.experiencia = false;
        this.formacion = false;
        this.registro = true;
        this.EstiloStep1 = 'active';
        this.EstiloStep2 = '';
        this.EstiloStep3 = '';
        this.EstiloStep4 = '';
      // } else {
        
      //   Swal.fire(
      //     'Alerta',
      //     'Este agente pertenece a otro sistema y se debe consultar por medio de la columna que contiene el Link  ',
      //     'error'
      //   );
      // }
    } else if (sw === 'V') {
      //Volver al listado de contratistas
      this.displayListAgente = true;
      this.displayCrearAgente = false;
      this.inicializarModelo();
      // recargar la tabla
      this.cargarAgentes();
    }
  }

  limpiarCamposLugarNacimiento() {
    this.agente.AgenteCiudadNacimiento = '';
    this.agente.DepartamentoNacimientoId = null;
    this.agente.MunicipioNacimientoId = null;
  }

  limpiarCamposLugarResidencia() {
    this.agente.AgenteCiudadresidencia = '';
    this.agente.DepartamentoResidenciaId = null;
    this.agente.MunicipioResidenciaId = null;
  }


  inicializarModelo() {
    this.agente = {
      AgenteId: null,
      TipoIdentificacionId: null,
      AgenteTipoId: 146,
      AgenteNumeroIdentificacion: '',
      AgentePrimerNombre: '',
      AgenteSegundoNombre: '',
      AgentePrimerApellido: '',
      AgenteSegundoApellido: '',
      AgenteSexoId: null,
      AgenteDireccion: '',
      AgenteTelefonoFijo: '',
      AgenteTelefonoMovil: '',
      AgenteEmail: '',
      AgenteFechaRegistro: '',
      MunicipioResidenciaId: null,
      AgenteFechaAprobacion: '',
      AgenteObservaciones: '',
      AgenteFechaEdito: '',
      CuentaUsuarioIdEdito: null,
      CuentaUsuarioIdGestiona: null,
      CuentaUsuarioIdCreacion: null,
      AgenteEstadoId: 197,
      AgenteFechaNacimiento: '',
      MunicipioNacimientoId: null,
      DepartamentoResidenciaId: null,
      DepartamentoNacimientoId: null,
      TipoOcupacion: null,
      AgenteUrl: '',
      AgenteAlias: '',
      AreaId: null,
      AgenteOrigenInformacionId: null,
      Fotografia: '',
      AgentePoseeAlgunaDiscapacidad: false,
      DiscapacidadId: null,
      PefilFacebook: '',
      PerfilTwitter: '',
      PaginaWeb: '',
      CanalYoutube: '',
      PerfilSoundCloud: '',
      PerfilFlickr: '',
      PerfilInstagram: '',
      EstadoNombre: '',
      AgenteEstrato: null,
      AgentePuntajeSisben: null,
      AgenteIngresosMensuales: null,
      AgenteSeguridadSocialId: null,
      PaisIdNacimiento: null,
      PaisIdResidencia: null,
      AgenteCiudadNacimiento: '',
      AgenteCiudadresidencia: '',
      OtrasAreasOcupacion: null,
      AgenteTrabajoEnCalleRecurrentemente: false,
    };

    this.limpiarListCheckBox();
    this.urlImagen = '';
    this.urlImagenExperiencia = '';
    this.inicializarModeloExperiencia();
    this.inicializarModeloFormacion();
    this.listaAgentesExperiencia = null;
    this.listaAgentesFormacion = null;
    this.displayCrearAgenteExperiencia = false;
    this.displayListAgenteExperiencia = true;
    this.displayCrearAgenteFormacion = false;
    this.displayListAgenteFormacion = true;
    this.datos = [];
    this.selectedItemsAreaPrincipal = [];
    this.dataSourceOtrasOcupaciones = [];
    this.tasks = new DataSource({
      store: new ArrayStore({
        key: 'id',
        data: this.tasks1
      })
    });
  }

  inicializarModeloExperiencia() {
    this.agenteExperiencia = {
      AgenteExperienciaId: null,
      AgenteExperienciaCargo: '',
      AgenteExperienciaFechaInicio: '',
      AgenteExperienciaFechaFin: '',
      AgenteExperienciaEntidad: '',
      AgenteExperienciaFechaEdito: '',
      CuentaUsuarioIdEdito: null,
      CuentaUsuarioIdCreacion: null,
      CuentaUsuarioIdGestiona: null,
      AgenteId: this.agente.AgenteId,
      Fotografia: '',
      TipoExperienciaId: null,
      NombreTipoExperiencia: '',
      EstadoRevisionId: null,
      AgenteExperienciaObservaciones: '',
    };
    this.urlImagenExperiencia = '';
    this.valueExperiencia = [];
  }

  inicializarModeloFormacion() {
    this.agenteFormacion = {
      AgenteFormacionId: null,
      AgenteFormacionEstudioRealizado: '',
      AgenteFormacionFechaInicio: '',
      AgenteFormacionFechaFin: '',
      AgenteFormacionInstitucion: '',
      AgenteFormacionFechaEdito: '',
      CuentaUsuarioIdEdito: null,
      CuentaUsuarioIdCreacion: null,
      CuentaUsuarioIdGestiona: null,
      AgenteId: this.agente.AgenteId,
      Fotografia: '',
      NivelFormacionId: null,
      EstadoRevisionId: null,
      AgenteFormacionObservaciones: '',
    };
    this.urlImagenExperiencia = '';
    this.valueFormacion = [];
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

  getPaises() {
    this._tipoReferenciaService.getPaises().subscribe(
      (result) => {
        this.paisesLista = result.Lista;
        this.paisesResidenciaLista = result.Lista;
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
      .getMunicipiosByDepartamento(this.agente.DepartamentoResidenciaId)
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

  mostrarMunicipiosDeNacimiento() {
    this._tipoReferenciaService
      .getMunicipiosByDepartamento(this.agente.DepartamentoNacimientoId)
      .subscribe(
        (result) => {
          this.munNacimientoLista = result.Lista;
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

  onSubmit(isValid: any, paso: string) {
    if (isValid) {
      // if (this.operacion === 'U') {
      //   this.tipoReferenciaService.actualizarValorReferencia(this.valorReferencia)
      //   .subscribe(resp => {
      //     this.showPanel('V', null);
      //     }
      //   );
      // } else
      // if (this.operacion === 'C') {
      this.agente.TipoOcupacion = [];
      for (let i = 0; i < this.selectedItemsAreaPrincipal.length; i++) {
        //this.checkedList[i] = this.selectedItemsAreaPrincipal[i].id;
        //this.checkedList.push(this.selectedItemsAreaPrincipal[i].id);
        this.agente.TipoOcupacion.push(this.selectedItemsAreaPrincipal[i].id);
      }
      this.loading = true;
      //this.agente.TipoOcupacion = this.checkedList;
      this.agente.CuentaUsuarioIdCreacion = this.usuId;
      this.agente.OtrasAreasOcupacion = this.dataSourceOtrasOcupaciones;
      this._agenteService.crearAgente(this.agente).subscribe((resp) => {
        // this.showPanel('V', null);
        this.agente.AgenteId = this._agenteService.AgenteId;
        this.loading = false;
      });

      // debugger;
      // console.log(this.gridOtrasOcupaciones.getDataSource());

      this.registro = false;
      this.experiencia = false;
      this.formacion = false;
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
        this.formacion = true;
        this.EstiloStep1 = 'complete';
        this.EstiloStep2 = 'complete';
        this.EstiloStep3 = 'active';
        this.EstiloStep4 = '';
      }

      // }
    }
  }

  onSubmitExperiencia(isValid: any, paso: any) {
    // debugger;
    // console.log( 'this.valueExperiencia' + this.valueExperiencia);
    if (this.agenteExperiencia.Fotografia === '') {
      Swal.fire(
        'Mensaje',
        'Debe Seleccionar el archivo y hacer clic en el boton subir archivo', 'error'
      );
      return;
    }
    let incorrecto = false;
    let fechaInicio: any;
    const arrayFI: Array<string> = this.agenteExperiencia.AgenteExperienciaFechaInicio.split(
      '/'
    );
    fechaInicio = arrayFI[1] + '/' + arrayFI[0] + '/' + arrayFI[2];
    let fechaFin: any;
    const arrayFF: Array<string> = this.agenteExperiencia.AgenteExperienciaFechaFin.split(
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
        this.agenteExperiencia.AgenteExperienciaFechaFin +
        ' no puede ser menor a la fecha de inicio' +
        fechaInicio
      );
      this.agenteExperiencia.AgenteExperienciaFechaFin = '';
    } else {
      if (isValid) {
        this.agenteExperiencia.EstadoRevisionId = 1221;
        debugger;
        this._agenteService
          .crearAgenteExperiencia(this.agenteExperiencia)
          .subscribe((resp) => {
            this.showPanelExperiencia('V', null);
          });
      }
    }
  }

  CambioFechaExperiencia(e: string) {
    let incorrecto = false;
    let fechaInicio: any;
    const arrayFI: Array<string> = this.agenteExperiencia.AgenteExperienciaFechaInicio.split(
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
      this.agenteExperiencia.AgenteExperienciaFechaFin = '';
    }
  }

  onSubmitFormacion(isValid: any, paso: any) {
    if (this.agenteFormacion.Fotografia === '') {
      Swal.fire(
        'Mensaje',
        'Debe Seleccionar el archivo y hacer clic en el boton subir archivo',
        'error'
      );
      return;
    }
    let incorrecto = false;
    let fechaInicio: any;
    const arrayFI: Array<string> = this.agenteFormacion.AgenteFormacionFechaInicio.split(
      '/'
    );
    fechaInicio = arrayFI[1] + '/' + arrayFI[0] + '/' + arrayFI[2];
    let fechaFin: any;
    const arrayFF: Array<string> = this.agenteFormacion.AgenteFormacionFechaFin.split(
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
        this.agenteFormacion.AgenteFormacionFechaFin +
        ' no puede ser menor a la fecha de inicio' +
        fechaInicio
      );
      this.agenteFormacion.AgenteFormacionFechaFin = '';
    } else {
      if (isValid) {
        this.agenteFormacion.EstadoRevisionId = 1221;
        this._agenteService
          .crearAgenteFormacion(this.agenteFormacion)
          .subscribe((resp) => {
            this.showPanelFormacion('V', null);
          });
      }
    }
  }

  CambioFechaFormacion(e: string) {
    let incorrecto = false;
    let fechaInicio: any;
    const arrayFI: Array<string> = this.agenteFormacion.AgenteFormacionFechaInicio.split(
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
      this.agenteFormacion.AgenteFormacionFechaFin = '';
    }
  }

  cambioCkedDiscapacidad() {
    this.agente.AgentePoseeAlgunaDiscapacidad = !this.agente
      .AgentePoseeAlgunaDiscapacidad;
    this.agente.DiscapacidadId = null;
  }

  cambioCkedAgenteTrabajoEnCalleRecurrentemente() {
    this.agente.AgenteTrabajoEnCalleRecurrentemente = !this.agente
      .AgenteTrabajoEnCalleRecurrentemente;
  }

  getAgenteById(id: any) {
    this.loading = true;
    this._agenteService.getAgenteByAgenteId(id).subscribe(
      (result) => {
        this.agente = result;
        // for (let i = 0; i < this.agente.TipoOcupacion.length; i++) {
        //   this.setPublicoDirigidoCheck(this.agente.TipoOcupacion[i]);
        // }

        this.cargarTiposOcupacion();

        // tslint:disable-next-line:max-line-length
        this.dataSourceOtrasOcupaciones = this.agente.OtrasAreasOcupacion; // .map(elm => ({ AgenteOcupacionId: elm.AgenteOcupacionId, AgenteId: elm.AgenteId, OtrasAreasId: elm.OtrasAreasId, TipoOcupacionId: elm.TipoOcupacionId }));

        // console.log('llega del agente');
        // console.log(this.agente.OtrasAreasOcupacion['Lista']);
        this.urlImagen = this.agente.AgenteUrl + this.agente.Fotografia;
        // (this.agente.Fotografia);

        this.mostrarMunicipios();
        this.mostrarMunicipiosDeNacimiento();
        this.cargarAgentesExperiencia(this.agente.AgenteId);
        this.cargarAgentesFormacion(this.agente.AgenteId);
        if (this.agente.AgenteSeguridadSocialId === 3376) {
          this.mostrarPuntaje = true;
        } else {
          this.mostrarPuntaje = false;
        }

        this.loading = false;
      },
      (error) => {
        // this.error = error;
        // if (error.statusText === 'Unauthorized') {
        //     this.servicePNotify.error('TYC', 'Se perdio la sesión, por favor loguearse de nuevo', '');
        //     this.authenticationService.logout().subscribe(response => { });
        //     this.storageService.logout();
        // }
        this.loading = false;
        console.log(<any>error);
      }
    );

    // this._agenteService.getAgentesOtrasocupaciones(id).subscribe(
    //   (result) => {
    //     //this.dataSourceOtrasOcupaciones = result.Lista;
    //     // tslint:disable-next-line:max-line-length
    //     // tslint:disable-next-line:max-line-length
    //     this.dataSourceOtrasOcupaciones = result.Lista.map(elm => ({ AgenteOcupacionId: elm.AgenteOcupacionId, AgenteId: elm.AgenteId, OtrasAreasId: elm.OtrasAreasId, TipoOcupacionId: elm.TipoOcupacionId }));
    //     console.log('llega de la consulta y es la que funcionar');
    //     console.log(this.dataSourceOtrasOcupaciones);
    //   },
    //   (error) => {
    //     // this.error = error;
    //     // if (error.statusText === 'Unauthorized') {
    //     //     this.servicePNotify.error('TYC', 'Se perdio la sesión, por favor loguearse de nuevo', '');
    //     //     this.authenticationService.logout().subscribe(response => { });
    //     //     this.storageService.logout();
    //     // }
    //     this.loading = true;
    //     console.log(<any>error);
    //   }
    // );
    // debugger;


  }

  getAgenteExperienciaById(id: any) {
    this._agenteService.getAgenteExperienciaByAgenteId(id).subscribe(
      (result) => {
        this.agenteExperiencia = result;
        this.urlImagenExperiencia = this.agenteExperiencia.Fotografia;
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

  getAgenteFormacionById(id: any) {
    this._agenteService.getAgenteFormacionByAgenteId(id).subscribe(
      (result) => {
        this.agenteFormacion = result;
        this.urlImagenFormacion = this.agenteFormacion.Fotografia;
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

  setPublicoDirigidoCheck(id: number) {
    for (let i = 0; i < this.ocupacionLista.length; i++) {
      const item = this.ocupacionLista[i];
      if (item.idValorReferencia === id) {
        item.checked = true;
        break;
      }
    }
  }

  // transformAmount(element){
  //   this.agente.AgenteIngresosMensuales = this.currencyPipe.transform(this.agente.AgenteIngresosMensuales, '$');
  //   element.target.value = this.agente.AgenteIngresosMensuales;
  // }
}

export class Appointment {
  public AgenteId: number;
  public TipoIdentificacionId: number;
  public AgenteTipoId: number;
  public AgenteNumeroIdentificacion: string;
  public AgentePrimerNombre: string;
  public AgenteSegundoNombre: string;
  public AgentePrimerApellido: string;
  public AgenteSegundoApellido: string;
  public AgenteGenero: number;
  public AgenteDireccion: string;
  public AgenteTelefonoFijo: string;
  public AgenteTelefonoMovil: string;
  public AgenteEmail: string;
  public AgenteFechaRegistro: string;

  public MunicipioResidenciaId: number;
  public MunicipioResidenciaNombre: string;

  public AgenteFechaAprobacion: string;
  public AgenteObservaciones: string;
  public AgenteFechaEdito: string;
  public CuentaUsuarioIdEdito: number;
  public CuentaUsuarioIdCreacion: number;
  public CuentaUsuarioIdGestiona: number;
  public AgenteEstadoId: number;
  public AgenteFechaNacimiento: string;
  public MunicipioNacimientoId: number;
  public MunicipioNacimiento: string;
  public DepartamentoResidenciaId: number;
  public PaisIdNacimiento: number;
  public PaisIdResidencia: number;
  public AgenteCiudadNacimiento: string;
  public AgenteCiudadresidencia: string;

  public DepartamentoRecidenciaNombre: string;

  public DepartamentoNacimientoId: number;
  public TipoOcupacion: Array<any>;
  public AgenteUrl: string;
  public AgenteAlias: string;
  public AreaId: number;
  public AgenteOrigenInformacionId: number;
  public Fotografia: string;
  public AgentePoseeAlgunaDiscapacidad: boolean;
  public DiscapacidadId: number;
  public PefilFacebook: string;
  public PerfilTwitter: string;
  public PaginaWeb: string;
  public CanalYoutube: string;
  public PerfilSoundCloud: string;
  public PerfilFlickr: string;
  public PerfilInstagram: string;
  public EstadoNombre: string;
  public AgenteEstrato: number;
  public AgentePuntajeSisben: number;
  public AgenteIngresosMensuales: number;
  public AgenteSeguridadSocialId: number;
}




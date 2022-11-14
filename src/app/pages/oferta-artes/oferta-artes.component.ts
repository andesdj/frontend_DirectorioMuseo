import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';
import { UsuarioService, TipoReferenciaService } from 'src/app/services/service.index';
import { IOption } from 'ng-select';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';

@Component({
  selector: 'app-oferta-artes',
  templateUrl: './oferta-artes.component.html',
  styleUrls: ['./oferta-artes.component.css']
})
export class OfertaArtesComponent implements AfterViewInit {
  @ViewChild(DxPivotGridComponent, {static: false}) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent, {static: false}) chart: DxChartComponent;
  
  @ViewChild('ngxLoading', { static: false }) ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', { static: false }) customLoadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = PrimaryRed;
  public secondaryColour = SecondaryBlue;
  public coloursEnabled = true;
  public loadingTemplate: TemplateRef<any>;
  // tslint:disable-next-line: max-line-length
  public config = { animationType: ngxLoadingAnimationTypes.none, primaryColour: this.primaryColour, secondaryColour: this.secondaryColour, tertiaryColour: this.primaryColour, backdropBorderRadius: '3px' };




  dataSource: any;
  appointmentsData: Appointment[];
  appointmentsMapaData: Appointment[];
  programa: Programa;
  public AreaId: string;
  public AnoId: string;
  public DireccionId: string;
  ProgramaNombre: string;
  public OfertaProgramaId: string;
  public areasLista: Array<IOption>;
  public direccionesLista: Array<IOption>;
  public programasLista: Array<IOption>;
  public AnosLista: Array<IOption>;
   


  title = 'Mapa Oferta';
  lat: number = 5.065781;
  lng: number = -75.507820;
  zoom: number = 6;
  loading = false;



  constructor(public _usuarioService: UsuarioService, public  _tipoReferenciaService: TipoReferenciaService) {
    this.AreaId = '0';
    this.AnoId = '0';
    this.OfertaProgramaId = '0';
    this.DireccionId = '0';
    this.customizeTooltip = this.customizeTooltip.bind(this);
    this.limpiarFicha();
   }



  public toggleColours(): void {
    this.coloursEnabled = !this.coloursEnabled;

    if (this.coloursEnabled) {
      this.primaryColour = PrimaryRed;
      this.secondaryColour = SecondaryBlue;
    } else {
      this.primaryColour = PrimaryWhite;
      this.secondaryColour = SecondaryGrey;
    }
  }

  toggleTemplate(): void {
    if (this.loadingTemplate) {
      this.loadingTemplate = null;
    } else {
      this.loadingTemplate = this.customLoadingTemplate;
    }
  }

   ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: 'splitPanes',
      alternateDataFields: false
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
    //this.cargarPrograma();
    this.getDirecciones();
    this.getAnos();
    //this.cargarOferta();
  }

   getAreas() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorIdPadre(this.DireccionId).subscribe(
        result => {
            this.areasLista = result.Lista;
            this.cargarOferta();
            this.programasLista = [];
            this.OfertaProgramaId = '0';
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


  cargarPrograma() {
    this._tipoReferenciaService.getOfertaPrograma(this.AreaId)
              .subscribe(
                (resp: any) => {
                 this.programasLista = resp.Lista;
                 this.cargarOferta();
              });
              //this.cargarMapa();
  }

  CargarOfertaProgramaByOfertaProgramaId() {
    this._tipoReferenciaService.getOfertaProgramaByOfertaProgramaId(this.OfertaProgramaId).subscribe(
        result => {
        this.programa = result;
        console.log(this.programa);
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

limpiarFicha() {
  // tslint:disable-next-line: no-use-before-declare
  this.programa = new Programa(null, '', '', '', '', '', '', '', '', '', '', null, null, null, null, null, null, null, null, null );
}

  customizeTooltip(args) {
    return {
      html: args.seriesName + ' | Total<div class=\'currency\'>' + args.valueText + '</div>'
    };
  }

  cargarFicha() {

    this.dataSource = {
      fields: [
      {
        dataField: 'AREA',
        dataType: 'AREA',
        area: 'column'
    },
    {
      caption: 'Componente Programa',
      dataField: 'ComponentePrograma',
      width: 150,
      area: 'column'
  },
  {
    caption: 'Programa',
    dataField: 'ProgramaNombre',
    width: 150,
    area: 'column'
  },
    {
      caption: 'Departamento',
      dataField: 'DEPARTAMENTO',
      area: 'row'
  },
  {
    caption: 'Ciudad',
    dataField: 'MUNICIPIO',
    area: 'row'
},
{
  caption: 'Municipio PDET',
  dataField: 'Municipio_PDET',
  width: 150,
  area: 'filter'
},
{
caption: 'Municipio AFRO',
dataField: 'Municipio_Afro',
width: 150,
area: 'filter'
},
{
caption: 'Municipio Frontera',
dataField: 'Municipio_Frontera',
width: 150,
area: 'filter'
},
{
caption: 'Región Caribe',
dataField: 'REGION_CARIBE',
width: 150,
area: 'filter'
},
{
caption: 'Región Centro Oriente',
dataField: 'REGION_CENTRO_ORIENTE',
width: 150,
area: 'filter'
},
{
caption: 'Región Centro Sur Amazonía',
dataField: 'REGION_CENTRO_SUR_AMAZONIA',
width: 150,
area: 'filter'
},
{
caption: 'Región del LLano',
dataField: 'REGION_DEL_LLANO',
width: 150,
area: 'filter'
},
{
caption: 'Región Eje Cafetero',
dataField: 'REGION_EJE_CAFETERO',
width: 150,
area: 'filter'
},
{
caption: 'Región Pacífico',
dataField: 'REGION_PACIFICO',
width: 150,
area: 'filter'
},
{
  caption: 'ZEII',
  dataField: 'ZEII',
  width: 150,
  area: 'filter'
  },
  {
    caption: 'Dirección',
    dataField: 'Direccion',
    width: 150,
    area: 'filter'
    },
      {
          caption: 'Programa Inversión',
          dataField: 'ProgramaInversion',
          dataType: 'number',
          summaryType: 'sum',
          format: 'currency',
          area: 'data'
      },
      {
        caption: 'Beneficiarios',
        dataField: 'OfertaProgramaRegionalizadoCantidadBeneficiarios',
        dataType: 'number',
        summaryType: 'sum',
        format: 'fixedPoint',
        area: 'data'
    },
    {
      caption: 'Cofinanciación Actividades',
      dataField: 'OfertaProgramaRegionalizadoCofinanciacion',
      dataType: 'number',
      summaryType: 'sum',
      format: 'currency'
  },
  {
    caption: 'Contrapartidas Actividades',
    dataField: 'OfertaProgramaRegionalizadoContrapartida',
    dataType: 'number',
    summaryType: 'sum',
    format: 'currency'
},
{
  caption: 'Aplazamientos Actividades',
  dataField: 'OfertaProgramaRegionalizadoRecursoAplazado',
  dataType: 'number',
  summaryType: 'sum',
  format: 'currency'
},
    ],
      store: this.appointmentsData
  };
  }

  public showAlert(): void {
    alert('ngx-loading rocks!');
  }

  cargarOferta() {
    if (this.OfertaProgramaId === '0') {
      this.limpiarFicha();
    } else {
    this.CargarOfertaProgramaByOfertaProgramaId();
    }
    this.loading = true;

    this._usuarioService.cargarOferta(this.AreaId, this.OfertaProgramaId, this.AnoId, this.DireccionId) // MunicipioId
              .subscribe(
                (resp: any) => {
                 this.appointmentsData = resp.Lista;
                 this.loading = false;
                this.cargarFicha();
               // this.cargardatosMapa();
              }, err => {
                this.loading = false;
                // ...
            });

  }

  async cargardatosMapa(){
this.appointmentsMapaData = await this.cargarMapa();
   }

     cargarMapa() {
      // debugger;
      // let algo: any;
      // algo = await this._usuarioService.cargarOfertaMapa(this.AreaId, this.OfertaProgramaId); // MunicipioId
      let _appointmentsMapaData: Appointment[];
      _appointmentsMapaData = this.appointmentsData;
       if (_appointmentsMapaData !== null) {
         for (let i = 0; i < _appointmentsMapaData.length; i++) {
           _appointmentsMapaData[i].Latitud = String((Number(_appointmentsMapaData[i].Latitud)) +  (Math.random() - .5) / 1500);
           // tslint:disable-next-line: max-line-length
           _appointmentsMapaData[i].Longitud = String((Number(_appointmentsMapaData[i].Longitud)) +  (Math.random() - .5) / 1500);
           // tslint:disable-next-line: max-line-length
           // this.appointmentsData[i].NombreCompleto = this.appointmentsData[i].Nombres + ' ' + this.appointmentsData[i].Apellidos;
           // tslint:disable-next-line: max-line-length
           // this.appointmentsData[i].Legalizacion_ValorUtilizado_Viaticos = this.appointmentsData[i].Legalizacion_ValorUtilizado_Viaticos + this.appointmentsData[i].Legalizacion_ValorUtilizado_GastosComision;
         }
         return _appointmentsMapaData;
     }
  }



}

export class Appointment {
  DEPARTAMENTO: string;
  MUNICIPIO: string;
  ProgramaNombre: string;
  Componente: string;
  ANO: string;
  AREA: string;
  ESTADO_PROGRAMA: string;
  Latitud: string;
  Longitud: string;
  ProgramaInversion: number;
}


export class Programa {
  constructor(
    public OfertaProgramaId: number,
    public ProgramaNombre: string,
    public AREA: string,
    public Componente: string,
    public OfertaProgramaRegionalizadoNombreBeneficiario: string,
    public OfertaProgramaRegionalizadoCantidadBeneficiarios: string,
    public ANO: string,
    public ProgramaDescripcion: string,
    public EstadoInformacion: string,
    public EstadoProceso: string,
    public ProgramaCompromisos: string,
    public ProgramaInversion: number,
    public InversionRegionalizado: number,
    public ProgramaCofinanciacion: number,
    public CofinanciacionRegionalizado: number,
    public OfertaProgramaRecursoAplazado: number,
    public AplazamientoRegionalizado: number,
    public ProgramaContrapartida: number,
    public ContrapartidaRegionalizado: number,
    public beneficiariosRegionalizado: number,

  ) { }
}

export class OfertaPrograma {
  constructor(
        public  OfertaProgramaId: number,
        public  ProgramaNombre: string,
        public  AREA: string,
        public  Componente: string,
        public  ANO: string,
        public  ProgramaDescripcion: string,
        public  ProgramaCompromisos: string,
        public  ProgramaInversion,
        public  EstadoProceso: string,
        public  EstadoInformacion: string,
        public  ProgramaCofinanciacion: number,
        public  OfertaProgramaRecursoAplazado: number,
        public  ProgramaContrapartida: number,
        public  CofinanciacionRegionalizado: number,
        public  AplazamientoRegionalizado: number,
        public  ContrapartidaRegionalizado: number,
        public  InversionRegionalizado: number,
        public  beneficiariosRegionalizado: number,
        public  OfertaObjetivoMCId: number,
        public  AreaId: number,
        public  ComponenteId: number,
        public  AnoId: number,
        public  EstadoProgramaId: number,
        public  EstadoInformacionId: number,
        public  DescripcionEstadoInformacion: string,
  ) { }
}

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';
import { UsuarioService, TipoReferenciaService } from 'src/app/services/service.index';
import { IOption } from 'ng-select';

@Component({
  selector: 'app-concertacion-a',
  templateUrl: './concertacion-a.component.html',
  styleUrls: ['./concertacion-a.component.css']
})
export class ConcertacionAComponent implements AfterViewInit {
  @ViewChild(DxPivotGridComponent, {static: false}) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent, {static: false}) chart: DxChartComponent;
  appointmentsData: Appointment[];
  appointmentsMapaData: Appointment[];
  dataSource: any;
  public AnosLista: Array<IOption>;
  public AnoId: string;
  title = 'Mapa Concertación';
  lat: number = 5.065781;
  lng: number = -75.507820;
  zoom: number = 6;

  constructor(public _usuarioService: UsuarioService, public  _tipoReferenciaService: TipoReferenciaService) {
    this.customizeTooltip = this.customizeTooltip.bind(this);
   }

   ngAfterViewInit() {

    this.getAnos();

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

  customizeTooltip(args) {
    return {
      html: args.seriesName + ' | Total<div class=\'currency\'>' + args.valueText + '</div>'
    };
  }

  cargarFicha() {
    this.dataSource = {
      fields: [
        {
          caption: 'Linea',
          dataField: 'Linea',
          width: 150,
          area: 'row'
        },
      {
        caption: 'Municipio_de_Realización',
        width: 120,
        dataField: 'Municipio_de_Realizacion',
        area: 'row'
    },
      {
          caption: 'Registro',
          dataField: 'Registro',
          width: 150,
          area: 'filter'
      },
      {
        caption: 'Categoría',
        dataField: 'Categoria',
        width: 150,
        area: 'filter'
    },
    {
      caption: 'Area',
      dataField: 'Area',
      width: 150,
      area: 'filter'
  },
  {
    caption: 'Sector',
    dataField: 'Sector',
    width: 150,
    area: 'filter'
},
{
  caption: 'Departamento_de_Realización',
  width: 120,
  dataField: 'Departamento_de_Realizacion',
  area: 'column'
},

      {
        caption: 'Entidad_Proponente',
        dataField: 'Entidad_Proponente',
        width: 150,
        area: 'column'
    },
    {
      caption: 'Proyecto',
      dataField: 'Proyecto',
      width: 150,
      area: 'column'
  },

      {
          caption: 'Valor_Aprobado',
          dataField: 'Valor_Aprobado',
          dataType: 'number',
          summaryType: 'sum',
          format: 'currency',
          area: 'data'
      }],
      store: this.appointmentsData
  };
  }

  cargarInformacion() {
    this._tipoReferenciaService.getConcertacionA(this.AnoId) // MunicipioId
              .subscribe(
                (resp: any) => {
                  debugger;
                 this.appointmentsData = resp.Lista;
                 console.log(this.appointmentsData);
                this.cargarFicha();
              });
}

  ngOnInit() {
    this.cargarInformacion();
  }

  async cargardatosMapa(){
    this.appointmentsMapaData = await this.cargarMapa();
       }
    
         cargarMapa() {
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
  Departamento_de_Realizacion: string;
  Municipio_de_Realizacion: string;
  Registro: string;
  Entidad_Proponente: string;
  Proyecto: string;
  Categoria: string;
  Linea: string;
  Area: string;
  Sector: string;
  Valor_Aprobado: number;
  Latitud: string;
  Longitud: string;
}

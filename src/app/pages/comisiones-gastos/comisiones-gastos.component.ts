import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';
import { UsuarioService, TipoReferenciaService } from 'src/app/services/service.index';
import { IOption } from 'ng-select';


@Component({
  selector: 'app-comisiones-gastos',
  templateUrl: './comisiones-gastos.component.html',
  styles: []
})
export class ComisionesGastosComponent implements AfterViewInit {
  @ViewChild(DxPivotGridComponent, {static: false}) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent, {static: false}) chart: DxChartComponent;
  appointmentsData: Appointment[];
  dataSource: any;
  public AreaId: string;
  public MunicipioId: string;
  public ZON_ID_DEP: string;
  public depLista: Array<IOption>;
  public areasLista: Array<IOption>;
  public munLista: Array<IOption>;

  constructor(public _usuarioService: UsuarioService, public  _tipoReferenciaService: TipoReferenciaService) {
    this.AreaId = '0';
    this.ZON_ID_DEP = '0';
    this.MunicipioId = '0';
    this.customizeTooltip = this.customizeTooltip.bind(this);
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
  }

  ngOnInit() {
    this.getAreas();
      this.getDep();
    this.cargarComisiones();
  }

  getAreas() {
    this._usuarioService.cargarDependenciasComisiones( )
              .subscribe(
                (resp: any) => {
                //console.log(resp);
                //debugger;
                // this.totalRegistros = resp.total;
                 //this.usuarios = resp.usuarios;
                 this.areasLista = resp.Lista;
                // this.cargando = false;
              });

  }
  getDep() {
    this._tipoReferenciaService.getDepartamentosComisiones().subscribe(
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
  this._tipoReferenciaService.getMunicipiosComisionesByDep(this.ZON_ID_DEP).subscribe(
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

  customizeTooltip(args) {
    return {
      html: args.seriesName + ' | Total<div class=\'currency\'>' + args.valueText + '</div>'
    };
  }

  cargarFicha() {
    this.dataSource = {
      fields: [{
          caption: 'Departamento',
          width: 120,
          dataField: 'Departamento',
          area: 'row'
      },
      {
          caption: 'Ciudad',
          dataField: 'Ciudad',
          width: 150,
          area: 'filter'
      },
      {
        caption: 'NombreCompleto',
        dataField: 'NombreCompleto',
        width: 150,
        area: 'filter'
    },
    {
      caption: 'Estado Comision',
      dataField: 'EstadoComision',
      width: 150,
      area: 'filter'
  },
  {
    caption: 'FechaSalida',
    dataField: 'FechaSalida',
    width: 150,
    dataType: Date,
    area: 'filter'
},
{
  caption: 'FechaRegreso',
  dataField: 'FechaRegreso',
  dataType: Date,
  width: 150,
  area: 'filter'
},
      {
        dataField: 'DepedenciaDetalle',
        dataType: 'DepedenciaDetalle',
        area: 'column'
    },
      {
          caption: 'Legalizacion_ValorUtilizado_Viaticos',
          dataField: 'Legalizacion_ValorUtilizado_Viaticos',
          dataType: 'number',
          summaryType: 'sum',
          format: 'currency',
          area: 'data'
      }],
      store: this.appointmentsData
  };
  }

  cargarComisiones() {
    this.mostrarMunicipios();
    this._usuarioService.cargarComisiones(this.AreaId, this.ZON_ID_DEP, this.MunicipioId) // MunicipioId
              .subscribe(
                (resp: any) => {
                 this.appointmentsData = resp.Lista;
                 if (this.appointmentsData !== null) {
                    for (let i = 0; i < this.appointmentsData.length; i++) {
                      this.appointmentsData[i].Latitud = String((Number(this.appointmentsData[i].Latitud)) +  (Math.random() - .5) / 1500);
                      // tslint:disable-next-line:max-line-length
                      this.appointmentsData[i].Longitud = String((Number(this.appointmentsData[i].Longitud)) +  (Math.random() - .5) / 1500);
                      //this.appointmentsData[i].Mes = this.appointmentsData[i].startDate.getMonth().toString();
                      this.appointmentsData[i].NombreCompleto = this.appointmentsData[i].Nombres + ' ' + this.appointmentsData[i].Apellidos;
                      // tslint:disable-next-line:max-line-length
                      this.appointmentsData[i].Legalizacion_ValorUtilizado_Viaticos = this.appointmentsData[i].Legalizacion_ValorUtilizado_Viaticos + this.appointmentsData[i].Legalizacion_ValorUtilizado_GastosComision;
                    }
                }
                this.cargarFicha();
              });
  }
}

export class Appointment {
  Departamento: string;
  startDate: Date;
  endDate: Date;
  FechaSalida: Date;
  FechaRegreso: Date;
  Ciudad: string;
  Mes: string;
  NombreCompleto: string;
  Nombres: string;
  Apellidos: string;
  EstadoComision: string;
  idDependencia: number[];
  Latitud: string;
  Longitud: string;
  Legalizacion_ValorUtilizado_Viaticos: number;
  Legalizacion_ValorUtilizado_GastosComision: number;
}

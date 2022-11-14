import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';
import { UsuarioService, TipoReferenciaService } from 'src/app/services/service.index';

@Component({
  selector: 'app-concertacion',
  templateUrl: './concertacion.component.html',
  styles: []
})
export class ConcertacionComponent implements AfterViewInit {
  @ViewChild(DxPivotGridComponent, {static: false}) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent, {static: false}) chart: DxChartComponent;
  appointmentsData: Appointment[];
  dataSource: any;

  constructor(public _usuarioService: UsuarioService, public  _tipoReferenciaService: TipoReferenciaService) {
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
          dataField: 'NombreDepartamentoProyecto',
          area: 'row'
      },
      {
          caption: 'Ciudad',
          dataField: 'NombreMunicipioProyecto',
          width: 150,
          area: 'filter'
      },
      {
        caption: 'Vigencia',
        dataField: 'Vigencia',
        width: 150,
        area: 'filter'
    },
      {
        caption: 'Area',
        dataField: 'Area',
        width: 150,
        area: 'column'
    },
    {
      caption: 'LineaProyecto',
      dataField: 'LineaProyecto',
      width: 150,
      area: 'filter'
  },

      {
          caption: 'ValorMinisterio',
          dataField: 'ValorMinisterio',
          dataType: 'number',
          summaryType: 'sum',
          format: 'currency',
          area: 'data'
      }],
      store: this.appointmentsData
  };
  }

  cargarComisiones() {
    this._tipoReferenciaService.getConcertacion(1) // MunicipioId
              .subscribe(
                (resp: any) => {
                 this.appointmentsData = resp.Proyectos;
                this.cargarFicha();
              });
}

  ngOnInit() {
    this.cargarComisiones();
  }

}


export class Appointment {
  NombreDepartamentoProyecto: string;

  NombreMunicipioProyecto: string;
  TipoProponente: string;
  EstadoProyecto: string;
  LineaProyecto: string;
  Area: string;
  Vigencia: number;
  ValorMinisterio: number;
  NumeroBeneficiarios: number;
}


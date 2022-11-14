import { Component, OnInit,  AfterViewInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { DxPivotGridComponent, DxChartComponent, DxPieChartComponent } from 'devextreme-angular';
import { debug } from 'util';

@Component({
  selector: 'app-ficha-general',
  templateUrl: './ficha-general.component.html',
  styles: []
})
export class FichaGeneralComponent implements AfterViewInit {
  //@ViewChild(DxPivotGridComponent, { read: false }) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent, {static: false}) chart: DxChartComponent;

  @ViewChild(DxPieChartComponent, {static: false}) pieChart: DxPieChartComponent;
  listaFichaGeneral = [];
  grafico: FichaGeneral[];
  dataSource: any;
   goldMedals: Medals[] = [{
    country: "China",
    medals: 51
}, {
    country: "USA",
    medals: 36
}, {
    country: "Russia",
    medals: 22
}, {
    country: "UK",
    medals: 19
}, {
    country: "Germany",
    medals: 16
}, {
    country: "Australia",
    medals: 14
}, {
    country: "South Korea",
    medals: 13
}, {
    country: "France",
    medals: 7
}];

  constructor(public _usuarioService: UsuarioService) {
    this.cargarFicha();
    this.cargarFichaGeneral();
    //this.customizeTooltip = this.customizeTooltip.bind(this);
    this.cargarFichaGeneralGrafico();
    //console.log(this.goldMedals);
   }

  //ngOnInit() {
    //this.cargarFichaGeneral();

  //}

  ngAfterViewInit() {
    //this.pivotGrid.instance.bindChart(this.chart.instance, {
      //dataFieldsDisplayMode: 'splitPanes',
      //alternateDataFields: false
    // });

    // setTimeout(() => {
    //     // tslint:disable-next-line:prefer-const
    //     var dataSource = this.pivotGrid.instance.getDataSource();
    //     dataSource.expandHeaderItem('row', ['North America']);
    //     dataSource.expandHeaderItem('column', [2013]);
    // }, 0);
  }

  citySelector(data) {
    return data.MunicipioNombre + ' (' + data.MunicipioNombre + ')';
}

cargarFicha() {
  // debugger;
  this._usuarioService.cargarFichaGeneralDatos();
    this.dataSource = {
      fields: [{
          caption: 'DepartamentoNombre',
          width: 120,
          dataField: 'DepartamentoNombre',
          area: 'row'
      },
      {
          caption: 'MunicipioNombre',
          dataField: 'MunicipioNombre',
          width: 150,
          area: 'row',
          selector: this.citySelector
      },
      {
          dataField: 'ANO',
          dataType: 'string',
          area: 'column'
      },
      {
        dataField: 'AREA',
        dataType: 'AREA',
        area: 'column'
    },
      {
          caption: 'Inversion',
          dataField: 'Inversion',
          dataType: 'number',
          summaryType: 'sum',
          format: 'currency',
          area: 'data'
      }],
      store: this._usuarioService.fichaGeneral
  };
}

cargarFichaGeneralGrafico() {
  this._usuarioService.cargarFichaGeneralGrafico( )
            .subscribe(
              (resp: any) => {
              debugger;
               this.grafico = resp.Lista;
               console.log(this.grafico);
            });
}

  cargarFichaGeneral() {
    //intSalida: Number;
    this._usuarioService.cargarFichaGeneral( )
              .subscribe(
                (resp: any) => {
                 this.listaFichaGeneral = resp.Lista;
              });
  }

  customizeTooltip(args) {
    return {
      html: args.seriesName + ' | Total<div class=\'currency\'>' + args.valueText + '</div>'
    };
  }

}

export class FichaGeneral {
  Id: number;
  DepartamentoNombre: string;
  MunicipioNombre: string;
  Ficha: string;
  Inversion: number;
  ANO: string;
  Area: string;
}

export class Medals {
  country: string;
  medals: number;
}


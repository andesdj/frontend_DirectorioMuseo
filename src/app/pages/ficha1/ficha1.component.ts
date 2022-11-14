import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { IOption } from 'ng-select';
import { TipoReferenciaService, UsuarioService } from 'src/app/services/service.index';
import { UrlReportes } from '../../config/config';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';
import { Formacion, Dotacion, ProyectosEspeciales, VisitasAsesorias, ProcesosFormacion } from '../../models/valorReferencia.model';

@Component({
  selector: 'app-ficha1',
  templateUrl: './ficha1.component.html',
  styleUrls: ['./ficha1.component.css']
})
export class Ficha1Component implements AfterViewInit {
  @ViewChild(DxPivotGridComponent, {static: false}) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent, {static: false}) chart: DxChartComponent;

  public depLista: Array<IOption>;
  public munLista: Array<IOption>;
  public anosLista: Array<IOption>;
  public areasLista: Array<IOption>;
  listaFormacion: any;
  public AnoId: string ;
  public AreaId: string;
  public TipoFichaId;

  public ZON_ID_DEP: string;
  public ZON_ID: string;
  public urlRptPresProp: string;
  dataSource: any;

  formacion: Formacion[];
  dotacion: Dotacion[];
  proyectosEspeciales: ProyectosEspeciales[];
  visitasAsesorias: VisitasAsesorias[];
  procesosFormacion: ProcesosFormacion[];
  tipoFicha: Array<any>;


  

  constructor(public _tipoReferenciaService: TipoReferenciaService, public _usuarioService: UsuarioService) {
    // tslint:disable-next-line:max-line-length
    this.tipoFicha = [{ Id: 1, Nombre: 'Formación' }, { Id: 2, Nombre: 'Dotación' }, { Id: 3, Nombre: 'Proyectos Especiales' }, { Id: 4, Nombre: 'Visitas Asesorias' }, { Id: 5, Nombre: 'Ficha Procesos de Formación' }];
    this.ZON_ID_DEP = '0';
    this.ZON_ID = '0';
    this.AreaId = '0';
    this.AnoId = '0';
    // tslint:disable-next-line:max-line-length
    this.urlRptPresProp = UrlReportes + '/PageFichaArtes1.aspx?d=' + this.ZON_ID_DEP + '&m=' + this.ZON_ID + '&ar=' + this.AreaId + '&an=' + this.AnoId;
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
        dataSource.expandHeaderItem('row', ['North America']);
        dataSource.expandHeaderItem('column', [2013]);
    }, 0);
  }

  customizeTooltip(args) {
    return {
      html: args.seriesName + ' | Total<div class=\'currency\'>' + args.valueText + '</div>'
    };
  }

  citySelector(data) {
    return data.MunicipioNombre + ' (' + data.MunicipioNombre + ')';
}

  ngOnInit() {
    this.getDep(); // Cargar departamentos
    this.getAnos();
    this.getAreas();
    this.cargarDatosFormacion();
    this.cargarDatosDotacion();
    this.cargarDatosProyectosEspeciales();
    this.cargarDatosVisitasAsesorias();
    this.cargarDatosProcesosFormacion();
  }

  cargarDatosFormacion() {
    this._usuarioService.cargarFormacion()
              .subscribe(
                (resp: any) => {
                  this.formacion = resp.Lista;

              });
  }

  cargarDatosDotacion() {
    this._usuarioService.cargarDotacion()
              .subscribe(
                (resp: any) => {
                  this.dotacion = resp.Lista;

              });
  }

  cargarDatosProyectosEspeciales() {
    this._usuarioService.cargarProyectosEspeciales()
              .subscribe(
                (resp: any) => {
                  this.proyectosEspeciales = resp.Lista;

              });
  }

  cargarDatosVisitasAsesorias() {
    this._usuarioService.cargarVisitasAsesorias()
              .subscribe(
                (resp: any) => {
                  this.visitasAsesorias = resp.Lista;

              });
  }

  cargarDatosProcesosFormacion() {
    this._usuarioService.cargarProcesosFormacion()
              .subscribe(
                (resp: any) => {
                  this.procesosFormacion = resp.Lista;

              });
  }

  cargarFicha() {
    if ( this.TipoFichaId === 1) {
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
            caption: 'MUNICIPIO PDET',
            dataField: 'Municipio_PDET',
            width: 150,
            area: 'filter'
        },{
          caption: 'MUNICIPIO AFRO',
          dataField: 'Municipio_Afro',
          width: 150,
          area: 'filter'
      },
        {
          caption: 'MUNICIPIO FRONTERA',
          dataField: 'Municipio_Frontera',
          width: 150,
          area: 'filter'
      },
      {
        caption: 'REGION CARIBE',
        dataField: 'REGION_CARIBE',
        width: 150,
        area: 'filter'
    },
    {
      caption: 'REGION CENTRO ORIENTE',
      dataField: 'REGION_CENTRO_ORIENTE',
      width: 150,
      area: 'filter'
  },
  {
    caption: 'REGION CENTRO SUR AMAZONIA',
    dataField: 'REGION_CENTRO_SUR_AMAZONIA',
    width: 150,
    area: 'filter'
},
{
  caption: 'REGION DEL LLANO',
  dataField: 'REGION_DEL_LLANO',
  width: 150,
  area: 'filter'
},
{
  caption: 'REGION EJE CAFETERO',
  dataField: 'REGION_EJE_CAFETERO',
  width: 150,
  area: 'filter'
},
{
  caption: 'REGION PACIFICO',
  dataField: 'REGION_PACIFICO',
  width: 150,
  area: 'filter'
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
        store: this.formacion
    };
    } else if (this.TipoFichaId === 2) {
      this.dataSource = {
        fields: [{
          caption: 'AREA',
          width: 120,
          dataField: 'AREA',
          area: 'row'
        },
          {
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
          caption: 'MUNICIPIO PDET',
          dataField: 'Municipio_PDET',
          width: 150,
          area: 'filter'
      },{
        caption: 'MUNICIPIO AFRO',
        dataField: 'Municipio_Afro',
        width: 150,
        area: 'filter'
    },
      {
        caption: 'MUNICIPIO FRONTERA',
        dataField: 'Municipio_Frontera',
        width: 150,
        area: 'filter'
    },
    {
      caption: 'REGION CARIBE',
      dataField: 'REGION_CARIBE',
      width: 150,
      area: 'filter'
  },
  {
    caption: 'REGION CENTRO ORIENTE',
    dataField: 'REGION_CENTRO_ORIENTE',
    width: 150,
    area: 'filter'
},
{
  caption: 'REGION CENTRO SUR AMAZONIA',
  dataField: 'REGION_CENTRO_SUR_AMAZONIA',
  width: 150,
  area: 'filter'
},
{
caption: 'REGION DEL LLANO',
dataField: 'REGION_DEL_LLANO',
width: 150,
area: 'filter'
},
{
caption: 'REGION EJE CAFETERO',
dataField: 'REGION_EJE_CAFETERO',
width: 150,
area: 'filter'
},
{
caption: 'REGION PACIFICO',
dataField: 'REGION_PACIFICO',
width: 150,
area: 'filter'
},
        {
            dataField: 'ANO',
            dataType: 'string',
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
        store: this.dotacion
    };
    } else if (this.TipoFichaId === 3) {
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
          caption: 'MUNICIPIO PDET',
          dataField: 'Municipio_PDET',
          width: 150,
          area: 'filter'
      },{
        caption: 'MUNICIPIO AFRO',
        dataField: 'Municipio_Afro',
        width: 150,
        area: 'filter'
    },
      {
        caption: 'MUNICIPIO FRONTERA',
        dataField: 'Municipio_Frontera',
        width: 150,
        area: 'filter'
    },
    {
      caption: 'REGION CARIBE',
      dataField: 'REGION_CARIBE',
      width: 150,
      area: 'filter'
  },
  {
    caption: 'REGION CENTRO ORIENTE',
    dataField: 'REGION_CENTRO_ORIENTE',
    width: 150,
    area: 'filter'
},
{
  caption: 'REGION CENTRO SUR AMAZONIA',
  dataField: 'REGION_CENTRO_SUR_AMAZONIA',
  width: 150,
  area: 'filter'
},
{
caption: 'REGION DEL LLANO',
dataField: 'REGION_DEL_LLANO',
width: 150,
area: 'filter'
},
{
caption: 'REGION EJE CAFETERO',
dataField: 'REGION_EJE_CAFETERO',
width: 150,
area: 'filter'
},
{
caption: 'REGION PACIFICO',
dataField: 'REGION_PACIFICO',
width: 150,
area: 'filter'
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
        store: this.proyectosEspeciales
    };
    } else if (this.TipoFichaId === 4) {
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
          caption: 'MUNICIPIO PDET',
          dataField: 'Municipio_PDET',
          width: 150,
          area: 'filter'
      },{
        caption: 'MUNICIPIO AFRO',
        dataField: 'Municipio_Afro',
        width: 150,
        area: 'filter'
    },
      {
        caption: 'MUNICIPIO FRONTERA',
        dataField: 'Municipio_Frontera',
        width: 150,
        area: 'filter'
    },
    {
      caption: 'REGION CARIBE',
      dataField: 'REGION_CARIBE',
      width: 150,
      area: 'filter'
  },
  {
    caption: 'REGION CENTRO ORIENTE',
    dataField: 'REGION_CENTRO_ORIENTE',
    width: 150,
    area: 'filter'
},
{
  caption: 'REGION CENTRO SUR AMAZONIA',
  dataField: 'REGION_CENTRO_SUR_AMAZONIA',
  width: 150,
  area: 'filter'
},
{
caption: 'REGION DEL LLANO',
dataField: 'REGION_DEL_LLANO',
width: 150,
area: 'filter'
},
{
caption: 'REGION EJE CAFETERO',
dataField: 'REGION_EJE_CAFETERO',
width: 150,
area: 'filter'
},
{
caption: 'REGION PACIFICO',
dataField: 'REGION_PACIFICO',
width: 150,
area: 'filter'
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
        store: this.visitasAsesorias
    };
    } else if (this.TipoFichaId === 5) {
      this.dataSource = {
        fields: [
          {
            caption: 'TIPO FORMACION',
            width: 120,
            dataField: 'TIPO_FORMACION',
            area: 'row'
        },
          {
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
          caption: 'MUNICIPIO PDET',
          dataField: 'Municipio_PDET',
          width: 150,
          area: 'filter'
      },{
        caption: 'MUNICIPIO AFRO',
        dataField: 'Municipio_Afro',
        width: 150,
        area: 'filter'
    },
      {
        caption: 'MUNICIPIO FRONTERA',
        dataField: 'Municipio_Frontera',
        width: 150,
        area: 'filter'
    },
    {
      caption: 'REGION CARIBE',
      dataField: 'REGION_CARIBE',
      width: 150,
      area: 'filter'
  },
  {
    caption: 'REGION CENTRO ORIENTE',
    dataField: 'REGION_CENTRO_ORIENTE',
    width: 150,
    area: 'filter'
},
{
  caption: 'REGION CENTRO SUR AMAZONIA',
  dataField: 'REGION_CENTRO_SUR_AMAZONIA',
  width: 150,
  area: 'filter'
},
{
caption: 'REGION DEL LLANO',
dataField: 'REGION_DEL_LLANO',
width: 150,
area: 'filter'
},
{
caption: 'REGION EJE CAFETERO',
dataField: 'REGION_EJE_CAFETERO',
width: 150,
area: 'filter'
},
{
caption: 'REGION PACIFICO',
dataField: 'REGION_PACIFICO',
width: 150,
area: 'filter'
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
            caption: 'Cantidad',
            dataField: 'Cantidad',
            dataType: 'number',
            summaryType: 'sum',
            // format: 'currency',
            area: 'data'
        }],
        store: this.procesosFormacion
    };
    }
  }



  getAnos() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorId(16).subscribe(
        result => {
            this.anosLista = result.Lista;
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
  this._tipoReferenciaService.getValorReferenciaPorTipoValorId(10).subscribe(
      result => {
          this.areasLista = result.Lista;
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

  getDep() {
    this._tipoReferenciaService.getDepartamentos().subscribe(
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
  this._tipoReferenciaService.getMunicipiosByDepartamento(this.ZON_ID_DEP).subscribe(
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

  this.cargarDatosUrlReporte();
}

cargarDatosUrlReporte() {
  // let strParametros = '';
  //       if ( this.ZON_ID_DEP !== '0') {
  //               strParametros =  '/PageFichaArtes1.aspx?ZP='+ this.ZON_ID_DEP;
  //           } else if ( this.ZON_ID_DEP !== '0' && this.ZON_ID !== '0') {
  //             strParametros =  '/PageFichaArtes1.aspx?ZP=' + this.ZON_ID_DEP + '&Z=' + this.ZON_ID;
  //           }
  // this.urlRptPresProp = UrlReportes + strParametros;

  this.urlRptPresProp = UrlReportes + '/PageFichaArtes1.aspx?d=' + this.ZON_ID_DEP + '&m=' + this.ZON_ID + '&ar=' + this.AreaId + '&an=' + this.AnoId;

  }

}


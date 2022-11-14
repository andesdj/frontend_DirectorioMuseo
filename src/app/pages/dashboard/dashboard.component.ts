import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { UsuarioService } from "src/app/services/service.index";
import {
  DxPivotGridComponent,
  DxChartComponent,
  DxPieChartComponent,
} from "devextreme-angular";
import { debug } from "util";
import { User } from "src/app/models/user.model";
import { Session } from "src/app/models/session.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements AfterViewInit {
  //@ViewChild(DxPivotGridComponent, { read: false }) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent, { static: false }) chart: DxChartComponent;

  @ViewChild(DxPieChartComponent, { static: false })
  pieChart: DxPieChartComponent;

  usuario: User;
  usuarioNombre: string;
  email: string;
  roles: any;
  role: string;
  usuId: number;
  perfilId: number;
  currentSession: Session;

  listaFichaGeneral = [];
  grafico: FichaGeneral[];
  ofertagraficoMunicipios: OfertaGrafico[];
  ofertagraficoBeneficiarios: OfertaGrafico[];
  ofertagraficoInversion: OfertaGrafico[];

  agentesGrafico: AgentesGrafico[];

  dataSource: any;
  goldMedals: Medals[] = [
    {
      country: "China",
      medals: 51,
    },
    {
      country: "USA",
      medals: 36,
    },
    {
      country: "Russia",
      medals: 22,
    },
    {
      country: "UK",
      medals: 19,
    },
    {
      country: "Germany",
      medals: 16,
    },
    {
      country: "Australia",
      medals: 14,
    },
    {
      country: "South Korea",
      medals: 13,
    },
    {
      country: "France",
      medals: 7,
    },
  ];

  public mostrarGraficos = false;

  constructor(public _usuarioService: UsuarioService, public router: Router) {
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

    if (this.perfilId === 1004) {
      this.mostrarGraficos = true;
    }

    // this.cargarFicha();
    this.cargarFichaGeneral();
    this.cargarFichaGeneralGrafico();

    this.cargarOfertaGraficoMunicipios();
    this.cargarOfertaGraficoBeneficiarios();
    this.cargarOfertaGraficoInversion();
    this.cargarAgentesGraficoPorUsuario();
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
    return data.MunicipioNombre + " (" + data.MunicipioNombre + ")";
  }

  cargarFicha() {
    // debugger;
    this._usuarioService.cargarFichaGeneralDatos();
    this.dataSource = {
      fields: [
        {
          caption: "DepartamentoNombre",
          width: 120,
          dataField: "DepartamentoNombre",
          area: "row",
        },
        {
          caption: "MunicipioNombre",
          dataField: "MunicipioNombre",
          width: 150,
          area: "row",
          selector: this.citySelector,
        },
        {
          dataField: "ANO",
          dataType: "string",
          area: "column",
        },
        {
          dataField: "AREA",
          dataType: "AREA",
          area: "column",
        },
        {
          caption: "Inversion",
          dataField: "Inversion",
          dataType: "number",
          summaryType: "sum",
          format: "currency",
          area: "data",
        },
      ],
      store: this._usuarioService.fichaGeneral,
    };
  }

  cargarFichaGeneralGrafico() {
    this._usuarioService.cargarFichaGeneralGrafico().subscribe((resp: any) => {
      //debugger;
      this.grafico = resp.Lista;
      console.log(this.grafico);
    });
  }

  cargarOfertaGraficoMunicipios() {
    this._usuarioService
      .cargarOfertaGraficoMunicipios()
      .subscribe((resp: any) => {
        this.ofertagraficoMunicipios = resp.Lista;
      });
  }

  cargarAgentesGraficoPorUsuario() {
    this._usuarioService
      .cargarAgentesGraficoPorUsuario(this.usuId)
      .subscribe((resp: any) => {
        this.agentesGrafico = resp.Lista;
      });
  }

  cargarOfertaGraficoBeneficiarios() {
    this._usuarioService
      .cargarOfertaGraficoBeneficiarios()
      .subscribe((resp: any) => {
        this.ofertagraficoBeneficiarios = resp.Lista;
      });
  }

  cargarOfertaGraficoInversion() {
    this._usuarioService
      .cargarOfertaGraficoInversion()
      .subscribe((resp: any) => {
        this.ofertagraficoInversion = resp.Lista;
      });
  }

  redireccionar() {
    this.router.navigate(["/agentes"]);
  }

  cargarFichaGeneral() {
    //intSalida: Number;
    this._usuarioService.cargarFichaGeneral().subscribe((resp: any) => {
      this.listaFichaGeneral = resp.Lista;
    });
  }

  customizeTooltip(args) {
    return {
      html:
        args.seriesName +
        " | Total<div class='currency'>" +
        args.valueText +
        "</div>",
    };
  }
}

export class FichaGeneral {
  Id: number;
  DepartamentoNombre: string;
  MunicipioNombre: string;
  Ficha: string;
  Inversion: number;
  Cantidad: number;
  ANO: string;
  Area: string;
}

export class OfertaGrafico {
  NumeroBeneficiarios: number;
  ProgramaInversion: number;
  AREA: string;
  NumeroMunicipios: number;
}

export class Medals {
  country: string;
  medals: number;
}

export class AgentesGrafico {
  nombre: string;
  numero: number;
}

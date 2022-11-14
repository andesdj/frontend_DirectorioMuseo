import { Component, OnInit } from '@angular/core';
import { OfertaService } from 'src/app/services/service.index';
import { TipoReferenciaService } from '../../services/tipoReferencia/tipo-referencia.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { OfertaPrograma, Programa } from '../oferta-artes/oferta-artes.component';
import { IOption } from 'ng-select';
import { URL_SERVICIOS } from '../../config/config';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oferta-administracion',
  templateUrl: './oferta-administracion.component.html',
  styleUrls: ['./oferta-administracion.component.css']
})
export class OfertaAdministracionComponent implements OnInit {
  AnoId: string;
  OfertaProgramaId: number;
  jsonData: any;
  worksheet: any;
  storeData: any;
  fileUploaded: File;
  popupVisible: boolean;
  programa: OfertaPrograma[];
  programaRegionalizacion: [];
  areaLista: Array<IOption>;
  estadoInformacionLista: Array<IOption>;
  componentesLista: Array<IOption>;
  dataSourceComponentes: List[];
  dataSourceAreas: List[];
  dataSourceEstado: List[] =
  [
    {
      "ID": 162,
      "Name": "En proceso"
    },
    {
      "ID": 161,
      "Name": "Terminado"
    }
   ];
  dataSourceAnos: List[] = [{
    'ID': 181,
    'Name': '2019'
}, {
    'ID': 182,
    'Name': '2020'
}, {
  'ID': 183,
  'Name': '2021'
}];
  startEditAction: string = 'click';
    selectTextOnEditStart: boolean = true;
  // tslint:disable-next-line: max-line-length
  constructor(public _usuarioService: UsuarioService, public  _tipoReferenciaService: TipoReferenciaService, public  _ofertaService: OfertaService) {
    this.popupVisible = false;
    this.AnoId = "183"
   }

  ngOnInit() {
    this.cargarAreas();
    this.cargarComponentes();
    this.cargarEstadoInformacion();
    this.getAllOfertaPrograma();
    }
    cargarEstadoInformacion() {
      this._tipoReferenciaService.getValorReferenciaPorTipoValorId(25).subscribe(
        (result) => {
          this.estadoInformacionLista = result.Lista;
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
    cargarComponentes() {
this.dataSourceComponentes =
      [
        {
          "ID": 2307,
          "Name": "Certificado"
        },
        {
          "ID": 1244,
          "Name": "Circulación"
        },
        {
          "ID": 2304,
          "Name": "Clasificación de películas"
        },
        {
          "ID": 1247,
          "Name": "Creación"
        },
        {
          "ID": 2328,
          "Name": "Dirección de Comunicaciones"
        },
        {
          "ID": 1241,
          "Name": "Dotación"
        },
        {
          "ID": 1256,
          "Name": "Ejecución "
        },
        {
          "ID": 1257,
          "Name": "Estímulos"
        },
        {
          "ID": 1252,
          "Name": "Expedición Sensorial"
        },
        {
          "ID": 1253,
          "Name": "Fomento a la lectura"
        },
        {
          "ID": 2302,
          "Name": "Fondo para el Desarrollo Cinematográfico"
        },
        {
          "ID": 1240,
          "Name": "Formación"
        },
        {
          "ID": 1243,
          "Name": "Gestión"
        },
        {
          "ID": 1255,
          "Name": "Giro"
        },
        {
          "ID": 3353,
          "Name": "Inclusión"
        },
        {
          "ID": 3354,
          "Name": "Industria"
        },
        {
          "ID": 3358,
          "Name": "Información"
        },
        {
          "ID": 3357,
          "Name": "Infraestructura"
        },
        {
          "ID": 1251,
          "Name": "Infraestructura"
        },
        {
          "ID": 3351,
          "Name": "Inspiración "
        },
        {
          "ID": 3356,
          "Name": "Instituciones"
        },
        {
          "ID": 3352,
          "Name": "Integración "
        },
        {
          "ID": 1246,
          "Name": "Investigación"
        },
        {
          "ID": 2303,
          "Name": "Patrimonio Audiovisual Colombiano"
        },
        {
          "ID": 1245,
          "Name": "Producción y emprendimiento"
        },
        {
          "ID": 1254,
          "Name": "Recaudo "
        },
        {
          "ID": 2306,
          "Name": "Resolución de reconocimiento"
        },
        {
          "ID": 2305,
          "Name": "Retina Latina"
        }
       ];
      this._tipoReferenciaService.getValorReferenciaPorTipoValorId(38).subscribe(
        (result) => {
          debugger;
          this.componentesLista = result.Lista;
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

  cargarAreas() {
    this.dataSourceAreas = [
      {
        "ID": 144,
        "Name": "Artes Visuales"
      },
      {
        "ID": 145,
        "Name": "Danza"
      },
      {
        "ID": 2309,
        "Name": "Dirección de Cinematografía"
      },
      {
        "ID": 2308,
        "Name": "Dirección de Comunicaciones"
      },
      {
        "ID": 146,
        "Name": "Educación Artística"
      },
      {
        "ID": 147,
        "Name": "Expedición Sensorial"
      },
      {
        "ID": 140,
        "Name": "Ley de Espectáculo Público"
      },
      {
        "ID": 142,
        "Name": "Literatura"
      },
      {
        "ID": 139,
        "Name": "Música"
      },
      {
        "ID": 143,
        "Name": "Primera Infancia, Infancia y Adolescencia"
      },
      {
        "ID": 2313,
        "Name": "Programa de Emprendimiento"
      },
      {
        "ID": 141,
        "Name": "Teatro"
      }
      ,
      {
        "ID": 1224,
        "Name": "Despacho Dirección de Artes"
      }
     ];
    this._tipoReferenciaService.getValorReferenciaPorTipoValorId(10).subscribe(
      (result) => {
        debugger;
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

  getAllOfertaPrograma() {
    this._ofertaService.getAllOfertaPrograma(this.AnoId)
    .subscribe((resp: any) => {
        this.programa = resp.Lista;
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

    this.programaRegionalizacion = [];
  }

  actualizar(item): void {
    this._ofertaService.salvarOfertaPrograma(item.data)
    .subscribe(
      resp => {
        this.getAllOfertaPrograma();
        }
    );
  }

  agregar(item): void {
    this._ofertaService.salvarOfertaPrograma(item.data)
    .subscribe(
      resp => {
        this.getAllOfertaPrograma();
        }
    );
  }

  borrar(item): void {
    const  ofertaPrgramaId =  item.data['OfertaProgramaId'];
    this._ofertaService.deleteOfertaPrograma(ofertaPrgramaId)
    .subscribe(
      resp => {
        this.getAllOfertaPrograma();
        }
    );
  }

  borrarRegionalizacion(item): void {
    const  OfertaProgramaRegionalizadoId =  item.data['OfertaProgramaRegionalizadoId'];
    const  ofertaPrgramaId  = item.data['ofertaPrgramaId'];
    this._ofertaService.deleteOfertaProgramaRegionalizado(OfertaProgramaRegionalizadoId)
    .subscribe(
      resp => {
        debugger;
        this.CargarRegionalizacionPrograma(ofertaPrgramaId);
        }
    );
  }

  borrarRegionalizacionPorOfertaProgramaId(id: any): void {
    Swal.fire({
      title: 'Borrar Registros Regionalización?',
      text: 'Ese proceso no se podra revertir!',
      
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Esto!',
    }).then((result) => {
      if (result.value) {
        this._ofertaService.deleteOfertaProgramaRegionalizadoPorOfertaProgramaId(id)
        .subscribe(
          resp => {
            debugger;
            this.CargarRegionalizacionPrograma(id);
            }
        );
        Swal.fire('Borrado!', 'Los Registros se Borraron Exitosamente.', 'success');
      }
    });
  }

  CargarRegionalizacionPrograma( id: any) {
    this._ofertaService.cargarOfertaProgramaRegionalizadoByProgramaId(id).subscribe((resp: any) => {
      this.programaRegionalizacion = resp.Lista;
    });
  }

  CargarArchivoRegionalizacionPrograma( id: any) {
    this.popupVisible = true;
    this.OfertaProgramaId = id;
    // this._ofertaService.cargarOfertaProgramaRegionalizadoByProgramaId(id).subscribe((resp: any) => {
    //   this.programaRegionalizacion = resp.Lista;
    // });
  }

  uploadedFile(event) {
    
    this.fileUploaded = event.target.files[0];
    this.readExcel();
  } 

  readExcel() {
    let readFile = new FileReader();
    readFile.onload = (e) => {
      debugger;
      this.storeData = readFile.result;
      var data = new Uint8Array(this.storeData);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
    }
    readFile.readAsArrayBuffer(this.fileUploaded);
  }

  readAsJson() {
    debugger;
    this.jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });
    if (this.jsonData !== null) {
      for (let i = 0; i < this.jsonData.length; i++) {
        this.jsonData[i].OfertaProgramaId = this.OfertaProgramaId;
      }
    }

     //this.jsonData = JSON.stringify(this.jsonData);
     //const data: Blob = new Blob([this.jsonData], { type: "application/json" });
    // console.log(this.jsonData);
    // console.log(data);
    // FileSaver.saveAs(data, "JsonFile" + new Date().getTime() + '.json');  

    this._ofertaService.salvarOfertaProgramaRegionalizado(this.jsonData)
    .subscribe(
      resp => {
        this.CargarRegionalizacionPrograma(this.OfertaProgramaId);
        }
    );

    this.popupVisible = false;
    this.CargarRegionalizacionPrograma(this.OfertaProgramaId);
    //this.OfertaProgramaId = null;

  }

  addIdParameter(e: any) {
    // this.url = URL_SERVICIOS + '/ApiRest/Agente/MediaUpload';
  }

}



export class List {
  ID: number;
  Name: string;
}

import { Component, OnInit, Injectable } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import Query from 'devextreme/data/query';
import { IOption } from 'ng-select';
import { TipoReferenciaService } from 'src/app/services/service.index';
@Component({
  selector: 'app-comisiones-calendario',
  templateUrl: './comisiones-calendario.component.html',
  styleUrls: ['./comisiones-calendario.component.css']
})
export class ComisionesCalendarioComponent implements OnInit {


    public depLista: Array<IOption>;
    public areasLista: Array<IOption>;
    public AreaId: string;
    public ZON_ID_DEP: string;
    munLista: Array<IOption>;
    public MunicipioId: string;

  appointmentsData: Appointment[];
    currentDate: Date = new Date(2020, 9, 9);
    currentDate2: Date = new Date(2015, 4, 25);

    resources: Resource[] = [
        {
            text: "MUSICA",
            id: 139,
            color: "#bbd806"
        }, {
            text: "ARTES VISUALES",
            id: 144,
            color: "#f34c8a"
        }, {
            text: "GRUPO DE DANZA",
            id: 145,
            color: "#ae7fcc"
        }, {
            text: "EXPEDICIÓN SENSORIAL",
            id: 147,
            color: "#ff8817"
        }, {
            text: "LEY DEL ESPECTACULO",
            id: 140,
            color: "#03bb92"
        }
        , {
            text: "TYC",
            id: 120,
            color: "#bb5c03"
        }
        , {
            text: "DIRECCION GENERAL",
            id: 1224,
            color: "#1b8280"
        }
        , {
            text: "EDUCACION ARTISTICA",
            id: 146,
            color: "#13f502"
        }
        , {
            text: "GRUPO ADMINISTRATIVO",
            id: 1225,
            color: "#02f1f5"
        }
        , {
            text: "LITERATURA",
            id: 142,
            color: "#e8052b"
        }
        , {
            text: "PRIMERA INFANCIA",
            id: 121,
            color: "#d207e8"
        }
    ];

    title = 'Mapa Comisiones';
    lat: number = 5.065781;
    lng: number = -75.507820;
    zoom: number = 6;

  constructor( public _usuarioService: UsuarioService, public  _tipoReferenciaService: TipoReferenciaService) {
    this.AreaId = '0';
    this.ZON_ID_DEP = '0';
    this.MunicipioId = '0';
    this.cargarComisiones();

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

   cargarComisiones() {
    this.mostrarMunicipios();
    this._usuarioService.cargarComisiones(this.AreaId, this.ZON_ID_DEP, this.MunicipioId)
              .subscribe(
                (resp: any) => {
                 this.appointmentsData = resp.Lista;
                 if (this.appointmentsData !== null) {
                    for (let i = 0; i < this.appointmentsData.length; i++) {
                      this.appointmentsData[i].Latitud = String((Number(this.appointmentsData[i].Latitud)) +  (Math.random() - .5) / 1500);
                      // tslint:disable-next-line:max-line-length
                      this.appointmentsData[i].Longitud = String((Number(this.appointmentsData[i].Longitud)) +  (Math.random() - .5) / 1500);
                    }
                }

              });
  }


  ngOnInit() {
      this.getAreas();
      this.getDep();
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

}

@Injectable()
export class Service {
    // getAppointments(): Appointment[] {
    //     return appointments;
    // }
}

export class Resource {
    text: string;
    id: number;
    color: string;
}

export class Appointment {
  text: string;
  startDate: Date;
  endDate: Date;
  description: string;
  allDay?: boolean;
  idDependencia: number[];
  Latitud: string;
  Longitud: string;
}


export class Data {
  theatreId: number;
  movieId: number;
  price: number;
  startDate: Date;
  endDate: Date;
}

export class MovieData {
  id: number;
  text: string;
  director: string;
  year: number;
  image: string;
  duration: number;
  color: string;
}

export class TheatreData {
  text: string;
  id: number;
}

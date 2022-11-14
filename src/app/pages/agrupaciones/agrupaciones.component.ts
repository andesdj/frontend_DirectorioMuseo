import { Component, ViewChild , OnInit, ElementRef, NgZone  } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TipoReferenciaService, AgrupacionesService, MapUbicacionService } from 'src/app/services/service.index';
import { IOption } from 'ng-select';
import { Agrupaciones } from 'src/app/models/agrupaciones.model';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import Swal from 'sweetalert2';
import { URL_SERVICIOS } from '../../config/config';
import { AgenteService } from '../../services/agentes/agente.service';
import { AgenteAgrupaciones } from '../../models/agrupaciones.model';

@Component({
  selector: 'app-agrupaciones',
  templateUrl: './agrupaciones.component.html',
  styleUrls: ['./agrupaciones.component.css']
})
export class AgrupacionesComponent implements OnInit {

  @ViewChild('search', {static: false}) searchElementRef: ElementRef;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selected = 'option2';
  tipoAgrupacion: Array<IOption>;
  areaLista: Array<IOption>;
  depLista: Array<IOption>;
  munLista: Array<IOption>;
  tipoAgrupacionLista: Array<IOption>;
  paisesLista: Array<IOption>;
  agrupacion: Agrupaciones;
  agenteAgrupaciones: AgenteAgrupaciones;
  DepartamentoId: string;
  isOptional = false;
  displayListAgente: boolean;
  displayCrearAgente: boolean;
  listaAgrupaciones = [];
  operacion = 'C';
  title = 'Mapa Oferta';
  latitude: number = 5.065781;
  longitude: number = -75.507820;
  zoom: number = 6;
  address: string;
  private geoCoder;
  oculto: string = 'oculto';
  registro: boolean;
  urlImagen: string;
  url: string;
  value: any[] = [];
  experiencia: boolean;
  displayListAgenteExperiencia: boolean;
  displayCrearAgenteExperiencia: boolean;
  Identificacion: string;
  nombreAgente: string;

  formacion: boolean;
  displayListAgenteFormacion: boolean;
  displayCrearAgenteFormacion: boolean;

  EstiloStep1: string;
  EstiloStep2: string;
  EstiloStep3: string;
  EstiloStep4: string;
  listaAgentesAgrupaciones = [];

  // tslint:disable-next-line:max-line-length
  constructor(public _mapsUbicacionService: MapUbicacionService,  private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private _formBuilder: FormBuilder, public _tipoReferenciaService: TipoReferenciaService, public _agrupacionesService: AgrupacionesService, public _agenteService: AgenteService) {

    this.displayListAgente = true;
    this.displayCrearAgente = false;
    this.registro = true;
    this.experiencia = false;
    this.displayListAgenteExperiencia = true;
    this.displayCrearAgenteExperiencia = false;

    this.formacion = false;
    this.displayListAgenteFormacion = true;
    this.displayCrearAgenteFormacion = false;

    this.agrupacion = new Agrupaciones(null, null, '', null, null, null, null, null, '', '', '', '', '', '', '', '', '', null, '', '', '');
    this.agenteAgrupaciones = new AgenteAgrupaciones(null, null, null, '');

    this.EstiloStep1 = 'active';
    this.EstiloStep2 = '';
    this.EstiloStep3 = '';
    this.EstiloStep4 = '';
  }

  cargarAgentesAgrupaciones(id: number) {
    this._agrupacionesService.cargarAgentesAgrupaciones(id).subscribe((resp: any) => {
      this.listaAgentesAgrupaciones = resp.Lista;
    });
  }

  consultarPorCedula(id: any) {
    this._agenteService
      .consultaAgenteAgrupacionesPorCedula(this.Identificacion)
      .subscribe(
        (result) => {
          // if (
          //   result['AgentePrimerNombre'] !== '' &&
          //   result['AgentePrimerNombre'] !== null
          // ) {
          //   this.nombreAgente = result['AgentePrimerNombre'] + ' ' + result['AgenteSegundoNombre']
          //   + ' ' + result['AgentePrimerApellido'] + ' ' + result['AgenteSegundoApellido'];
          //   Swal.fire('Mensaje', result['Mensaje'], 'success');
          // }
          if (!result['OperacionExitosa']) {
            //  alert();
            Swal.fire('Alerta', result['Mensaje'], 'error');
            this.nombreAgente = '';
          } else {

            this.agenteAgrupaciones.AgenteId = result['AgenteId'];
            this.nombreAgente = result['AgentePrimerNombre'] + ' ' + result['AgenteSegundoNombre']
            + ' ' + result['AgentePrimerApellido'] + ' ' + result['AgenteSegundoApellido'];
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

  addIdParameter(e: any) {
    this.url = URL_SERVICIOS + '/ApiRest/Agrupacion/MediaUpload';
  }


  subidaCompleta(e: { request: { status: number; response: string } }) {
    if (e.request.status === 201) {
      const obj = JSON.parse(e.request.response);
      console.log(obj.Message.split('|')[1]);
      this.agrupacion.Fotografia = obj.Message.split('|')[1];
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

 ngOnInit() {
   this.firstFormGroup = this._formBuilder.group({
    AgrupacionNombre: ['', Validators.required],
    AgrupacionPaginaWeb: ['', Validators.required],
    AgrupacionDireccion: '',
    AgrupacionTelefono: ['', Validators.required],
    TipoAgrupacionId: ['', Validators.required],
    AreaId: ['', Validators.required],
    DepartamentoId: ['', Validators.required],
    MunicipioId: ['', Validators.required],
    AgrupacionResena: ['', Validators.required],
   });
   this.secondFormGroup = this._formBuilder.group({
     secondCtrl: ''
   });

   this.cargarTiposIdentificacion();
   this.cargarAreas();
   this.cargarTipoAgrupaciones();
   this.getDep();
   this.cargarAgrupaciones();
   debugger;
   this.getPaises();

   //load Places Autocomplete
   this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
    this.geoCoder = new google.maps.Geocoder;
  debugger;
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"]
    });
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;
      });
    });
  });
 }

 getPaises() {
  this._tipoReferenciaService.getPaises().subscribe(
    (result) => {
      this.paisesLista = result.Lista;
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
 // Get Current Location Coordinates
 private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 8;
      this.getAddress(this.latitude, this.longitude);
    });
  }
}

markerDragEnd($event: MouseEvent) {
  console.log($event);
  this.latitude = $event.coords.lat;
  this.longitude = $event.coords.lng;
  this.getAddress(this.latitude, this.longitude);
}

getAddress(latitude, longitude) {
  this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
    console.log(results);
    console.log(status);
    if (status === 'OK') {
      if (results[0]) {
        this.zoom = 12;
        this.address = results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });
}

 mostrarMunicipios() {
  this._tipoReferenciaService.getMunicipiosByDepartamento(this.agrupacion.DepartamentoId).subscribe(
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

 cargarTiposIdentificacion() {
  this._tipoReferenciaService.getValorReferenciaPorTipoValorId(8).subscribe(
      result => {
          this.tipoAgrupacion = result.Lista;
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

cargarAreas() {
  this._tipoReferenciaService.getValorReferenciaPorTipoValorId(10).subscribe(
      result => {
          this.areaLista = result.Lista;
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

cargarTipoAgrupaciones() {
  this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_TIPO_GRUPO').subscribe(
      result => {
          this.tipoAgrupacionLista = result.Lista;
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

showPanel(sw, id) {
  if (sw === 'C') { // Crear Usuario
    this.displayListAgente = false;
      this.displayCrearAgente = true;
      this.oculto = '';
    this.inicializarModelo();
} else if (sw === 'U') { // Actualizar Usuario
      this.displayListAgente = false;
      this.displayCrearAgente = true;
      this.oculto = '';
      this.getAgrupacionById(id);
      this.operacion = 'U';
    } else if (sw === 'V') { // Volver al listado de contratistas
      this.displayListAgente = true;
      this.displayCrearAgente = false;
      this.oculto = 'oculto';
       this.inicializarModelo();
      // recargar la tabla
      this.cargarAgrupaciones();
    }
}

inicializarModelo() {
  // this.firstFormGroup.get('AgrupacionNombre').setValue('');
  //     this.firstFormGroup.get('AgrupacionPaginaWeb').setValue('');
  //     this.firstFormGroup.get('AgrupacionDireccion').setValue('');
  //     this.firstFormGroup.get('AgrupacionTelefono').setValue('');
  //     this.firstFormGroup.get('AgrupacionResena').setValue('');
  //     this.firstFormGroup.get('DepartamentoId').setValue('');
  //     this.firstFormGroup.get('MunicipioId').setValue('');
  //     this.firstFormGroup.get('AreaId').setValue('');
  //     this.firstFormGroup.get('AgrupacionResena').setValue('');
  //     this.firstFormGroup.get('TipoAgrupacionId').setValue('');
      // tslint:disable-next-line: max-line-length
      this.agrupacion = new Agrupaciones(null, null, '', null, null, null, null, null, '', '', '', '', '', '', '', '', '', null, '', '', '');
      this.urlImagen = '';
      this.Identificacion = '';
      this.nombreAgente = '';
}

inicializarAgentesAgrupaciones() {
  this.agenteAgrupaciones = {
       AgenteAgrupacionesId: null,
         AgenteId: null,
         AgrupacionId: this.agrupacion.AgrupacionId,
         AgenteAgrupacionesCargo: '',
  };
}

getAgrupacionById(id) {
  this._agrupacionesService.getAgrupacionByAgrupacionId(id).subscribe(
      result => {
      this.agrupacion = result;
      // this.firstFormGroup.get('AgrupacionNombre').setValue(this.agrupacion.AgrupacionNombre);
      // this.firstFormGroup.get('AgrupacionPaginaWeb').setValue(this.agrupacion.AgrupacionPaginaWeb);
      // this.firstFormGroup.get('AgrupacionDireccion').setValue(this.agrupacion.AgrupacionDireccion);
      // this.firstFormGroup.get('AgrupacionTelefono').setValue(this.agrupacion.AgrupacionTelefono);
      // this.firstFormGroup.get('AgrupacionResena').setValue(this.agrupacion.AgrupacionResena);
      // this.firstFormGroup.get('DepartamentoId').setValue(this.agrupacion.DepartamentoId);
      // this.mostrarMunicipios();
      // this.firstFormGroup.get('AreaId').setValue(this.agrupacion.AreaId);
      // this.firstFormGroup.get('MunicipioId').setValue(this.agrupacion.MunicipioId);
      // this.firstFormGroup.get('AgrupacionResena').setValue(this.agrupacion.AgrupacionResena);
      // this.firstFormGroup.get('TipoAgrupacionId').setValue(this.agrupacion.TipoAgrupacionId);
      // debugger;
      this.cargarAgentesAgrupaciones( this.agrupacion.AgrupacionId);
      this.urlImagen = this.agrupacion.AgrupacionUrl + this.agrupacion.Fotografia;
      this.mostrarMunicipios();
      if (this.agrupacion.Latitud !== '' && this.agrupacion.Longitud !== '') {
        this.latitude = parseFloat(this.agrupacion.Latitud);
        this.longitude = parseFloat(this.agrupacion.Longitud);
      }

      
    //   for ( let i = 0; i <  this.agente.TipoOcupacion.length; i++) {
    //     this.setPublicoDirigidoCheck(this.agente.TipoOcupacion[i]);
    // }
    //this.urlImagen = this.agente.Fotografia;
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

cargarAgrupaciones() {
  this._agrupacionesService.cargarAgrupaciones( )
            .subscribe(
              (resp: any) => {
               this.listaAgrupaciones = resp.Lista;
            });
}

aprobarAgrupacion(id) {
  Swal.fire({
    title: 'Aprobar agrupación?',
    text: 'Este proceso cambiara el estado del registro!',
    // type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Aprobar esto!'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Aprobado!',
        'su registro fue aprobado.',
        'success'
      );
    }
  });
}


borrarAgrupacion(id) {
  Swal.fire({
    title: 'Borrar Registro?',
    text: 'Ese proceso no se podra revertir!',
    // type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar Esto!'
  }).then((result) => {
    if (result.value) {
      this._agrupacionesService.deleteAgrupacion(id).subscribe(
        result => {
            // if (result.OperacionExitosa) {
            //     this.getRedSocialByAgente();
            //     this.servicePNotify.warn('Eliminar', 'Datos eliminados correctamente!');
            // } else {
            //     this.servicePNotify.html(
            //         '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
            //         'error'
            //     );
            // }
            this.cargarAgrupaciones();
        },
        error => {
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
      Swal.fire(
        'Borrado!',
        'Este registro fue borrado.',
        'success'
      );
    }
  });

}


onSubmit(isValid) {
  if (isValid) {
    // this.agrupacion.AgrupacionNombre = this.firstFormGroup.get('AgrupacionNombre').value;
    // this.agrupacion.AgrupacionPaginaWeb = this.firstFormGroup.get('AgrupacionPaginaWeb').value;
    // this.agrupacion.AgrupacionDireccion = this.firstFormGroup.get('AgrupacionDireccion').value;
    // this.agrupacion.AgrupacionTelefono = this.firstFormGroup.get('AgrupacionTelefono').value;
    // this.agrupacion.AgrupacionResena = this.firstFormGroup.get('AgrupacionResena').value;
    // this.agrupacion.AreaId =this.firstFormGroup.get('AreaId').value;
    // this.agrupacion.MunicipioId = this.firstFormGroup.get('MunicipioId').value;
    // this.agrupacion.AgrupacionResena = this.firstFormGroup.get('AgrupacionResena').value;
    // this.agrupacion.TipoAgrupacionId = this.firstFormGroup.get('TipoAgrupacionId').value;
    // this.agrupacion.Latitud = this.latitude.toString();
    // this.agrupacion.Longitud = this.longitude.toString();

    this._agrupacionesService.crearAgrupacion(this.agrupacion)
      .subscribe(resp => {
        //this.showPanel('V', null);
        }
      );
    // }
  }
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
  } else if (sw === 'P' && this.agrupacion.AgrupacionId != null) {
    // Actualizar Usuario
    this.experiencia = true;
    this.EstiloStep1 = 'complete';
    this.EstiloStep2 = 'active';
    this.EstiloStep3 = '';
    this.EstiloStep4 = '';
  } else if (sw === 'O' && this.agrupacion.AgrupacionId != null) {
    // Volver al listado
    this.formacion = true;
    this.EstiloStep1 = 'complete';
    this.EstiloStep2 = 'complete';
    this.EstiloStep3 = 'active';
    this.EstiloStep4 = '';
  } else if (this.agrupacion.AgrupacionId === null) {
    this.registro = true;
  }
}

onSubmitAgenteAgrupacion(isValid) {
  debugger;
  if (isValid) {
    this.agenteAgrupaciones.AgrupacionId = this.agrupacion.AgrupacionId;
    this._agrupacionesService.crearAgenteAgrupacion(this.agenteAgrupaciones)
      .subscribe(resp => {
        //this.showPanel('V', null);
        this.cargarAgentesAgrupaciones(this.agrupacion.AgrupacionId);
        this.inicializarAgentesAgrupaciones();
        }
      );
    // }
  }
}

borrarAgenteAgrupacion(id) {
  Swal.fire({
    title: 'Borrar Registro?',
    text: 'Ese proceso no se podra revertir!',
    // type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar Esto!'
  }).then((result) => {
    if (result.value) {
      this._agrupacionesService.deleteAgenteAgrupacion(id).subscribe(
        result => {
            // if (result.OperacionExitosa) {
            //     this.getRedSocialByAgente();
            //     this.servicePNotify.warn('Eliminar', 'Datos eliminados correctamente!');
            // } else {
            //     this.servicePNotify.html(
            //         '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
            //         'error'
            //     );
            // }
            this.cargarAgentesAgrupaciones(this.agrupacion.AgrupacionId);
        },
        error => {
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
      Swal.fire(
        'Borrado!',
        'Este registro fue borrado.',
        'success'
      );
    }
  });

}

}


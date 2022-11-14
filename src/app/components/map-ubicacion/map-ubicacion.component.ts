
import { Component, ViewChild , OnInit, ElementRef, NgZone  } from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TipoReferenciaService, AgrupacionesService, MapUbicacionService, UsuarioService } from 'src/app/services/service.index';
import { IOption } from 'ng-select';
import { Agrupaciones } from 'src/app/models/agrupaciones.model';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Dotacion } from 'src/app/models/valorReferencia.model';

@Component({
  selector: 'app-map-ubicacion',
  templateUrl: './map-ubicacion.component.html',
  styles: []
})
export class MapUbicacionComponent implements OnInit {
  @ViewChild('search', {static: false})
  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;
  oculto: string = 'oculto';
  //title = 'Mapa Oferta';
  latitude: number = 5.065781;
  longitude: number = -75.507820;
  //zoom: number = 6;
  address: string;
  private geoCoder;

  title = 'Mapa Colectivos';
  lat: number = 5.065781;
  lng: number = -75.507820;
  zoom: number = 6;
  dotacion: Dotacion[];

  // tslint:disable-next-line:max-line-length
  constructor(public _usuarioService: UsuarioService , private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public _mapUbicacion: MapUbicacionService ) { 
    //this.cargarDotacionMapa();
  }

  ngOnInit() {
    //load Places Autocomplete
   this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
    this.geoCoder = new google.maps.Geocoder;
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"]
    });
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        // get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        // verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        // set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;
      });
    });
  });
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

cargarDotacionMapa() {
  this._usuarioService.cargarDotacionMapa( )
            .subscribe(
              (resp: any) => {
              //console.log(resp);
              // this.totalRegistros = resp.total;
               //this.usuarios = resp.usuarios;
               this.dotacion = resp.Lista;
               if (this.dotacion !== null) {
                for (let i = 0; i < this.dotacion.length; i++) {
                  this.dotacion[i].Latitud = String((Number(this.dotacion[i].Latitud)) +  (Math.random() - .5) / 1500);
                  this.dotacion[i].Longitud = String((Number(this.dotacion[i].Longitud)) +  (Math.random() - .5) / 1500);
                    // existingMarker.
                    // var pos = existingMarker.getPosition();
                    // //if a marker already exists in the same position as this marker
                    // if (latlng.equals(pos)) {
                    //     //update the position of the coincident marker by applying a small multipler to its coordinates
                    //     var newLat = latlng.lat() + (Math.random() -.5) / 1500;// * (Math.random() * (max - min) + min);
                    //     var newLng = latlng.lng() + (Math.random() -.5) / 1500;// * (Math.random() * (max - min) + min);
                    //     finalLatLng = new google.maps.LatLng(newLat,newLng);
                    // }
                }
            }
              // this.cargando = false;
            });
}

  // mostrarModal() {
  //   this._mapUbicacion.ocultarModal();
  // }

  // ocultarModal(){
  //   this.oculto = 'oculto';
  // }

}

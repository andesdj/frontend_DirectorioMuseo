import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Dotacion } from '../../models/valorReferencia.model';

@Component({
  selector: 'app-mapa-fichas',
  templateUrl: './mapa-fichas.component.html',
  styleUrls: ['./mapa-fichas.component.css']
})
export class MapaFichasComponent implements OnInit {
  title = 'Mapa Fichas';
  lat: number = 5.065781;
  lng: number = -75.507820;
  zoom: number = 6;
  dotacion: Dotacion[];

  


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

  constructor(public _usuarioService: UsuarioService) {
    this.cargarDotacionMapa();
    //this.dotacion = this._usuarioService.cargarDotacionMapa(); // this._usuarioService.dotacion;

    // for(let i = 0; i < json["data"].length; i++){
    //   this.mapInfos.push({lat: +json["data"][i].lat, long: +json["data"][i].long});
    // }

    //get array of markers currently in cluster
//var allMarkers = namespace.mapParams.mapMarkersArray;

//final position for marker, could be updated if another marker already exists in same position
//var finalLatLng = latlng;

//check to see if any of the existing markers match the latlng of the new marker


   }

  // placeMarker(position: any) {
  //   const lat = position.coords.lat;
  //   const lng = position.coords.lng;
  //   this.markers.push({ latitude: lat, longitude: lng });
  //   }

  ngOnInit() {
    
   

  }

}


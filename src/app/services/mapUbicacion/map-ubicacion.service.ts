import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapUbicacionService {
  public oculto: string = 'oculto';
  public notificacion = new EventEmitter<any>();

  constructor() { }

   mostrarModal() {
    this.oculto = '';
  }

   ocultarModal(){
    this.oculto = 'oculto';
  }
}

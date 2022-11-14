import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modaltext',
  templateUrl: './modaltext.component.html',
  styles: []
})
export class ModaltextComponent implements OnInit {
  oculto: string = 'oculto';
  constructor() {
    console.log('Modal Listo!!!');
  }

  ngOnInit() {
  }

  mostrarModal() {
    this.oculto = '';
  }

  ocultarModal(){
    this.oculto = 'oculto';
  }

}

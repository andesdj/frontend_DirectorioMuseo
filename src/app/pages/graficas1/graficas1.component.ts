import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {
 
  graficos: any = {
  'grafico1': {
    'labels': ['Antioquia', 'Cundinamarca', 'Atlantico'],
    'data':  [ [350, 450, 100]],
    'type': 'doughnut',
    'leyenda': 'Agentes por Departamento'
  },
  'grafico2': {
    'labels': ['Hombres', 'Mujeres'],
    'data':  [[4500, 6000]],
    'type': 'doughnut',
    'leyenda': 'Entrevistados'
  },
  'grafico3': {
    'labels': ['Si', 'No'],
    'data':  [[95, 5]],
    'type': 'doughnut',
    'leyenda': '¿Le gusta el Arte?'
  },
  'grafico4': {
    'labels': ['No', 'Si'],
    'data':  [[85, 15]],
    'type': 'doughnut',
    'leyenda': '¿Le gustan las peliculas Colombianas?'
  },
};

  constructor() { }

  ngOnInit() {
  }

}

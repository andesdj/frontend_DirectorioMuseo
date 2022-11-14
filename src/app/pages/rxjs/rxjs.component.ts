import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  listaEntidades: Array<any>;
  constructor() {
    this.subscription = this.regresaObservable()
    // .pipe(
    //   retry(2) // el numero de intento que quiero intentar
     //)
    .subscribe(
      numero => console.log('Subs', numero ), // el next
      error => console.error('Error en el obs', error), // error
      () => console.log('El observador termino') // cuando termina
    );


   }

   showPanel(sw, id) {
    debugger;
  }

  ngOnInit() {
  }
  ngOnDestroy() {

    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return  new Observable((observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval(() => {

      contador ++;

      const salida = {
        valor: contador
      };

      observer.next( salida);

      // if (contador === 3) {
      //   clearInterval(intervalo);
      //   observer.complete();
      // }
      // como se define un error
      // if ( contador === 2) {
      //    clearInterval(intervalo);
      //   observer.error('Auxilio!');
      // }

      }, 1000);

    }).pipe(
      map( resp  => resp.valor),
      filter((valor, index) => {
        // console.log('filter', valor. index);
        if ((valor % 2) === 1) {
          // impar
          return true;
         } else {
          // par
          return false;
        }
        //return true;
      })
     );
  }

}

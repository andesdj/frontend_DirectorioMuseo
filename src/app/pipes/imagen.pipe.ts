import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    const url = URL_SERVICIOS + '/img';
    if (!img) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    // switch (tipo) {
    //   case 'usuario':
    //        url += '/usuarios/' + img;
    //     break;

    //     case 'Agente':
    //         url += '/agentes/' + img;
    //     break;

    //     // case 'Entidad':

    //     // break;

    //     default:
    //       console.log('Tipo de imagen no existe');
    //       url = 'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg'; //url += '/usuarios/xxx';

    // }

    return url;
  }

}

import { Component, OnInit } from '@angular/core';
import { UsuarioService, TipoReferenciaService } from '../../services/service.index';
import { ValorReferencia } from 'src/app/models/valorReferencia.model';
import { IOption } from 'ng-select';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tablas-valores',
  templateUrl: './tablas-valores.component.html',
  styleUrls: ['./tablas-valores.component.css']
})
export class TablasValoresComponent implements OnInit {

  listaValorReferencia = [];
  listaTpub = [];
  displayListValorReferencia: boolean;
  displayCrearValorReferencia: boolean;
  valorReferencia: ValorReferencia;
  operacion = 'C';
  depLista: Array<IOption>;
  usuario: User;
  usuarioNombre: string;

  constructor(public _usuarioService: UsuarioService, public tipoReferenciaService: TipoReferenciaService) {
    this.displayListValorReferencia = true;
    this.displayCrearValorReferencia = false;
    this.valorReferencia = new ValorReferencia(null, null, '', '', '', '', '', '', '', '', '', '', false);
    this.listaTpub = [
      { Id: 'A', Nombre: 'Activo' },
      { Id: 'I', Nombre: 'Inactivo' },];
    const user: any = this._usuarioService.getCurrentUser();
    this.usuario = JSON.parse(user);
    this.usuarioNombre = this.usuario.USU_NOMBRE;

  }

  ngOnInit() {
    this.cargarValorReferencia();
    this.cargarTiposReferencia();
  }


  cargarTiposReferencia() {
    this.tipoReferenciaService.cargarTiposReferencia()
      .subscribe(
        (resp: any) => {
          this.depLista = resp.Lista;
        });

  }




  showPanel(sw, id) {
    if (sw === 'C') {//Crear Usuario
      this.displayListValorReferencia = false;
      this.displayCrearValorReferencia = true;
      this.inicializarModelo();
    } else if (sw === 'U') { // Actualizar Usuario
      this.displayListValorReferencia = false;
      this.displayCrearValorReferencia = true;
      this.cargarValorReferenciaById(id);
      this.operacion = 'U';
    } else if (sw === 'V') { // Volver al listado de Tipos de Referencia
      this.displayListValorReferencia = true;
      this.displayCrearValorReferencia = false;
      this.inicializarModelo();
      // recargar la tabla
      this.cargarValorReferencia();
    }
  }

  cargarValorReferenciaById(id) {
    this.tipoReferenciaService.getValorReferenciaById(id)
      .subscribe(

        (resp: any) => {
          // console.log(resp);
          this.valorReferencia = resp;
        });
  }


  inicializarModelo() {
    this.valorReferencia = {
      idValorReferencia: null,
      idTipoReferencia: null,
      nombre: '',
      descripcion: '',
      abreviatura: '',
      codigoAsociado: '',
      estado: '',
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaModificacion: '',
      fechaIniVigencia: '',
      fechaFinVigencia: '',
      checked: false,
    };
    this.listaValorReferencia = [];
  }

  cargarValorReferencia() {
    this.tipoReferenciaService.cargarValoresReferencia()
      .subscribe(
        (resp: any) => {
          this.listaValorReferencia = resp.Lista;
        });

  }

  borrarValorReferencia(id: any) {

    Swal.fire({
      title: 'Borrar Registro?',
      text: 'Ese proceso no se podra revertir!',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Esto!',
    }).then((result) => {
      if (result.value) {
        this.tipoReferenciaService.deleteValorReferencia(id).subscribe(
          (result) => {
            // if (result.OperacionExitosa) {
            //     this.getRedSocialByAgente();
            //     this.servicePNotify.warn('Eliminar', 'Datos eliminados correctamente!');
            // } else {
            //     this.servicePNotify.html(
            //         '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
            //         'error'
            //     );
            // }
            if (!result['OperacionExitosa']) {
              Swal.fire('Alerta', result['Mensaje'], 'error');
            }

            this.showPanel('V', null);
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
        Swal.fire('Borrado!', 'Este registro fue borrado.', 'success');
      }
      this.showPanel('V', null);
    });

  }

  onSubmit(isValid) {
    if (isValid) {
      this.valorReferencia.usuarioCreacion = this.usuarioNombre;
      this.tipoReferenciaService.crearValorReferencia(this.valorReferencia)
        .subscribe(resp => {
          this.showPanel('V', null);
        }
        );
      // if (this.operacion === 'U') {
      //   this.tipoReferenciaService.actualizarValorReferencia(this.valorReferencia)
      //     .subscribe(resp => {
      //       this.showPanel('V', null);
      //     }
      //     );
      // } else if (this.operacion === 'C') {
      //   this.tipoReferenciaService.crearValorReferencia(this.valorReferencia)
      //     .subscribe(resp => {
      //       this.showPanel('V', null);
      //     }
      //     );
      // }
    }
  }

}

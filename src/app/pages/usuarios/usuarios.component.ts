import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, SeguridadService } from '../../services/service.index';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
//import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { IOption } from 'ng-select';
// import { debug } from 'util';
// import { Console } from '@angular/core/src/console';



declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  operacion = 'C';
  usuario: Usuario;
  listaUsuarios = [];
  desde: number = 0;
  public displayListUsuario: boolean;
  public displayCrearUsuario: boolean;

  totalRegistros: number = 0;
  cargando: boolean = true;
  tipoDoc: Array<any>;
  tipoPerfil: Array<IOption>;

  constructor(
    public _usuarioService: UsuarioService,
    public _seguridad: SeguridadService
  ) {
    this.displayListUsuario = true;
    this.displayCrearUsuario = false;
    this.usuario = new Usuario(1, '', '', '', '', '', '', '', '', false, false, 1, null );

   }

  ngOnInit() {
    this.cargarUsuarios();
    this.tipoDoc = [{ Id: 1, Nombre: 'CC' }, { Id: 2, Nombre: 'NIT' }, { Id: 3, Nombre: 'CE' }, { Id: 4, Nombre: 'PASAPORTE' }];
    //this.tipoPerfil = [{ Id: 1, Nombre: 'Administrador' }, { Id: 2, Nombre: 'Agente' }];
    this.cargarPerfiles();
    // this._modalUploadService.notificacion
    //       .subscribe( resp => this.cargarUsuarios() );
  }

  

  cargarPerfiles() {
    this._seguridad.cargarPerfilesHabilitados( )
              .subscribe(
                (resp: any) => {
                 this.tipoPerfil = resp.Lista;
              });

  }



  showPanel(sw, id){
    if (sw === 'C') {//Crear Usuario
      this.displayListUsuario = false;
        this.displayCrearUsuario = true;
      this.inicializarModelo();
  } else if (sw === 'U') { // Actualizar Usuario
        this.displayListUsuario = false;
        this.displayCrearUsuario = true;
        this.cargarUsuariosByPersonaId(id);
        this.operacion = 'U';
      } else if (sw === 'V') {//Volver al listado de contratistas
        this.displayListUsuario = true;
        this.displayCrearUsuario = false;
        // this.inicializarModelo();
        // recargar la tabla
        this.cargarUsuarios();
      }
  }

  inicializarModelo() {
    this.usuario = {
        TipoIdentificacionId: null,
        PersonaNumeroId: '',
        PersonaPrimerNombre: '',
        PersonaSegundoNombre: '',
        PersonaPrimerApellido: '',
        PersonaSegundoApellido: '',
        PersonaEmail: '',
        CuentaUsuarioClave: '',
        CuentaUsuarioConfClave: '',
        CuentaUsuarioRecibirBoletin: null,
        CuentaUsuarioHabilitada: false,
        PerfilId: null,
        AreaId: null,
    };
}
  // actualizarPersosa(item){
  // }

  onSubmit() {
  
   
      if (this.operacion === 'U') {
        this._usuarioService.actualizarUsuario(this.usuario)
        .subscribe(resp => {
          this.showPanel('V', null);
          }
        );
       } else if (this.operacion === 'C') {
        this._usuarioService.crearUsuario(this.usuario)
        .subscribe(resp => {
          this.showPanel('V', null);
          }
        );
      }
    
    //console.log(isValid);
  }

  sonIguales(campo1: string, campo2: string) {
     debugger;
    return (group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }

  // mostrarModal( id: string ) {

  //   this._modalUploadService.mostrarModal( 'usuarios', id );
  // }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( )
              .subscribe(

                (resp: any) => {
                //console.log(resp);
                // this.totalRegistros = resp.total;
                 //this.usuarios = resp.usuarios;
                 this.listaUsuarios = resp.Lista;
                // this.cargando = false;

              });

  }

  cargarUsuariosByPersonaId(id) {

    this.cargando = true;

    this._usuarioService.getUsuarioByPersonaId(id)
              .subscribe(

                (resp: any) => {
                console.log(resp);
            
                // this.totalRegistros = resp.total;
                 //this.usuarios = resp.usuarios;
                 this.usuario = resp;
                // this.cargando = false;

              });

  }

  // cambiarDesde( valor: number ) {

  //   let desde = this.desde + valor;

  //   if ( desde >= this.totalRegistros ) {
  //     return;
  //   }

  //   if ( desde < 0 ) {
  //     return;
  //   }

  //   this.desde += valor;
  //   this.cargarUsuarios();

  // }

  // buscarUsuario( termino: string ) {

  //   if ( termino.length <= 0 ) {
  //     this.cargarUsuarios();
  //     return;
  //   }

  //   this.cargando = true;

  //   this._usuarioService.buscarUsuarios( termino )
  //           .subscribe( (usuarios: Usuario[]) => {

  //             this.usuarios = usuarios;
  //             this.cargando = false;
  //           });

  // }

  // borrarUsuario( usuario: Usuario ) {

  //   if ( usuario._id === this._usuarioService.usuario._id ) {
  //     swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
  //     return;
  //   }

  //   swal({
  //     title: '¿Esta seguro?',
  //     text: 'Esta a punto de borrar a ' + usuario.nombre,
  //     icon: 'warning',
  //     buttons: true,
  //     dangerMode: true,
  //   })
  //   .then( borrar => {

  //     if (borrar) {

  //       this._usuarioService.borrarUsuario( usuario._id )
  //                 .subscribe( borrado => {
  //                     this.cargarUsuarios();
  //                 });

  //     }

  //   });

  // }

  // guardarUsuario( usuario: Usuario ) {

  //   this._usuarioService.actualizarUsuario( usuario )
  //           .subscribe();

  // }

}

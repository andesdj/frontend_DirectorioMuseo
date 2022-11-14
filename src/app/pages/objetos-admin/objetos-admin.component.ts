import { Component, OnInit } from '@angular/core';
import { AsistenciaActividad, AsistentesObjetos,Objetos } from '../../models/Actividades.model';
import { TipoReferenciaService } from '../../services/tipoReferencia/tipo-referencia.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ObjetosService } from '../../services/objetos/objetos.service';
import { IOption } from 'ng-select';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { URL_SERVICIOS } from 'src/app/config/config';
declare var $:any;
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';


@Component({
  selector: 'app-objetos-admin',
  templateUrl: './objetos-admin.component.html',
  styleUrls: ['./objetos-admin.component.css']
})
export class ObjetosAdminComponent implements OnInit {
  selectedItemsAreaPrincipal: any[] = [];
  datos = [];
  tasks: DataSource;
  popupCompromisos: boolean;
  asistentesObjetos: AsistentesObjetos[];
  opcion: Array<any> =  
  [{name: 'Si', value: '1'}];

  userConsent: boolean = false;
    modificar = 0;
  url: string;
  urlImagen1: string;
  urlImagen2: string;
  urlImagen3: string;
  urlDocumento: string;
  urlDocumento2: string;
  urlDocumento3: string;
  urlDocumento4: string;
  valueExperiencia: any[] = [];
  valueExperiencia2: any[] = [];
  valueExperiencia3: any[] = [];
  valueExperiencia4: any[] = [];
  objetos: Objetos[];
  objeto: Objetos;
  asistenciaActividad: AsistenciaActividad;
  usuario: User;
  usuarioNombre: string;
  email: string;
  roles: any;
  role: string;
  usuId: number;
  perfilId: number;
  tipoDoc: Array<IOption>;
  listaTiposActor: Array<IOption>;
  listaEstados: Array<IOption>;
  listaTecnicasElaboracion: Array<IOption>;
  listaMateriales: Array<IOption>;
  tipoTipoOrganizacion: Array<IOption>;
  paisesLista: Array<IOption>;
  depLista: Array<IOption>;
  munListaRecidencia: Array<IOption>;
  centroPobladoListaRecidencia: Array<IOption>;
  EstaseguroVeracidadInformacion: number;
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  ocultoDocumento = 'oculto';
  constructor(public _ojetosService: ObjetosService, public _tipoReferenciaService: TipoReferenciaService ,public _objetoService: ObjetosService, public _usuarioService: UsuarioService) {
    this.asistenciaActividad = new AsistenciaActividad(null, null, '', null, null, null, '', '', null, null, '', null, '', '', null, null, null, null, null, null, '', null, null, null, null, null, '', null, '', '', '', null, null, '', null, '', '', null, '', '', '', null, null, null, null, null, '', '', '', '', '', null, null, null, '', null, null, '', '', null, '', '','','', '', null, null, null, null, null,null, null, null, '',  [], '', null, null);
    this.objetos = [];
    this.objeto = new Objetos(null, null, '', '', '', null, '', '', null, '', '', null, null, null, '', '', '', '', '', '', '', '', '','','', '', false, null, '', [], null);
    this.popupCompromisos = false; 
    this.datos = [];
    this.selectedItemsAreaPrincipal = [];
  }

  ngOnInit() {
    this.CargarObjetos();
    this.cargarTiposIdentificacion();
    this.cargarTiposActor();
    this.cargarTiposTipoOrganizacion();
    this.getPaises();
    this.getDep();
    this.mostrarMunicipiosRecidencia();
    this.cargarTecnicasElaboracion();
    this.cargarEstados();
    this.cargarHechosVictimizantes();
    this.cargarMateriales();
  }


  descargarArchivoExperiencia() {
    if (this.asistenciaActividad.Objetos[0].ObjetoId !== null) {
      //this.loading = true;
      this._objetoService.downloadMediosExperienciaById(
          this.asistenciaActividad.Objetos[0].ObjetoId
        )
        .subscribe(
          (res) => {
            console.log('start download:', res);
            const url = window.URL.createObjectURL(res);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = 'archivo.mp3';
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove(); // remove the element
            //this.loading = false;
          },
          (error) => {
           
            console.log(<any>error);
          }
        );
    }
  }

  cargarHechosVictimizantes() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_HECHOS_VICTIMIZANTES_PIEZAS')
      .subscribe(
        (result) => {
          
          const resultArray = result.Lista.map((elm) => ({
            id: elm.idValorReferencia,
            text: elm.nombre,
          }));
          this.tasks = new DataSource({
            store: new ArrayStore({
              key: 'id',
              data: resultArray,
            }),
          });
          this.datos = this.asistenciaActividad.Objetos[0].HechosVictimizantes;
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


  mostrarListado()
  {
    this.popupCompromisos = false;
    this.CargarObjetos();
  }

  CargarObjetos() {
    this._ojetosService.getAllObjetos().subscribe((resp: any) => {
      debugger;
      this.asistentesObjetos = resp.Lista;
    });
  }

  
 
  modificarDireccion()
  {
    this.modificar = 1;
  }

  cambioCheckDimenciones() {
    this.objeto.EsManifestacionInmaterial = !this.objeto.EsManifestacionInmaterial;
    
  }

  subidaCompletaImagen(e: {
    request: {
      status: number;
      response: string;
    };
  }) {
    if (e.request.status === 201) {
      const obj = JSON.parse(e.request.response);
      console.log(obj.Message.split('|')[1]);
      this.objeto.Archivo1Nombre = obj.Message.split('|')[1];
      this.urlImagen1 =
        URL_SERVICIOS + '/Medios/Objetos/' + obj.Message.split('|')[1];
      setTimeout(() => {
        // swal('Archivo cargado', 'Los datos se han subido correctamente!', 'success' );
        Swal.fire(
          'Imagen cargada!',
          'El archivo se ha subido correctamente!.',
          'success'
        );
      }, 15);
    } else {
      setTimeout(() => {
        // swal('ERROR', 'Los datos NO se han subido correctamente!', 'success' )
        Swal.fire(
          'ERROR!',
          'EL archivo no se ha subido correctamente!',
          'error'
        );
      }, 15);
    }
  }

  subidaCompletaImagen4(e: {
    request: {
      status: number;
      response: string;
    };
  }) {
    if (e.request.status === 201) {
      const obj = JSON.parse(e.request.response);
      console.log(obj.Message.split('|')[1]);
      this.objeto.Archivo4Nombre = obj.Message.split('|')[1];
      // this.urlImagen3 =
      //   URL_SERVICIOS + '/Medios/Objetos/' + obj.Message.split('|')[1];
      setTimeout(() => {
        // swal('Archivo cargado', 'Los datos se han subido correctamente!', 'success' );
        Swal.fire(
          'Archivo cargada!',
          'El archivo se ha subido correctamente!.',
          'success'
        );
      }, 15);
    } else {
      setTimeout(() => {
        // swal('ERROR', 'Los datos NO se han subido correctamente!', 'success' )
        Swal.fire(
          'ERROR!',
          'EL archivo no se ha subido correctamente!',
          'error'
        );
      }, 15);
    }
  }

  subidaCompletaImagen2(e: {
    request: {
      status: number;
      response: string;
    };
  }) {
    if (e.request.status === 201) {
      const obj = JSON.parse(e.request.response);
      console.log(obj.Message.split('|')[1]);
      this.objeto.Archivo2Nombre = obj.Message.split('|')[1];
      this.urlImagen2 =
        URL_SERVICIOS + '/Medios/Objetos/' + obj.Message.split('|')[1];
      setTimeout(() => {
        // swal('Archivo cargado', 'Los datos se han subido correctamente!', 'success' );
        Swal.fire(
          'Archivo cargado!',
          'El archivo se ha subido correctamente!.',
          'success'
        );
      }, 15);
    } else {
      setTimeout(() => {
        // swal('ERROR', 'Los datos NO se han subido correctamente!', 'success' )
        Swal.fire(
          'ERROR!',
          'EL archivo no se ha subido correctamente!',
          'error'
        );
      }, 15);
    }
  }

  subidaCompletaImagen3(e: {
    request: {
      status: number;
      response: string;
    };
  }) {
    if (e.request.status === 201) {
      const obj = JSON.parse(e.request.response);
      console.log(obj.Message.split('|')[1]);
      this.objeto.Archivo3Nombre = obj.Message.split('|')[1];
      this.urlImagen3 =
        URL_SERVICIOS + '/Medios/Objetos/' + obj.Message.split('|')[1];
      setTimeout(() => {
        // swal('Archivo cargado', 'Los datos se han subido correctamente!', 'success' );
        Swal.fire(
          'Imagen cargada!',
          'La imagen se ha subido correctamente!.',
          'success'
        );
      }, 15);
    } else {
      setTimeout(() => {
        // swal('ERROR', 'Los datos NO se han subido correctamente!', 'success' )
        Swal.fire(
          'ERROR!',
          'La imagen no se ha subido correctamente!',
          'error'
        );
      }, 15);
    }
  }

  addIdParameterImagen(e: any) {
    this.urlDocumento = URL_SERVICIOS + 'ApiRest/Objetos/MediaUploadImagen';
  }

  addIdParameterImagen2(e: any) {
    this.urlDocumento2 = URL_SERVICIOS + 'ApiRest/Objetos/MediaUploadImagen';
  }

  addIdParameterImagen3(e: any) {
    this.urlDocumento3 = URL_SERVICIOS + 'ApiRest/Objetos/MediaUploadImagen';
  }

  addIdParameterImagen4(e: any) {
    this.urlDocumento4 = URL_SERVICIOS + 'ApiRest/Objetos/MediaUploadImagen';
  }

  onSubmitCompromisoAvance(isValid: any){
    if (isValid) {

        // debugger;
    // if (this.objeto.Archivo1Nombre === '') {
    //   Swal.fire(
    //     'Mensaje',
    //     'Debe Seleccionar la imagen y hacer clic en el boton subir archivo',
    //     'error'
    //   );
    //   return;
    // }
      this.asistenciaActividad.UsuarioRegistra = this.usuId;
        // if (this.accionCompromiso === 'U') {
        //   this.compromiso.FechaActualizada = Date..now().toString();
        // } else {
        //   this.compromiso.FechaRegistro = Date.now().toString();
        // }

        this.asistenciaActividad.Objetos[0].HechosVictimizantes = [];
      for (let i = 0; i < this.selectedItemsAreaPrincipal.length; i++) {
        this.asistenciaActividad.Objetos[0].HechosVictimizantes.push(
          this.selectedItemsAreaPrincipal[i].id
        );
      }

        this.objetos[0] =  this.objeto
        this.asistenciaActividad.Objetos = this.objetos;
        let respuesta: boolean;
        this._objetoService
          .ActualizarObjeto(this.asistenciaActividad)
          .subscribe((resp) => {
            //this.compromisosAvances = [];
          //   if(resp)
          // {
          //   this.inicializarAvanceCompromiso(1);    
          // }
          });
        
          // if(this._objetoService.respuesta)
          // {
          //   this.inicializarAvanceCompromiso(1);    
          // }
          
          
    }
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
  mostrarCentrosPoblados() {
    this._tipoReferenciaService
      .getCentrosPobladosByMunicipio(this.asistenciaActividad.MunicipioId)
      .subscribe(
        (result) => {
          this.centroPobladoListaRecidencia = result.Lista;
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

  mostrarMunicipiosRecidencia() {
    this._tipoReferenciaService
      .getMunicipiosByDepartamento(this.asistenciaActividad.DepartamentoId)
      .subscribe(
        (result) => {
          this.munListaRecidencia = result.Lista.filter(item=>item.Nombre !== "Departamento" );
          
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

  getDep() {
    this._tipoReferenciaService.getDepartamentos().subscribe(
      (result) => {
        
        this.depLista = result.Lista.filter(item=>item.Nombre !== "NACIONAL" );
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

  consultaAsistentesPorAsistenciaActividadId(id: number) {
    debugger;
    //this.inicializarAvanceCompromiso();
    this.popupCompromisos = true;
    this._objetoService
      .consultaAsistentesPorAsistenciaActividadId(id)
      .subscribe(
        (result) => { 
          
           let bandera: Boolean = false;
          // bandera = result['OperacionExitosa'];
          debugger;
            this.asistenciaActividad = result;
            
            //this.asistenciaActividad.ActividadId = actividadId;
            this.objeto = this.asistenciaActividad.Objetos[0];
            this.urlImagen1 = this.objeto.Archivo1Nombre;
            this.urlImagen2 = this.objeto.Archivo2Nombre;
            this.urlImagen3 = this.objeto.Archivo3Nombre;
            this.cambioCheckDimenciones()
            this.mostrarMunicipiosRecidencia();
            this.mostrarCentrosPoblados();
            this.cargarHechosVictimizantes()
          // bandera = result['OperacionExitosa'];
          // if (!result['OperacionExitosa']) {
          //   Swal.fire('Alerta', result['Mensaje'], 'error');
          //   this.asistenciaActividad.NumeroIdentificacion = '';
          // }
          
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

  cargarTiposIdentificacion() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_TIPO_DOC_IDENTIFICACION')
    .subscribe(
      (result) => {
        
        this.tipoDoc = result.Lista;
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

  cargarEstados() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_ESTADO_PIEZAS')
    .subscribe(
      (result) => {
        
        this.listaEstados = result.Lista;
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

  cargarTecnicasElaboracion() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TECNICAS_ELABORACION')
    .subscribe(
      (result) => {
        
        this.listaTecnicasElaboracion = result.Lista;
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

  cargarMateriales() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_MATERIALES')
    .subscribe(
      (result) => {
        
        this.listaMateriales = result.Lista;
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

  

  

  cargarTiposTipoOrganizacion() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_ORGANIZACION')
    .subscribe(
      (result) => {
        
        this.tipoTipoOrganizacion = result.Lista;
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


  

  cargarTiposActor() {
    this._tipoReferenciaService
      .getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_ACTOR')
      .subscribe(
        (result) => {
          
          this.listaTiposActor = result.Lista;
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

  armarDireccion(e){
    //console.log(e);
    let via = $('.direcc0').val();
    let num1 = $('.direcc1').val();
    let Letra0 = $('.direcc5').val();
    let Letra1 = $('.direcc6').val();
    let Letra7 = $('.direcc7').val();
    let Letra8 = $('.direcc8').val();
    let num2 = $('.direcc2').val();
    let num3 = $('.direcc3').val();
    let num4 = $('.direcc4').val();
    //let otro = $('.direcc4').val();

    if(num1 != ""){
      num1 = " "+num1;
    }
    if(Letra0 != ""){
      Letra0 = " "+Letra0;
    }

    if(Letra7 != ""){
      Letra7 = " "+Letra7;
    }

    if(Letra8 != ""){
      Letra8 = " "+Letra8;
    }

    
    

    if(num4 != ""){
      num4 = " - "+num4;
    }
    if(num2 != ""){
      num2 = " "+num2;
    }
    if(num3 != ""){
      num3 = " # "+num3;
    }
    /*if(otro != ""){
      otro = ", "+otro;
    }*/

    //$('.direcc').val(via+num1+num2+num3+otro);
    //this.asistenciaActividad.DireccionFisica = (via+num1+num2+num3/+otro/);
    this.asistenciaActividad.DireccionFisica = (via+num1+Letra0+num2+Letra7+num3+Letra1+num4+Letra8);
  }

  armarComplemento(){
    //console.log(e);
    let num1 = $('.direcc9').val();
    let num2 = $('.direcc10').val(); 
    //let otro = $('.direcc4').val();

    if(num1 != ""){
      num1 = " "+num1;
    }
    
    if(num2 != ""){
      num2 = " "+num2;
    }
    /*if(otro != ""){
      otro = ", "+otro;
    }*/

    //$('.direcc').val(via+num1+num2+num3+otro);
    //this.asistenciaActividad.DireccionFisica = (via+num1+num2+num3/+otro/);
    this.asistenciaActividad.DireccionFisica = this.asistenciaActividad.DireccionFisica+(num1+num2);
  }

  inicializarAvanceCompromiso(id) {
    this.objeto = {
      Alto:null,
      Ancho: null,
      Archivo1Nombre: '',
      Archivo1Ruta: '',
      AsistenciaActividadId: null,
      ConoceFechaElaboracionPieza: null,
      DescripcionDeseaDonar: '',
      DescripcionTecnicaElaboracionPieza: '',
      FechaElaboracionPieza: '',
      JustificacionDonacion: '',
      Largo:null,
      MaterialUsadoElaboracionPieza: '',
      NombreAutorElaboroObjeto: '',
      NombreDeseaDonar: '',
      ObjetoId:null,
      OtroTecnicaElaboracionPieza: '',
      TecnicaElaboracionPiezaId: null,
      TieneFotografiaObjeto: '',
      Archivo2Nombre: '',
      Archivo2Ruta: '',
      Archivo3Nombre: '',
      Archivo3Ruta: '',
      Archivo4Nombre: '',
      Archivo4Ruta: '',
      OtrasObservaciones: '',
      TecnicaElaboracionPieza: '',
      EsManifestacionInmaterial: false,
      EstadoId: null,
      ObservacionesEstado: '',
      HechosVictimizantes: [],
      MaterialId: null,

    };
    this.asistenciaActividad = {
      AsistenciaActividadId: null,
      ActividadId: null,
      AvanceCualitativo: '',
      AvanceCuantitativo: null,
      EstadoId: null,
      FechaActualiza: '',
      FechaRegistra: '',
      UsuarioRegistra: null,
      ArchivoId: null,
      TipoActorId: null,
      CargoRolPerfil: '',
      TipoDocumentoId: null,
      NumeroIdentificacion: '',
      NombreCompleto: '',
      OcupacionId: null,
      NivelEscolaridadId: null,
      VictimaConflicto: null,
      Edad: null,
      LenguaMaternaId: null,
      NumeroDocumentoAcompanante: '',
      NombreAcompanante: '',
      IdPadre: null,
      GrupoEtareoId: null,
      IdentidadGeneroId: null,
      IdentidadEtnicoId: null,
      Discapacidad: null,
      CorreoElectronico: '',
      RecibioPublicacion: null,
      NombrePublicacion: '',
      EnlaceLiderazgoCoordinacion: '',
      QueHaceElActor: '',
      PaisId: null,
      MunicipioId: null,
      NombreCompletoRepresentalteLEgal: '',
      TipoDocumentoRepresentalteLegalId: null,
      NumeroIdentificacionRepresentanteLegal: '',
      CorreoElectronicoRepresentanteLegal: '',
      AnoEntidadId: null,
      DireccionEntidad: '',
      CorreoElectronicoEntidad: '',
      TelefonoEntidad: '',
      MunicipioEntidadId: null,
      PaginaWebEntidad: '',
      CentroPobladoId: null,
      CabeceraMunicipal: null,
      AreaRural: null,
      Comuna: '',
      Corregimiento: '',
      Vereda: '',
      TerritorioColectivo: '',
      Resguardo: '',
      ActorGeneroHechoId: null,
      TipoHechoVictimizanteId: null,
      TipoDiscapacidadId: null,
      CiudadResidencia: '',
      DepartamentoId: null,
      DireccionFisica: '',
      HoraActividad: '',
      HoraLimite: '',
      SegundaLenguaId: null,
      FechaNacimiento: '',
      NumeroTelefonico: '',
      SegundoCorreoElectronico: '',
      SegundoNumeroTelefonico:'',
      NumeroIdentificacionConfirmar: '',
      OrientacionSexualId: null,
      TipoDireccionId: null,
      ClasificacionId: null,
      AnoConstitucionId: null,
      TipoDocumentoAcompananteId: null,
      TipoOrganizacionPerteneceId: null,
      PerteneceOrganizacionVictimas: null,
      NombreOrganizacionPertenece: null,
      VeredaLocalidadCorregimientoResguardoBarrio:'',
      Objetos: null,
      OtroTipoOrganizacion: '',
      TieneNumeroIdentificacion: null,
      CargoRolPerfilId: null
      
    };
    
    this.valueExperiencia = [];
    this.valueExperiencia2 = [];
    this.valueExperiencia3 = [];
    this.valueExperiencia4 = [];
    this.urlImagen1 = '';
    this.urlImagen2 = '';
    this.urlImagen3 = '';
  }

  limpiarCamposLugarResidencia() {
    this.asistenciaActividad.CiudadResidencia = '';
    this.asistenciaActividad.DepartamentoId = null;
    this.asistenciaActividad.MunicipioId = null;
  }

  aprobarAgente(id: any) {
    Swal.fire({
      title: 'Cambiar estado de Objeto?',
      text: 'Este proceso cambiara el estado del registro!',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiar de estado!',
    }).then((result) => {
      
      

      if (result.value) {
        // this.loading = true;
      this.objetos[0] =  this.objeto
      this.asistenciaActividad.Objetos = this.objetos;
    this._objetoService.actualizarEstadoObjeto(this.asistenciaActividad).subscribe((resp) => {
      // this.showPanel('V', null);
     // this.agente.AgenteId = this._agenteService.AgenteId;
      //this.loading = false;
    });
        Swal.fire(
          'Cambio de estado!',
          'su registro cambiado de estado.',
          'success'
        );
      }
    });
  }

}

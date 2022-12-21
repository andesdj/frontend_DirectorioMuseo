"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ActividadesComponent = void 0;
var core_1 = require("@angular/core");
var actividades_model_1 = require("../../models/actividades.model");
var sweetalert2_1 = require("sweetalert2");
var ActividadesComponent = /** @class */ (function () {
    function ActividadesComponent(_actividadService, _tipoReferenciaService, _usuarioService) {
        this._actividadService = _actividadService;
        this._tipoReferenciaService = _tipoReferenciaService;
        this._usuarioService = _usuarioService;
        this.tieneNumeroIdentificacion = false;
        this.maxDate = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate()
        };
        this.startEditAction = 'click';
        this.selectTextOnEditStart = true;
        this.dataSourceAnos = [{
                'ID': 183,
                'Name': '2021'
            }, {
                'ID': 184,
                'Name': '2021'
            }];
        this.value = new Date(1981, 3, 27);
        this.now = new Date();
        this.customizeTooltip = function (pointsInfo) {
            return { text: parseInt(pointsInfo.originalValue) + " Días Restantes" };
        };
        this.customizeTooltipPorcentaje = function (pointsInfo) {
            return { text: parseInt(pointsInfo.originalValue) + "%" };
        };
        this.actividad = new actividades_model_1.Actividades(null, null, null, null, null, null, '', '', null, null, '', '', '', '', null, null, '', '', null, null, null, null);
        this.asistenciaActividad = new actividades_model_1.AsistenciaActividad(null, null, '', null, null, null, '', '', null, null, '', null, '', '', null, null, null, null, null, null, '', null, null, null, null, null, '', null, '', '', '', null, null, '', null, '', '', null, '', '', '', null, null, null, null, null, '', '', '', '', '', null, null, null, '', null, null, '', '', null, '', '', '', '', '', null, null, null, null, null, null, null, null, '', null, '', false, null);
        this.procesosActividad = new actividades_model_1.procesosActividad(null, null, '', '', '', null, '');
        this.procesos = new actividades_model_1.ProcesoEnt(null, '', '', '', '', '', null, '', '', null);
        this.aportantesProceso = new actividades_model_1.AportanteProceso(null, null, null, '', '');
        this.flag = 0;
        this.victimaConlficto = 0;
        this.tipoActor = 0;
        this.popupCompromisos = false;
        this.popupCompromisosAvances = false;
        this.AnoId = "183";
        this.DireccionId = '0';
        this.AreaId = '0';
        var user = this._usuarioService.getCurrentUser();
        this.usuario = JSON.parse(user);
        this.usuarioNombre = this.usuario.USU_NOMBRE;
        this.email = this.usuario.USU_CORREO_ELECTRONICO;
        this.usuId = this.usuario.USU_ID;
        this.roles = this.usuario.Perfiles;
        if (this.roles.length > 0) {
            this.role = this.roles[0].PER_NOMBRE;
            this.perfilId = this.roles[0].PER_ID;
        }
    }
    ActividadesComponent.prototype.ngOnInit = function () {
        this.cargarDiscapacidad();
        this.cargarIdentidadEtnica();
        this.cargarIdentidadGenero();
        this.cargarGrupoEtareo();
        this.cargarLenguaMaterna();
        this.cargarOrientacionSexual();
        this.cargarHechoVictimizante();
        this.cargarActorGeneraHecho();
        this.cargarTiposNivelEscolaridad();
        this.cargarTiposOcupacion();
        this.cargarTiposIdentificacion();
        this.cargarPerilCargo();
        this.cargarTiposActor();
        this.getUsuariosInternos();
        this.cargarTiposCompromisos();
        this.cargarEstado();
        this.cargarTipoReporte();
        this.cargarImportancia();
        this.cargarJefesDependencia();
        this.getDirecciones();
        this.getDep();
        this.getAllCompromisos();
        this.getPaises();
        this.getAnos();
        this.cargarListaVias();
        this.cargarClasificacion();
        this.cargarProcesos();
    };
    ActividadesComponent.prototype.ayudaCrearActividad = function () {
        sweetalert2_1["default"].fire({
            // icon: 'warning',
            html: '<iframe width=480 height=280 frameborder="0" scrolling="no" src="https://screencast-o-matic.com/embed?sc=cr6tqEVlbIA&v=5&ff=1" allowfullscreen="true"></iframe>',
            showCloseButton: true,
            focusConfirm: false
        });
    };
    ActividadesComponent.prototype.ayudaCrearAsistente = function () {
        sweetalert2_1["default"].fire({
            // icon: 'warning',
            html: '<iframe width=480 height=280 frameborder="0" scrolling="no" src="https://screencast-o-matic.com/embed?sc=cr6tYQVlbFD&v=5&ff=1" allowfullscreen="true"></iframe>',
            showCloseButton: true,
            focusConfirm: false
        });
    };
    ActividadesComponent.prototype.onSubmitCompromisoAvance = function (isValid) {
        var _this = this;
        if (isValid) {
            this.asistenciaActividad.UsuarioRegistra = this.usuId;
            // if (this.accionCompromiso === 'U') {
            //   this.compromiso.FechaActualizada = Date..now().toString();
            // } else {
            //   this.compromiso.FechaRegistro = Date.now().toString();
            // }
            this._actividadService
                .addAsistenciaActividad(this.asistenciaActividad)
                .subscribe(function (resp) {
                _this.popupCompromisosAvances = false;
                _this.CargarCompromisosAvances(_this.asistenciaActividad.ActividadId);
                _this.getAllCompromisos();
                //this.compromisosAvances = [];
            });
        }
    };
    ActividadesComponent.prototype.showAccionCompromisoAvance11 = function (id, accion) {
        var _this = this;
        this.asistenciaActividad.AsistenciaActividadId = id;
        if (accion === 'C') {
            this.inicializarAvanceCompromiso(id);
        }
        else if (accion === 'U') {
            this._actividadService
                .getAsistenciaActividadByAsistenciaActividadId(id)
                .subscribe(function (resp) {
                _this.asistenciaActividad = resp;
            });
        }
        this.accionCompromiso = accion;
        this.popupCompromisosAvances = true;
    };
    ActividadesComponent.prototype.consultarPorCedula = function (id) {
        var _this = this;
        var actividadId = this.asistenciaActividad.ActividadId;
        ;
        var numeroIdentificacion = this.asistenciaActividad.NumeroIdentificacion;
        this._actividadService
            .consultaAsistentePorCedula(this.asistenciaActividad.NumeroIdentificacion)
            .subscribe(function (result) {
            var bandera = false;
            // bandera = result['OperacionExitosa'];
            debugger;
            if (result.NumeroIdentificacion != null) {
                _this.asistenciaActividad = result;
                _this.asistenciaActividad.NumeroIdentificacion = numeroIdentificacion;
                _this.asistenciaActividad.ActividadId = actividadId;
            }
            // bandera = result['OperacionExitosa'];
            // if (!result['OperacionExitosa']) {
            //   Swal.fire('Alerta', result['Mensaje'], 'error');
            //   this.asistenciaActividad.NumeroIdentificacion = '';
            // }
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            // swal('Agente Creado', resp.Mensaje, 'success' );
            console.log(error);
        });
    };
    ActividadesComponent.prototype.inicializarAvanceCompromiso = function (id) {
        this.asistenciaActividad = {
            AsistenciaActividadId: null,
            ActividadId: id,
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
            SegundoNumeroTelefonico: '',
            NumeroIdentificacionConfirmar: '',
            OrientacionSexualId: null,
            TipoDireccionId: null,
            ClasificacionId: null,
            AnoConstitucionId: null,
            TipoDocumentoAcompananteId: null,
            TipoOrganizacionPerteneceId: null,
            PerteneceOrganizacionVictimas: null,
            NombreOrganizacionPertenece: null,
            VeredaLocalidadCorregimientoResguardoBarrio: '',
            Objetos: null,
            OtroTipoOrganizacion: '',
            TieneNumeroIdentificacion: false,
            CargoRolPerfilId: null
        };
    };
    ActividadesComponent.prototype.borrarAvanceCompromiso = function (AsistenciaActividadId, ActividadId) {
        var _this = this;
        console.log(ActividadId);
        sweetalert2_1["default"].fire({
            title: 'Borrar Asistencia Actividad?',
            text: 'Ese proceso no se podra revertir!',
            // type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar Esto!'
        }).then(function (result) {
            if (result.value) {
                _this._actividadService.deleteAsistenciaActividad(AsistenciaActividadId, ActividadId).subscribe(function (result) {
                    // if (result.OperacionExitosa) {
                    //     this.getRedSocialByAgente();
                    //     this.servicePNotify.warn('Eliminar', 'Datos eliminados correctamente!');
                    // } else {
                    //     this.servicePNotify.html(
                    //         '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
                    //         'error'
                    //     );
                    // }
                    // se puede utilizar esta variable para controler los mensajes del back
                    //console.log(result.OperacionExitosa);
                    if (result.OperacionExitosa) {
                        sweetalert2_1["default"].fire('Borrado!', 'Este registro fue borrado.', 'success');
                    }
                    else {
                        sweetalert2_1["default"].fire('ERROR!', 'Ocurrio un error al borrar el registro', 'error');
                    }
                    _this.CargarCompromisosAvances(ActividadId);
                }, function (error) {
                    // this.error = error;
                    // if (error.statusText === 'Unauthorized') {
                    //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    //     this.authenticationService.logout().subscribe(response => { });
                    //     this.storageService.logout();
                    // }
                    // swal('Agente Creado', resp.Mensaje, 'success' );
                    console.log(error);
                });
            }
        });
    };
    ActividadesComponent.prototype.cambioCkedTieneDocumento = function () {
        this.asistenciaActividad.TieneNumeroIdentificacion = !this.asistenciaActividad.TieneNumeroIdentificacion;
        this.tieneNumeroIdentificacion = this.asistenciaActividad.TieneNumeroIdentificacion;
        if (!this.asistenciaActividad.TieneNumeroIdentificacion) {
            this.asistenciaActividad.NumeroIdentificacion = '';
        }
    };
    ActividadesComponent.prototype.showAccionCompromisoAvance = function (id, accion) {
        var _this = this;
        this.asistenciaActividad.ActividadId = id;
        if (accion === 'C') {
            this.inicializarAvanceCompromiso(id);
        }
        else if (accion === 'U') {
            this._actividadService
                .getAsistenciaActividadByAsistenciaActividadId(id)
                .subscribe(function (resp) {
                _this.asistenciaActividad = resp;
                _this.asistenciaActividad.NumeroIdentificacionConfirmar = _this.asistenciaActividad.NumeroIdentificacion;
                _this.asistenciaActividad.ActividadId = id;
                //this.asistenciaActividad.TipoDireccion = 1;
                _this.mostrarMunicipiosRecidencia();
            });
        }
        this.accionCompromiso = accion;
        this.popupCompromisosAvances = true;
    };
    ActividadesComponent.prototype.showVolverAvance = function () {
        this.popupCompromisosAvances = false;
    };
    ActividadesComponent.prototype.getAnos = function () {
        var _this = this;
        this._tipoReferenciaService.getValorReferenciaPorTipoValorId(16).subscribe(function (result) {
            _this.AnosLista = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.getPaises = function () {
        var _this = this;
        this._tipoReferenciaService.getPaises().subscribe(function (result) {
            _this.paisesLista = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.getDep = function () {
        var _this = this;
        this._tipoReferenciaService.getDepartamentos().subscribe(function (result) {
            _this.depLista = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    // getRandomId(){
    //   let shuffled =this.getProcess.sort(() => Math.random() - 0.5);
    //   return shuffled[1];
    // }
    ActividadesComponent.prototype.cargarProcesos = function () {
        var data = [
            { "procesoId": 1, "NombreProceso": "Semana de la memoria", "FechaInicio": "1/12/2022", "FechaFinEstimada": "15/12/2022", "FechaFinalizacionReal": "7/12/2022", "PresupuestoEstimado": "150.000.000", "AreaResponsableId": 1, "AreaResponsable": "Dirección Museo de la Memoria ", "EquipoLider": "Curaduría ", "EquipoLiderId": 1 },
            { "procesoId": 2, "NombreProceso": "Mesa nacional de participación", "FechaInicio": "1/5/2022", "FechaFinEstimada": "30/7/2022", "FechaFinalizacionReal": "30/7/2022", "PresupuestoEstimado": "125.000.000", "AreaResponsableId": 1, "AreaResponsable": "Dirección Museo de la Memoria ", "EquipoLider": "Curaduría ", "EquipoLiderId": 1 },
            { "procesoId": 3, "NombreProceso": "Exposiciónes Itinerantes", "FechaInicio": "15/2/2022", "FechaFinEstimada": "27/9/2022", "FechaFinalizacionReal": "30/11/2022", "PresupuestoEstimado": "250.000.000", "AreaResponsableId": 1, "AreaResponsable": "Dirección Museo de la Memoria ", "EquipoLider": "Exposiciones", "EquipoLiderId": 2 },
            { "procesoId": 4, "NombreProceso": "Feria del Libro Bogotá ", "FechaInicio": "15/7/2022", "FechaFinEstimada": "30/7/2022", "FechaFinalizacionReal": "20/7/2022", "PresupuestoEstimado": "52.000.000", "AreaResponsableId": 2, "AreaResponsable": "Dirección de Acuerdos de la Verdad ", "EquipoLider": "Comunicaciones ", "EquipoLiderId": 3 }
        ];
        this.procesos = data;
    };
    ActividadesComponent.prototype.getProcess = function () {
    };
    ActividadesComponent.prototype.getActividades = function (id) {
        var _this = this;
        console.log(id, "ID___AC");
        this._actividadService.getAllActividades(this.AnoId)
            .subscribe(function (resp) {
            _this.actividades = resp.Lista;
            var procesos = _this.procesos || [];
            var shuffled = procesos.sort(function () { return Math.random() - 0.5; });
            _this.actividades.map(function (actividad) { return actividad.procesoId = shuffled[1].procesoId; });
            _this.actividades = _this.actividades.filter(function (d) { return d.procesoId === id; });
            console.log("ACT", _this.actividades);
        }, function (error) {
            console.log(error);
        });
        this.asistenciaActividades = [];
    };
    ActividadesComponent.prototype.getAllCompromisos = function () {
        // SE CMENTA TEMPORALMENTE
        /*
        this._actividadService.getAllActividades(this.AnoId)
          .subscribe((resp: any) => {
              this.actividades = resp.Lista;
              this.actividades.map(actividad=>actividad.procesoId=this.getRandomId().procesoId)
             
              },
              error => {
                  console.log(<any>error);
              }
          );
      
          this.asistenciaActividades = [];
        */
        this.actividades = [];
    };
    ActividadesComponent.prototype.CargarCompromisosAvances = function (id) {
        var _this = this;
        this._actividadService.getAllAsistenciaActividades(id).subscribe(function (resp) {
            _this.asistenciaActividades = resp.Lista;
        });
    };
    ActividadesComponent.prototype.cargarAportantes = function (id) {
        var data = [
            { "AportanteProcesoId": 1, "AportanteId": 1, "procesoId": 1, "PresupuestoAportante": "30.000.000", "NombreAportante": "PNUD" },
            { "AportanteProcesoId": 2, "AportanteId": 2, "procesoId": 1, "PresupuestoAportante": "50.000.000", "NombreAportante": "OIM" },
            { "AportanteProcesoId": 3, "AportanteId": 3, "procesoId": 1, "PresupuestoAportante": "20.000.000", "NombreAportante": "UARIV" },
            { "AportanteProcesoId": 4, "AportanteId": 4, "procesoId": 1, "PresupuestoAportante": "50.000.000", "NombreAportante": "CNMH" },
            { "AportanteProcesoId": 5, "AportanteId": 5, "procesoId": 3, "PresupuestoAportante": "53.500.000", "NombreAportante": "ACNUR" },
            { "AportanteProcesoId": 6, "AportanteId": 6, "procesoId": 3, "PresupuestoAportante": "30.000.000", "NombreAportante": "USAID" },
            { "AportanteProcesoId": 7, "AportanteId": 4, "procesoId": 3, "PresupuestoAportante": "32.000.000", "NombreAportante": "CNMH" },
            { "AportanteProcesoId": 8, "AportanteId": 4, "procesoId": 2, "PresupuestoAportante": "125.000.000", "NombreAportante": "CNMH" },
            { "AportanteProcesoId": 9, "AportanteId": 6, "procesoId": 4, "PresupuestoAportante": "10.000.000", "NombreAportante": "USAID" },
            { "AportanteProcesoId": 10, "AportanteId": 4, "procesoId": 4, "PresupuestoAportante": "20.000.000", "NombreAportante": "CNMH" },
            { "AportanteProcesoId": 11, "AportanteId": 7, "procesoId": 4, "PresupuestoAportante": "22.000.000", "NombreAportante": "DPS" }
        ];
        data = data.filter(function (d) { return d.procesoId === id; });
        this.aportantesProceso = data;
        console.log("Aportantes", this.aportantesProceso);
    };
    ActividadesComponent.prototype.CargarProcesoAvances = function (id) {
        // this._actividadService.getAllProcesosServices(id).((resp: any) => {
        //this._actividadService.getAllProcesosServices(id).subscribe((resp: any) => {
        //  this.procesosActividades = resp.Lista;
        // });
        var data = [
            { "procesosActividadId": 1, "ActividadId": 32, "fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "D. Acuerdos de la Verda", "TipoProcesoASociado": "Proyecto de apropiación social", "ArticuladoCon": "Museos" },
            { "procesosActividadId": 2, "ActividadId": 32, "fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "D Construcción ", "TipoProcesoASociado": "Asistente evento", "ArticuladoCon": "Construccion de Memoria" },
            { "procesosActividadId": 3, "ActividadId": 2105, "fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "D. Archivo y DDHH ", "TipoProcesoASociado": "tallerista / facilitador", "ArticuladoCon": "Museos" },
            { "procesosActividadId": 4, "ActividadId": 2105, "fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "D. Museo de Memoria ", "TipoProcesoASociado": "Asistente evento", "ArticuladoCon": "Construccion de Memoria" },
            { "procesosActividadId": 5, "ActividadId": 2105, "fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "Pedagogía", "TipoProcesoASociado": "Proyecto de apropiación social", "ArticuladoCon": "Construccion de Memoria" },
            { "procesosActividadId": 6, "ActividadId": 1066, "fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "D. Museo de Memoria ", "TipoProcesoASociado": "Asistente evento", "ArticuladoCon": "Construccion de Memoria" },
            { "procesosActividadId": 7, "ActividadId": 1066, "fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "Pedagogía", "TipoProcesoASociado": "Proyecto de apropiación social", "ArticuladoCon": "Construccion de Memoria" },
            { "procesosActividadId": 8, "ActividadId": 1066, "fechaInicio": "2022/01/31", "fechaFin": "2022/12/31", "EquipoLider": "D Construcción ", "TipoProcesoASociado": "Asistente evento", "ArticuladoCon": "Construccion de Memoria" }
        ];
        data = data.filter(function (d) { return d.ActividadId === id; });
        this.procesosActividades = data;
    };
    ActividadesComponent.prototype.borrarProcesoActividad = function (id) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Borrar Producto?',
            text: 'Ese proceso no se podra revertir!',
            // type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar Esto!'
        }).then(function (result) {
            if (result.value) {
                var resultado = true;
                if (resultado) {
                    _this.procesosActividades = _this.procesosActividades.filter(function (d) { return d.procesosActividadId !== id; });
                    sweetalert2_1["default"].fire('Borrado!', 'Este registro fue borrado.', 'success');
                }
                else {
                    _this.procesosActividades = _this.procesosActividades;
                    sweetalert2_1["default"].fire('ERROR!', 'Hubo un error en el servicio, intenta de nuevo', 'error');
                }
            }
            else {
                sweetalert2_1["default"].fire('Atención!', 'No se eliminó el proceso', 'info');
            }
        });
    };
    ActividadesComponent.prototype.onSubmitCompromiso = function (isValid) {
        var _this = this;
        if (isValid) {
            this.actividad.UsuarioRegistraId = this.usuId;
            // if (this.accionCompromiso === 'U') {
            //   this.compromiso.FechaActualizada = Date..now().toString();
            // } else {
            //   this.compromiso.FechaRegistro = Date.now().toString();
            // }
            this._actividadService
                .addActividad(this.actividad)
                .subscribe(function (resp) {
                _this.popupCompromisos = false;
                _this.getAllCompromisos();
                _this.asistenciaActividades = [];
                _this.procesosActividades = [];
                _this.procesos = [];
                _this.aportantesProceso = [];
            });
        }
    };
    ActividadesComponent.prototype.getDirecciones = function () {
        var _this = this;
        this._tipoReferenciaService.getValorReferenciaPorTipoValorId(44).subscribe(function (result) {
            _this.direccionesLista = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.getAreas = function () {
        var _this = this;
        this._tipoReferenciaService.getValorReferenciaPorTipoValorIdPadre(this.actividad.AreaId).subscribe(function (result) {
            _this.areasLista = result.Lista;
            //this.cargarOferta();
            //this.programasLista = [];
            //this.OfertaProgramaId = '0';
            _this.AreaId = '0';
            // this.cargarPrograma();
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.showAccionCompromiso = function (id, accion) {
        var _this = this;
        if (accion === 'C') {
            this.inicializarCompromiso();
        }
        else if (accion === 'U') {
            this._actividadService
                .getActividadByActividadId(id)
                .subscribe(function (resp) {
                _this.actividad = resp;
                _this.mostrarMunicipios();
                _this.getAreas();
            });
        }
        this.accionCompromiso = accion;
        this.popupCompromisos = true;
    };
    ActividadesComponent.prototype.borrarCompromiso = function (ActividadId) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Borrar Compromiso?',
            text: 'Ese proceso no se podra revertir!',
            // type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar Esto!'
        }).then(function (result) {
            if (result.value) {
                _this._actividadService.deleteActividad(ActividadId).subscribe(function (result) {
                    // if (result.OperacionExitosa) {
                    //     this.getRedSocialByAgente();
                    //     this.servicePNotify.warn('Eliminar', 'Datos eliminados correctamente!');
                    // } else {
                    //     this.servicePNotify.html(
                    //         '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
                    //         'error'
                    //     );
                    // }
                    // se puede utilizar esta variable para controler los mensajes del back
                    //console.log(result.OperacionExitosa);
                    if (result.OperacionExitosa) {
                        sweetalert2_1["default"].fire('Borrado!', 'Este registro fue borrado.', 'success');
                    }
                    else {
                        sweetalert2_1["default"].fire('ERROR!', 'Existen avances registrados, por favor borrar primero los avances', 'error');
                    }
                    _this.getAllCompromisos();
                }, function (error) {
                    // this.error = error;
                    // if (error.statusText === 'Unauthorized') {
                    //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    //     this.authenticationService.logout().subscribe(response => { });
                    //     this.storageService.logout();
                    // }
                    // swal('Agente Creado', resp.Mensaje, 'success' );
                    console.log(error);
                });
            }
        });
    };
    ActividadesComponent.prototype.inicializarCompromiso = function () {
        this.actividad = {
            ActividadId: null,
            AnoId: null,
            DependenciaResponsable: null,
            ImportanciaId: null,
            AreaId: null,
            JefeDependencia: null,
            Temas: '',
            Descripcion: '',
            MunicipioId: null,
            TipoReporteId: null,
            Estado: '',
            FechaActividad: '',
            FechaLimite: '',
            Observaciones: '',
            UsuarioResponsableReporteId: null,
            UsuarioRegistraId: null,
            FechaRegistro: '',
            FechaActualizada: '',
            DepartamentoId: null,
            tipoActividadId: null,
            NumeroAsistentes: null,
            procesoId: null
        };
    };
    ActividadesComponent.prototype.limpiarCamposLugarResidencia = function () {
        this.asistenciaActividad.CiudadResidencia = '';
        this.asistenciaActividad.DepartamentoId = null;
        this.asistenciaActividad.MunicipioId = null;
    };
    ActividadesComponent.prototype.mostrarMunicipios = function () {
        var _this = this;
        this._tipoReferenciaService
            .getMunicipiosByDepartamento(this.actividad.DepartamentoId)
            .subscribe(function (result) {
            _this.munLista = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.mostrarMunicipiosRecidencia = function () {
        var _this = this;
        this._tipoReferenciaService
            .getMunicipiosByDepartamento(this.asistenciaActividad.DepartamentoId)
            .subscribe(function (result) {
            _this.munListaRecidencia = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarImportancia = function () {
        var _this = this;
        this._tipoReferenciaService
            .getValorReferenciaPorTipoValorNombre('MA_COMPROMISO_IMPORTANCIA')
            .subscribe(function (result) {
            _this.listaImportancia = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarJefesDependencia = function () {
        var _this = this;
        this._tipoReferenciaService
            .getValorReferenciaPorTipoValorNombre('MA_JEFE_DEPENDENCIA')
            .subscribe(function (result) {
            _this.listaJefesDependencia = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarTipoReporte = function () {
        var _this = this;
        this._tipoReferenciaService
            .getValorReferenciaPorTipoValorNombre('MA_COMPROMISO_TIPO_REPORTE')
            .subscribe(function (result) {
            _this.listaTipoReporte = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarTiposIdentificacion = function () {
        var _this = this;
        this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_TIPO_DOC_IDENTIFICACION')
            .subscribe(function (result) {
            _this.tipoDoc = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarPerilCargo = function () {
        var _this = this;
        this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_CARGO')
            .subscribe(function (result) {
            _this.tipoCargo = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarClasificacion = function () {
        var _this = this;
        this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_CLASIFICACION')
            .subscribe(function (result) {
            _this.tipoClasificacion = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarTiposOcupacion = function () {
        var _this = this;
        this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_OCUPACION')
            .subscribe(function (result) {
            _this.tipoOcupacion = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarTiposNivelEscolaridad = function () {
        var _this = this;
        this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_NIVEL_ESCOLARIDAD')
            .subscribe(function (result) {
            _this.tipoNivelEscolaridad = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarActorGeneraHecho = function () {
        var _this = this;
        this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_ACTOR_GENERA_HECHO')
            .subscribe(function (result) {
            _this.tipoActorGeneraHecho = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarHechoVictimizante = function () {
        var _this = this;
        this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_HECHO_VICTIMIZANTE')
            .subscribe(function (result) {
            _this.tipoHechoVictimizante = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarLenguaMaterna = function () {
        var _this = this;
        this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_LENGUA_MATERNA')
            .subscribe(function (result) {
            _this.tipoLenguaMaterna = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarOrientacionSexual = function () {
        var _this = this;
        this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_ORIENTACION_SEXUAL')
            .subscribe(function (result) {
            _this.tipoOrientacionSexual = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarGrupoEtareo = function () {
        var _this = this;
        this._tipoReferenciaService.getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_GRUPO_ETAREO')
            .subscribe(function (result) {
            _this.tipoGrupoEtareo = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarIdentidadGenero = function () {
        var _this = this;
        this._tipoReferenciaService
            .getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_IDENTIDAD_GENERO')
            .subscribe(function (result) {
            _this.listaIdentidadGenero = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarIdentidadEtnica = function () {
        var _this = this;
        this._tipoReferenciaService
            .getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_IDENTIDAD_ETNICA')
            .subscribe(function (result) {
            _this.listaIdentidadEtnica = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarDiscapacidad = function () {
        var _this = this;
        this._tipoReferenciaService
            .getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_DISCAPACIDAD')
            .subscribe(function (result) {
            _this.tipoDiscapacidad = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarEstado = function () {
        var _this = this;
        this._tipoReferenciaService
            .getValorReferenciaPorTipoValorNombre('MA_COMPROMISO_ESTADO')
            .subscribe(function (result) {
            _this.listaEstado = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarTiposCompromisos = function () {
        var _this = this;
        this._tipoReferenciaService
            .getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_ACCION')
            .subscribe(function (result) {
            _this.listaCompromisoTipo = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarTiposActor = function () {
        var _this = this;
        this._tipoReferenciaService
            .getValorReferenciaPorTipoValorNombre('MA_MUSEO_TIPO_ACTOR')
            .subscribe(function (result) {
            _this.listaTiposActor = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.cargarUsuarios = function () {
        var _this = this;
        this._tipoReferenciaService
            .getValorReferenciaPorTipoValorNombre('MA_COMPROMISO_ESTADO')
            .subscribe(function (result) {
            _this.listaEstado = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.getUsuariosInternos = function () {
        var _this = this;
        this._actividadService.getUsuariosInternos()
            .subscribe(function (resp) {
            _this.listaUsuarios = resp.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('TYC', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
        this.asistenciaActividades = [];
    };
    ActividadesComponent.prototype.showVolver = function () {
        this.popupCompromisos = false;
    };
    ActividadesComponent.prototype.cargarListaVias = function () {
        var _this = this;
        this._tipoReferenciaService
            .getValorReferenciaPorTipoValorNombre('MA_MUSEO_VIAS')
            .subscribe(function (result) {
            _this.ListaVias = result.Lista;
        }, function (error) {
            // this.error = error;
            // if (error.statusText === 'Unauthorized') {
            //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            //     this.authenticationService.logout().subscribe(response => { });
            //     this.storageService.logout();
            // }
            console.log(error);
        });
    };
    ActividadesComponent.prototype.armarDireccion = function (e) {
        //console.log(e);
        var via = $('.direcc0').val();
        var num1 = $('.direcc1').val();
        var Letra0 = $('.direcc5').val();
        var Letra1 = $('.direcc6').val();
        var Letra7 = $('.direcc7').val();
        var Letra8 = $('.direcc8').val();
        var num2 = $('.direcc2').val();
        var num3 = $('.direcc3').val();
        var num4 = $('.direcc4').val();
        //let otro = $('.direcc4').val();
        if (num1 != "") {
            num1 = " " + num1;
        }
        if (Letra0 != "") {
            Letra0 = " " + Letra0;
        }
        if (Letra7 != "") {
            Letra7 = " " + Letra7;
        }
        if (Letra8 != "") {
            Letra8 = " " + Letra8;
        }
        if (num4 != "") {
            num4 = " - " + num4;
        }
        if (num2 != "") {
            num2 = " " + num2;
        }
        if (num3 != "") {
            num3 = " # " + num3;
        }
        /*if(otro != ""){
          otro = ", "+otro;
        }*/
        //$('.direcc').val(via+num1+num2+num3+otro);
        //this.asistenciaActividad.DireccionFisica = (via+num1+num2+num3/+otro/);
        this.asistenciaActividad.DireccionFisica = (via + num1 + Letra0 + num2 + Letra7 + num3 + Letra1 + num4 + Letra8);
    };
    ActividadesComponent.prototype.armarComplemento = function () {
        //console.log(e);
        var num1 = $('.direcc9').val();
        var num2 = $('.direcc10').val();
        //let otro = $('.direcc4').val();
        if (num1 != "") {
            num1 = " " + num1;
        }
        if (num2 != "") {
            num2 = " " + num2;
        }
        /*if(otro != ""){
          otro = ", "+otro;
        }*/
        //$('.direcc').val(via+num1+num2+num3+otro);
        //this.asistenciaActividad.DireccionFisica = (via+num1+num2+num3/+otro/);
        this.asistenciaActividad.DireccionFisica = this.asistenciaActividad.DireccionFisica + (num1 + num2);
    };
    ActividadesComponent = __decorate([
        core_1.Component({
            selector: 'app-actividades',
            templateUrl: './actividades.component.html',
            styleUrls: ['./actividades.component.css']
        })
    ], ActividadesComponent);
    return ActividadesComponent;
}());
exports.ActividadesComponent = ActividadesComponent;

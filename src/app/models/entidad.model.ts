export class Entidad {
    constructor(
        public EntidadId: number,
        public TipoEntidadId: number,
        public EntidadNombre: string,
        public EntidadFechaCreacion: string,
        public EntidadNaturalezaId: number,
        public EntidadPrimerNombreResponsable: string,
        public EntidadSegundoNombreResponsable: string,
        public EntidadPrimerApellidoResponsable: string,
        public EntidadSegundoApellidoResponsable: string,
        public EntidadTelefonoResponsable: string,
        public EntidadCelularResponsable: string,
        public EntidadEmailResponsable: string,
        public EntidadResena: string,
        public EntidadDireccion: string,
        public EntidadTelefonoFijo: string,
        public EntidadTelefonoMovil: string,
        public EntidadPaginaWeb: string,
        public EntidadEmail: string,
        public EntidadDescripcion: string,
        public EntidadClasificacion: string,
        public EntidadClasificacionOtro: string,
        public EntidadNumIdentificacion: string,
        public EntidadFecInicioActividad: string,
        public EntidadNombreContacto: string,
        public EntidadApellidoContacto: string,
        public EntidadTelContacto: string,
        public EntidadMovilContacto: string,
        public EntidadEmailContacto: string,
        public EntidadFechaRegistro: string,
        public CuentaUsuario: string,
        public EntidadFechaEdito: string,
        public CuentaUsuarioEdito: string,
        public EntidadObservaciones: string,
        public EntidadFechaAprobacion: string,
        public AreaId: number,
        public DepartamentoId: number,
        public MunicipioId: number,
        public Fotografia: string,
        public EntidadEstadoId: number,
        public TipoIdentificacionId: number,
        public PefilFacebook: string,
        public PerfilTwitter: string,
        public PerfilFlickr: string,
        public CanalYoutube: string,
        public PerfilInstagram: string,
        public PaisIdUbicacion: number,
        public EntidadCiudadUbicacion: string,
        public TipoCampoAccion: Array<any>,
        public OtrasAreasCampoAccion: OtrasAreasCamposAccion[],
        public EstadoNombre: string,
        public EntidadCantidadPersonas: number,
        public EntidadInfraestructuraCultural: string,
    ) { }

}

export class OtrasAreasCamposAccion {
    EntidadOcupacionId: number;
    EntidadId: number;
    TipoCampodeAccionId: number;
    OtrasAreasId: number;
}

export class OtrosCamposdeAccion {
    TipoCampodeAccionId: number;
    nombre: string;
    OtrasAreasId: number;
}

export class EntidadExperiencia {
    constructor(
        public EntidadExperienciaId: number,
        public EntidadId: number,
        public TipoExperienciaId: number,
        public EntidadExperienciaActividadDesarrollada: string,
        public EntidadExperienciaFechaInicio: string,
        public EntidadExperienciaFechaFin: string,
        public EntidadExperienciaEntidad: string,
        public Fotografia: string,
        public ArchivoId: number,
        public EstadoRevisionId: number,
        public EntidadExperienciaFechaEdito: string,
        public CuentaUsuarioIdEdito: number,
        public CuentaUsuarioIdCreacion: number,
        public CuentaUsuarioIdGestiona: number,
        public EntidadExperienciaObservaciones: string,
        public NombreTipoExperiencia: string,
    ) { }
}

export class Salas {
    constructor(
        public SalaId: number,
        public EntidadId: number,
        public SalaNombre: string,
        public SalaMision: string,
        public SalaResenaHistorica: string,
        public SalaTrayectoria: string,
        public SalaDireccion: string,
        public MunicipioId: number,
        public SalaTelefonoMovil: string,
        public SalaTelefonoFijo: string,
        public SalaEmail: string,
        public ModalidadSalaId: number,
        public TeneciaInmubleId: number,
        public SalaFechaInicioProgramacion: string,
        public SalaFechaRegistro: string,
        public SalaFechaAprobacion: string,
        public SalaFechaEdito: string,
        public CuentaUsuarioIdEdito: number,
        public CuentaUsuarioIdCreacion: number,
        public SalaEstadoId: number,
        public DepartamentoId: number,
        public SalaProgramacionPermanente: string,
        public SalaConcertadaNacionalTerritoria: string,
        public SalaBeneficiariaLEP: string,
    ) {}
}

export class Proyectos {
    constructor(
        public ProyectoId: number,
        public SalaId: number,
        public ProyectoPrimerNombreEncargado: string,
        public ProyectoOtrosNombresEncargado: string,
        public ProyectoPrimerApellidoEncargado: string,
        public ProyectoSegundoApellidoEncargado: string,
        public ProyectoTelefonoFijo: string,
        public ProyectoTelefonoMovil: string,
        public ProyectoEntidadBancaria: string,
        public MunicipioIdEntidadBancaria: number,
        public ProyectoNumeroCuentaBancaria: string,
        public TipoCuentaBancariaId: number,
        public ProyectoNecesidadSala: string,
        public ProyectoObjetivoGeneral: string,
        public ProyectoObjetivosEspecificos: string,
        public ProyectoJustificacion: string,
        public ProyectoDescripcion: string,
        public ProyectoPropuestaSostenibilidad: string,
        public ProyectoCantidadPoblacionBeneficiada: number,
        public ProyectoDescripcionPoblacionBeneficiada: string,
        public ProyectoResultadosEsperados: string,
        public ProyectoFechaRegistro: string,
        public ProyectoFechaEdito: string,
        public ProyectoUsuarioIdEdito: number,
        public ProyectoUsuarioIdCreacion: number,
        public ProyectoEstadoId: number,
        public AnoId: number,
        public RegimenTributarioId: number,
        public EntidadResponsableICA: number,
        public EntidadTarifaICA: string,
        public DepartamentoIdEntidadBancaria: number,
        public ProyectoObservaciones: string,
        public ProyectoEstadoNombre: string,
    ) {}
}

export class Funciones {
    constructor(
        public FuncionId: number,
        public SalaId: number,
        public FuncionRealizada: string,
        public FuncionFecha: string,
        public FuncionAbierta: string,
        public FuncionNombre: string,
        public FuncionCodigoPULEP: string,
        public FuncionNombreGrupo: string,
        public FuncionGrupoPlanta: string,
        public FuncionCantidad: number,
        public DisciplinaArtisticaId: number,
        public PaisIdProcedenciaGrupo: number,
        public MunicipioIdProcedenciaGrupo: number,
        public DepartamentoIdProcedenciaGrupo: number,
        public FuncionCiudadProcedenciaGrupoOtroPais: string,
        public FuncionFechaRegistro: string,
        public FuncionFechaEdito: string,
        public FuncionUsuarioIdEdito: number,
        public FuncionUsuarioIdCreacion: number,
        public ProyectoId: number,
        public TipoFuncionId: number

    ) {}
}

export class Cronogramas {
    constructor(
        public CronogramaId: number,
        public ProyectoId: number,
        public CronogramaActividad: string,
        public CronogramaFechaInicio: string,
        public CronogramaFechaFin: string,
        public CronogramaFechaRegistro: string,
        public CronogramaFechaEdito: string,
        public CronogramaUsuarioIdEdito: number,
        public CronogramaUsuarioIdCreacion: number,
    ) {}
}

export class Presupuestos {
    constructor(
        public PresupuestoId: number,
        public ProyectoId: number,
        public PresupuestoComponente: string,
        public PresupuestoTipoGasto: string,
        public PresupuestoValor: string,
    ) {}
}

export class Documentos {
    constructor(
        public DocumentoProyectoId: number,
        public ProyectoId: number,
        public ArchivoId: number,
        public DocumentoProyectoNombre: string,
        public DocumentoProyectoFechaRegistro: string,
        public DocumentoProyectoUsuarioIdCreacion: number,
        public DocumentoProyectoEstadoId: number,
        public DocumentoProyectoObservacionesRevision: string,
        public ProyectoTipoDocumentoId: number,
        public DocumentoCaracterEntidadId: number,
    ) {}
}

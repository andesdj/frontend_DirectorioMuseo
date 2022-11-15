export class Actividades {
    constructor(
        public ActividadId: number,
        public AnoId: number,
        public DependenciaResponsable: number,
        public ImportanciaId: number,
        public AreaId: number,
        public JefeDependencia: number,
        public Temas: string,
        public Descripcion: string,
        public MunicipioId: number,
        public TipoReporteId: number,
        public Estado: string,
        public FechaActividad: string,
        public FechaLimite: string,
        public Observaciones: string,
        public UsuarioResponsableReporteId: number,
        public UsuarioRegistraId: number,
        public FechaRegistro: string,
        public FechaActualizada: string,
        public DepartamentoId: number,
        public tipoActividadId: number,
        public NumeroAsistentes: number
    ) { }
}


export class procesosActividad {
    constructor(
        public procesosActividadId: number,
        public ActividadId: number,
        public  fechaInicio: string,
        public  fechaFin: string,
        public  EquipoLider: string,
        public  ArticuladoCon: string,
        public  TipoProcesoASociado: string){ }
}

export class AsistenciaActividad {
    constructor(
        public AsistenciaActividadId: number,
        public ActividadId: number,
        public  AvanceCualitativo: string,
        public  AvanceCuantitativo: number,
        public  EstadoId: number,
        public  UsuarioRegistra: number,
        public  FechaRegistra: string,
        public  FechaActualiza: string,

        public  ArchivoId: number,
        public  TipoActorId: number,
        public  CargoRolPerfil: string,
        public  TipoDocumentoId: number,
        public  NumeroIdentificacion: string,
        public  NombreCompleto: string,
        public  OcupacionId: number,
        public  NivelEscolaridadId: number,
        public  VictimaConflicto: number,
        public  Edad: number,
        public  LenguaMaternaId: number,
        public  NumeroDocumentoAcompanante: string,
        public  NombreAcompanante: string,
        public  IdPadre: number,
        public  GrupoEtareoId: number,
        public  IdentidadGeneroId: number,
        public  IdentidadEtnicoId: number,
        public  Discapacidad: number,
        public  CorreoElectronico: string,
        public  RecibioPublicacion: number,
        public  NombrePublicacion: string,
        public  EnlaceLiderazgoCoordinacion: string,
        public  QueHaceElActor: string,
        public  PaisId: number,
        public  MunicipioId: number,
        public  NombreCompletoRepresentalteLEgal: string,
        public  TipoDocumentoRepresentalteLegalId: number,
        public  NumeroIdentificacionRepresentanteLegal: string,
        public  CorreoElectronicoRepresentanteLegal: string,
        public  AnoEntidadId: number,
        public  DireccionEntidad: string,
        public  CorreoElectronicoEntidad: string,
        public  TelefonoEntidad: string,
        public  MunicipioEntidadId: number,
        public  PaginaWebEntidad: string,
        public  CentroPobladoId: number,
        public  CabeceraMunicipal: number,
        public  AreaRural: number,
        public  Comuna: string,
        public  Corregimiento: string,
        public  Vereda: string,
        public  TerritorioColectivo: string,
        public  Resguardo: string,
        public  ActorGeneroHechoId: number,
        public  TipoHechoVictimizanteId: number,
        public  TipoDiscapacidadId: number,
        public  CiudadResidencia: string,
        public  DepartamentoId: number,
        public  DireccionFisica: string,
        public  HoraActividad: string,
        public  HoraLimite: string,
        public  SegundaLenguaId: number,
        public  FechaNacimiento: string,
        public  SegundoCorreoElectronico: string,
        public  NumeroTelefonico: string,
        public  SegundoNumeroTelefonico: string,
        public  NumeroIdentificacionConfirmar: string,
        public  OrientacionSexualId: number,
        public  TipoDireccionId: number,
        public  ClasificacionId: number,
        public  AnoConstitucionId: number,
        public  TipoDocumentoAcompananteId: number,
        public TipoOrganizacionPerteneceId: number,
        public PerteneceOrganizacionVictimas: number,
        public NombreOrganizacionPertenece: string,
        public VeredaLocalidadCorregimientoResguardoBarrio: string,
        public Objetos: Objetos[],
        public OtroTipoOrganizacion: string,
        public  TieneNumeroIdentificacion: boolean,
        public  CargoRolPerfilId: number,

        
    ) { }
}

export class AsistentesObjetos {
    constructor(
        public AsistenciaActividadId: number,
        public ActividadId: number,
        public  AvanceCualitativo: string,
        public  AvanceCuantitativo: number,
        public  EstadoId: number,
        public  UsuarioRegistra: number,
        public  FechaRegistra: string,
        public  FechaActualiza: string,

        public  ArchivoId: number,
        public  TipoActorId: number,
        public  CargoRolPerfil: string,
        public  TipoDocumentoId: number,
        public  NumeroIdentificacion: string,
        public  NombreCompleto: string,
        public  OcupacionId: number,
        public  NivelEscolaridadId: number,
        public  VictimaConflicto: number,
        public  Edad: number,
        public  LenguaMaternaId: number,
        public  NumeroDocumentoAcompanante: string,
        public  NombreAcompanante: string,
        public  IdPadre: number,
        public  GrupoEtareoId: number,
        public  IdentidadGeneroId: number,
        public  IdentidadEtnicoId: number,
        public  Discapacidad: number,
        public  CorreoElectronico: string,
        public  RecibioPublicacion: number,
        public  NombrePublicacion: string,
        public  EnlaceLiderazgoCoordinacion: string,
        public  QueHaceElActor: string,
        public  PaisId: number,
        public  MunicipioId: number,
        public  NombreCompletoRepresentalteLEgal: string,
        public  TipoDocumentoRepresentalteLegalId: number,
        public  NumeroIdentificacionRepresentanteLegal: string,
        public  CorreoElectronicoRepresentanteLegal: string,
        public  AnoEntidadId: number,
        public  DireccionEntidad: string,
        public  CorreoElectronicoEntidad: string,
        public  TelefonoEntidad: string,
        public  MunicipioEntidadId: number,
        public  PaginaWebEntidad: string,
        public  CentroPobladoId: number,
        public  CabeceraMunicipal: number,
        public  AreaRural: number,
        public  Comuna: string,
        public  Corregimiento: string,
        public  Vereda: string,
        public  TerritorioColectivo: string,
        public  Resguardo: string,
        public  ActorGeneroHechoId: number,
        public  TipoHechoVictimizanteId: number,
        public  TipoDiscapacidadId: number,
        public  CiudadResidencia: string,
        public  DepartamentoId: number,
        public  DireccionFisica: string,
        public  HoraActividad: string,
        public  HoraLimite: string,
        public  SegundaLenguaId: number,
        public  FechaNacimiento: string,
        public  SegundoCorreoElectronico: string,
        public  NumeroTelefonico: string,
        public  SegundoNumeroTelefonico: string,
        public  NumeroIdentificacionConfirmar: string,
        public  OrientacionSexualId: number,
        public  TipoDireccionId: number,
        public  ClasificacionId: number,
        public  AnoConstitucionId: number,
        public  TipoDocumentoAcompananteId: number,
        public TipoOrganizacionPerteneceId: number,
        public PerteneceOrganizacionVictimas: number,
        public NombreOrganizacionPertenece: string,
        public VeredaLocalidadCorregimientoResguardoBarrio: string,
        public Objetos: Objetos[],
        public OtroTipoOrganizacion: string,
        public  TieneNumeroIdentificacion: boolean,
        public  CargoRolPerfilId: number,

        public  NombreDeseaDonar: string,
        public  DescripcionDeseaDonar: string,
        public  JustificacionDonacion: string,
        public  FechaElaboracionPieza: string,
        public  MaterialUsadoElaboracionPieza: string,
        public  DescripcionTecnicaElaboracionPieza: string,
        
        public Alto: number,
        public Ancho: number,
        public Largo: number,
        public  NombreAutorElaboroObjeto: string,
        public OtrasObservaciones: string,
        public TecnicaElaboracionPieza: string,

        
    ) { }
}

export class Objetos {
    constructor( public ObjetoId: number,
    public AsistenciaActividadId: number,
    public NombreDeseaDonar: string,
    public DescripcionDeseaDonar: string, 
    public JustificacionDonacion: string,    
    public ConoceFechaElaboracionPieza: number,
    public FechaElaboracionPieza: string,
    public MaterialUsadoElaboracionPieza: string,
    public TecnicaElaboracionPiezaId: number,
    public OtroTecnicaElaboracionPieza: string,
    public DescripcionTecnicaElaboracionPieza: string,
    public Alto: number,
    public Ancho: number,
    public Largo: number,
    public NombreAutorElaboroObjeto: string,
    public TieneFotografiaObjeto: string,
    public Archivo1Nombre: string,
    public Archivo1Ruta: string,

    public Archivo2Nombre: string,
    public Archivo2Ruta: string,
    
    public Archivo3Nombre: string,
    public Archivo3Ruta: string,

    public Archivo4Nombre: string,
    public Archivo4Ruta: string,
    public OtrasObservaciones: string,
    public TecnicaElaboracionPieza: string,
    public EsManifestacionInmaterial: boolean,
    public EstadoId: number,
    public ObservacionesEstado: string,
    public HechosVictimizantes: Array<any>,
    public MaterialId: number,
    

    
    ){ }
} 
export class Agente {
    constructor(
        public AgenteId: number,
        public TipoIdentificacionId: number,
        public AgenteTipoId: number,
        public AgenteNumeroIdentificacion: string,
        public AgentePrimerNombre: string,
        public AgenteSegundoNombre: string,
        public AgentePrimerApellido: string,
        public AgenteSegundoApellido: string,
        public AgenteSexoId: number,
        public AgenteDireccion: string,
        public AgenteTelefonoFijo: string,
        public AgenteTelefonoMovil: string,
        public AgenteEmail: string,
        public AgenteFechaRegistro: string,
        public MunicipioResidenciaId: number,
        public AgenteFechaAprobacion: string,
        public AgenteObservaciones: string,
        public AgenteFechaEdito: string,
        public CuentaUsuarioIdEdito: number,
        public CuentaUsuarioIdCreacion: number,
        public CuentaUsuarioIdGestiona: number,
        public AgenteEstadoId: number,
        public AgenteFechaNacimiento: string,
        public MunicipioNacimientoId: number,
        public DepartamentoResidenciaId: number,
        public DepartamentoNacimientoId: number,
        public TipoOcupacion: Array<any>,
        public AgenteUrl: string,
        public AgenteAlias: string,
        public AreaId: number,
        public AgenteOrigenInformacionId: number,
        public Fotografia: string,
        public AgentePoseeAlgunaDiscapacidad: boolean,
        public DiscapacidadId: number,
        public PefilFacebook: string,
        public PerfilTwitter: string,
        public PaginaWeb: string,
        public CanalYoutube: string,
        public PerfilSoundCloud: string,
        public PerfilFlickr: string,
        public PerfilInstagram: string,
        public EstadoNombre: string,
        public AgenteEstrato: number,
        public AgentePuntajeSisben: number,
        public AgenteIngresosMensuales: number,
        public AgenteSeguridadSocialId: number,
        public PaisIdNacimiento: number,
        public PaisIdResidencia: number,
        public AgenteCiudadNacimiento: string,
        public AgenteCiudadresidencia: string,
        public OtrasAreasOcupacion: OtrasAreasOcupaciones[],
        public AgenteTrabajoEnCalleRecurrentemente: boolean,

    ) { }
}

export class AgenteExperiencia {
    constructor(
        public AgenteExperienciaId: number,
        public AgenteExperienciaCargo: string,
        public AgenteExperienciaFechaInicio: string,
        public AgenteExperienciaFechaFin: string,
        public AgenteExperienciaEntidad: string,
        public AgenteExperienciaFechaEdito: string,
        public CuentaUsuarioIdEdito: number,
        public CuentaUsuarioIdCreacion: number,
        public CuentaUsuarioIdGestiona: number,
        public AgenteId: number,
        public Fotografia: string,
        public TipoExperienciaId: number,
        public NombreTipoExperiencia: string,
        public EstadoRevisionId: number,
        public AgenteExperienciaObservaciones: string,
    ) { }
}

export class AgenteFormacion {
    constructor(
        public AgenteFormacionId: number,
        public AgenteFormacionEstudioRealizado: string,
        public AgenteFormacionFechaInicio: string,
        public AgenteFormacionFechaFin: string,
        public AgenteFormacionInstitucion: string,
        public AgenteFormacionFechaEdito: string,
        public CuentaUsuarioIdEdito: number,
        public CuentaUsuarioIdCreacion: number,
        public CuentaUsuarioIdGestiona: number,
        public AgenteId: number,
        public Fotografia: string,
        public NivelFormacionId: number,
        public EstadoRevisionId: number,
        public AgenteFormacionObservaciones: string,
    ) { }
}

export class OtrasAreasOcupaciones {
    AgenteOcupacionId: number;
    AgenteId: number;
    TipoOcupacionId: number;
    OtrasAreasId: number;
}

export class OtrasAreas {
    OtrasAreasId: number;
    nombre: string;
}

export class OtrasOcupaciones {
    TipoOcupacionId: number;
    nombre: string;
    OtrasAreasId: number;
}

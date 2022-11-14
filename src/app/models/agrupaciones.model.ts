export class Agrupaciones {
    constructor(
        public AgrupacionId: number,
        public AreaId: number,
        public AgrupacionNombre: string,
        public TipoAgrupacionId: number,
        public MunicipioId: number,
        public DepartamentoId: number,
        public CentroPobladoId: number,
        public AgrupacionEstadoId: number,
        public AgrupacionPaginaWeb: string,
        public AgrupacionTelefono: string,
        public AgrupacionDireccion: string,
        public AgrupacionResena: string,
        public CuentaUsuario: string,
        public AgrupacionFechaAprobacion: string,
        public AgrupacionObservaciones: string,
        public Latitud: string,
        public Longitud: string,
        public PaisIdUbicacion: number,
        public EntidadCiudadUbicacion: string,
        public AgrupacionUrl: string,
        public Fotografia: string,
    ) { }
}

export class AgenteAgrupaciones {
    constructor(
        public AgenteAgrupacionesId: number,
        public AgenteId: number,
        public AgrupacionId: number,
        public AgenteAgrupacionesCargo: string,
    ) { }
}

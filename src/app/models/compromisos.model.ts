export class Compromisos {
    constructor(
        public CompromisoId: number,
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
        public FechaCompromiso: string,
        public FechaLimite: string,
        public Observaciones: string,
        public UsuarioResponsableReporteId: number,
        public UsuarioRegistraId: number,
        public FechaRegistro: string,
        public FechaActualizada: string,
        public DepartamentoId: number,
        public tipoCompromisoId: number
    ) { }
}


export class CompromisosAvances {
    constructor(
        public ReporteAvanceId: number,
        public CompromisoId: number,
        public  AvanceCualitativo: string,
        public  AvanceCuantitativo: number,
        public  EstadoId: number,
        public  UsuarioRegistra: number,
        public  FechaRegistra: string,
        public  FechaActualiza: string
    ) { }
}
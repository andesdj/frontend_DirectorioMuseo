export class Indicador {
    constructor(
        public IndicadorId: number,
        public ReporteId: number,
        public ObjetivoId: number,
        public EstrategiaId: number,
        public AccionId: number,
        public AccionNombre: string,
        public IndicadorNombre: string,
        public IndicadorUnidadMedida: string,
        public PeriodicidadId: number,
        public PeriodicidadNombre: string,
        public TipoIndicadorId: number,
        public TipoIndicadorNombre: string,
        public AreaId: number,
        public AreaNombre: string,
        public IndicadorLineaBase: number,
        public CuentaUsuarioIdGestiona: number,
        public metaAvanceIndicador: MetaAvanceIndicador[],
        public metaCuatrenioIndicador: MetaCuatrenioIndicador[],
        public IndicadorFechaModificacion: string,
        public EstadoId: number,
        public IndicadorFormula: string,
        public IndicadorDescripcion: string,
    ) { }
}

export class MetaAvanceIndicador {
    constructor(
        public MetaAvanceId: number,
        public IndicadorId: number,
        public MetaAvanceMeta: number,
        public MetaAvanceFechaMeta: string,
        public MetaAvanceAvanceCuantitativo: number,
        public MetaAvanceAvanceCualitativo: string,
        public MetaAvanceFechaAvance: string,
        public MetaAvanceObservaciones: string,
        public CuentaUsuarioIdGestiona: Number,
        public MetaAvanceFechaModificacion: string,
    ) { }
}

export class MetaCuatrenioIndicador {
    constructor(
        public MetaCuatrienioId: number,
        public IndicadorId: number,
        public AnoId: number,
        public MetaCuatrienioMeta: number,
        public MetaCuatrienioDescripcion: string,
        public MetaCuatrienioObservacion: string,
        public CuentaUsuarioIdGestiona: Number,
        public MetaCuatrienioFechaModificacion: string,
    ) { }
}


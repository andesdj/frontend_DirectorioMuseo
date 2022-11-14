export class Escenario {
    constructor(
        public EscenarioId: number,
        public  MunicipioId: number,
        public  EscenarioNombre: string,
        public  EscenarioDireccion: string,
        public  EscenarioNombrePropietario: string,
        public  NaturalezaId: number,
        public  EscenarioCorreoElectronico: string,
        public  EscenarioRedesSociales: string,
        public  EscenarioTelefonoContacto: string,
        public  EscenarioResenaEscenario: string,
        public  TipoEscenarioId: number,
        public  EscenarioAforoTotal: number,
        public  EscenarioAreaLugar: number,
        public  EscenarioAreaTarima: number,
        public  EscenarioAccesoAlPublicoEntradas: number,
        public  EscenarioAccesoAlPublicoSalidas: number,
        public  EscenarioBanoAccesoPublico: number,
        public  EscenarioCamerinoYVestidoresConBano: number,
        public  EscenarioCamerinoYVestidoresSinBano: number,
        public  EscenarioParqueaderosPublicos: number,
        public  EscenarioEquipamientoYDotacionIluminacion: string,
        public  EscenarioDescripcionEquipamientoYDotacionIluminacion: string,
        public  EscenarioEquipamientoYDotacionAcusticaYSonido: string,
        public  EscenarioDescripcionEquipamientoYDotacionAcusticaYSonido: string,
        public  EscenarioEquipamientoYDotacionOtrosServicios: string,
        public  EscenarioDescripcionEquipamientoYDotacionOtrosServicios: string,
        public  EscenarioEscenarioHabilitado: string,
        public  EstadoId: number,
        public  EscenarioFechaRegistro: number,
        public  UsuarioId: number,
        public  Latitud: string,
        public  Longitud: string,
        public  DepartamentoId: number,
    ) { }
}

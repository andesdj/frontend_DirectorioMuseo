export class Usuario {
    constructor(
        public TipoIdentificacionId: number,
        public PersonaNumeroId: string,
        public PersonaPrimerNombre: string,
        public PersonaSegundoNombre: string,
        public PersonaPrimerApellido: string,
        public PersonaSegundoApellido: string,
        public PersonaEmail: string,
        public CuentaUsuarioClave: string,
        public CuentaUsuarioConfClave: string,
        public CuentaUsuarioRecibirBoletin: any,
        public CuentaUsuarioHabilitada: boolean,
        public PerfilId: number,
        public AreaId: number,
    ) { }
}

export class RecuperarClave{
    constructor(
        public username
    ) {}
}

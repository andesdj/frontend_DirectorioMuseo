export class TipoReferencia {
    constructor(
        public idTipoReferencia: number,
        public nombre: string,
        public descripcion: string,
        public nombreCampo: string,
        public longitudValor: number,
        public tipoDatos: string,
        public estado: string,
        public fechaCreacion: string,
        public usuarioCreacion: string,
        public fechaModificacion: string,
        public fechaIniVigencia: string,
        public fechaFinVigencia: string,
    ) { }
}

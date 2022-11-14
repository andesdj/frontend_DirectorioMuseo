export class ValorReferencia {
    constructor(
        public idValorReferencia: number,
        public idTipoReferencia: number,
        public nombre: string,
        public descripcion: string,
        public abreviatura: string,
        public codigoAsociado: string,
        public estado: string,
        public fechaCreacion: string,
        public usuarioCreacion: string,
        public fechaModificacion: string,
        public fechaIniVigencia: string,
        public fechaFinVigencia: string,
        public checked: boolean,
    ) { }
}


 
export class Formacion {
    Id: number;
    DepartamentoNombre: string;
    MunicipioNombre: string;
    NombreProceso: string;
    Inversion: number;
    NumeroBeneficiarios: number;
    ANO: string;
  }
  
  export class Dotacion {
    Id: number;
    DepartamentoNombre: string;
    MunicipioNombre: string;
    FORMATO: string;
    Inversion: number;
    ANO: string;
    Latitud: string;
    Longitud: string;
  }
  
  export class ProyectosEspeciales {
    Id: number;
    DepartamentoNombre: string;
    MunicipioNombre: string;
    Nombre: string;
    Inversion: number;
    ANO: string;
  }
  export class VisitasAsesorias {
    Id: number;
    DepartamentoNombre: string;
    MunicipioNombre: string;
    Ficha: string;
    Inversion: number;
    ANO: string;
    Area: string;
  }
  export class ProcesosFormacion {
    Id: number;
    DepartamentoNombre: string;
    MunicipioNombre: string;
    Ficha: string;
    Cantidad: number;
    ANO: string;
    Area: string;
  }
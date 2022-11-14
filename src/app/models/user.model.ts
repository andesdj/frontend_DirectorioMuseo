export class User {
    public USU_ID: number;
    public USU_NOMBRE: string;
    public USU_CORREO_ELECTRONICO: string;
    public USU_USUARIO: string;
    public Menu: Array<Menu>;
    public Perfiles: Array<Perfil>;
    public UsuarioRolID: string;
   public UsuarioID: number;
}

export class Perfil {
    public PER_ID: number;
    public PER_NOMBRE: string;
    public PerfilHabilitado: boolean;
    public GestionaActores: boolean;
    public GestionaEntidades: boolean;
    public GestionaAgrupaciones: boolean;

}

export class Menu {
        public  titulo: string;
        public  icono: string;
        public submenu: Array<SubMenu>;
    }

    export  class SubMenu {
        public  titulo: string;
        public  url: string;
    }

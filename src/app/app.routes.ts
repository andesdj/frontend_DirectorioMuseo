import { RouterModule, Routes } from "@angular/router";

//Componentes
import { LoginComponent } from "./login/login.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { RegisterComponent } from "./login/register.component";
import { HomeComponent } from "./home/home.component";
import { ValidarCuentaComponent } from "./login/validar-cuenta.component";
import { ObjetosComponent } from './objetos/objetos.component';

const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "validar-cuenta", component: ValidarCuentaComponent },
  { path: "objetos", component: ObjetosComponent },
  { path: "**", component: NopagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });

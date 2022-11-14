"use strict";
exports.__esModule = true;
exports.APP_ROUTES = void 0;
var router_1 = require("@angular/router");
//Componentes
var login_component_1 = require("./login/login.component");
var nopagefound_component_1 = require("./shared/nopagefound/nopagefound.component");
var register_component_1 = require("./login/register.component");
var home_component_1 = require("./home/home.component");
var validar_cuenta_component_1 = require("./login/validar-cuenta.component");
var objetos_component_1 = require("./objetos/objetos.component");
var appRoutes = [
    { path: "home", component: home_component_1.HomeComponent },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "register", component: register_component_1.RegisterComponent },
    { path: "validar-cuenta", component: validar_cuenta_component_1.ValidarCuentaComponent },
    { path: "objetos", component: objetos_component_1.ObjetosComponent },
    { path: "**", component: nopagefound_component_1.NopagefoundComponent },
];
exports.APP_ROUTES = router_1.RouterModule.forRoot(appRoutes, { useHash: true });

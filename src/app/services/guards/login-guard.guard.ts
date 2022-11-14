import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { SidebarService } from '../shared/sidebar.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public _router: Router, public _sidebarService: SidebarService) {

  }

  canActivate() {
    if (this._usuarioService.estalogueado()) {
      //this._sidebarService.cargarMenu();
      //console.log('Paso por el  Guard');
      return true;
    } else {
      //console.log('Bloqueado por el Guard');
      this._router.navigate(['/home']);
      return false;
    }
  }
}

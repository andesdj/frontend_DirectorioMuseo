import { Component, OnInit } from '@angular/core';
import { TipoReferenciaService } from 'src/app/services/service.index';
import { Agente } from 'src/app/models/agente.model';
import { Validators, FormControl } from '@angular/forms';
import { IOption } from 'ng-select';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';

export interface Listados {
  value: string;
  viewValue: string;
}

export class BottomSheetOverviewExampleSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

@Component({
  selector: 'app-entidades-simus',
  templateUrl: './entidades-simus.component.html',
  styleUrls: ['./entidades-simus.component.css']
})
export class EntidadesSimusComponent implements OnInit {
  agente: Agente;
  munLista: Array<IOption>;
  email = new FormControl('', [Validators.required, Validators.email]);
  depLista: Array<IOption>;
  checkedList = [];


  lstNaturaleza: Listados[] = [
    { value: '0', viewValue: 'Mixta' },
    { value: '1', viewValue: 'Privada' },
    { value: '2', viewValue: 'Pública' }
  ];

  lstTipoEntidad: Listados[] = [
    { value: '0', viewValue: 'CABILDO INDIGENA' },
    { value: '1', viewValue: 'CENTRO CULTURAL' },
    { value: '2', viewValue: 'SOCIEDAD DE MEJORAS PUBLICAS' },
    { value: '3', viewValue: 'CANAL NACIONAL DE TELEVISIÓN DE OPERACIÓN PRIVADA' },
    { value: '4', viewValue: 'CANAL REGIONAL' },
    { value: '5', viewValue: 'CANAL TEMATICO' },
    { value: '6', viewValue: 'CASA DE LA CULTURA' },
    { value: '7', viewValue: 'CONCESIONARIO DE ESPACIOS' },
    { value: '8', viewValue: 'CONCESIONARIO TELEVISIÓN POR CABLE' },
    { value: '9', viewValue: 'CONSEJO COMUNITARIO' },
    { value: '10', viewValue: 'COOPERATIVA' },
    { value: '11', viewValue: 'DISQUERA' },
    { value: '12', viewValue: 'DISTRIBUIDORA MUSICAL' },
    { value: '13', viewValue: 'EDITORA MUSICAL' },
    { value: '14', viewValue: 'ENTIDAD ASOCIADA' },
    { value: '15', viewValue: 'ESTACIÓN LOCAL' },
    { value: '16', viewValue: 'FONDO MIXTO DE CULTURA' },
    { value: '17', viewValue: 'GOBERNACIÓN' },
    { value: '18', viewValue: 'INSTITUCIÓN EDUCATIVA' },
    { value: '19', viewValue: 'INSTITUTO DEPARTAMENTAL DE CULTURA (DESCENTRALIZADO)' },
    { value: '20', viewValue: 'INSTITUTO MUNICIPAL DE CULTURA (DESCENTRALIZADO)' },
    { value: '21', viewValue: 'JUNTA DE ACCION COMUNAL' },
    { value: '22', viewValue: 'MINISTERIO DE CULTURA' },
    { value: '23', viewValue: 'MUNICIPIO / ALCALDÍA MUNICIPAL' },
    { value: '24', viewValue: 'ONG' },
    { value: '25', viewValue: 'OPERADOR PÚBLICO NACIONAL' },
    { value: '26', viewValue: 'OPERADOR SATELITAL' },
    { value: '27', viewValue: 'PRODUCTORA FONOGRÁFICA' },
    { value: '28', viewValue: 'PRODUCTORA MUSICAL' },
    { value: '29', viewValue: 'REPRESENTANTE O MANAGER' },
    { value: '30', viewValue: 'RESGUARDO INDIGENA' },
    { value: '31', viewValue: 'SINDICATO' },
    { value: '32', viewValue: 'SOCIEDAD DE GESTIÓN COLECTIVA' },
    { value: '33', viewValue: 'TELEVISIÓN COMUNITARIA CERRADA' },
    { value: '34', viewValue: 'TELEVISIÓN LOCAL' },
    { value: '35', viewValue: 'UNIVERSIDAD' }

  ];

  constructor(public _tipoReferenciaService: TipoReferenciaService, private _bottomSheet: MatBottomSheet) {
    // tslint:disable-next-line: max-line-length
    this.agente = new Agente(null, null, 146, '', '', '', '', '', null, '', '', '', '', '', null, null, '', '', null, null, null, 198, '', null, null, null, null, '', '', null, null, '', false, null, '', '', '', '', '', '', '', '', null, null, null, null, null, null, '', '', null, null);
    this.checkedList = [];
  }

  ngOnInit() {
    this.getDep();
  }

  getDep() {
    this._tipoReferenciaService.getDepartamentos().subscribe(
      result => {
        this.depLista = result.Lista;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  mostrarMunicipios() {
    this._tipoReferenciaService.getMunicipiosByDepartamento(this.agente.DepartamentoResidenciaId).subscribe(
      result => {
        this.munLista = result.Lista;
      },
      error => {
        // this.error = error;
        // if (error.statusText === 'Unauthorized') {
        //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
        //     this.authenticationService.logout().subscribe(response => { });
        //     this.storageService.logout();
        // }
        console.log(<any>error);
      }
    );
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Dirección de correo no válido' :
        '';
  }
  onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.checkedList.push(option.value);
    } else {
      for (let i = 0; i < this.lstTipoEntidad.length; i++) {
        if (this.checkedList[i] === option.value) {
          this.checkedList.splice(i, 1);
        }
      }
    }
    console.log(this.checkedList);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
}

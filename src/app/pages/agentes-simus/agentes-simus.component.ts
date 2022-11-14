import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { IOption } from 'ng-select';
import { TipoReferenciaService } from 'src/app/services/service.index';
import { Agente } from 'src/app/models/agente.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export interface Listados {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  institucion: string;
  titulo: string;
  periodoI: string;
  periodoF: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { institucion: 'EL Bosque', titulo: 'Hydrogen', periodoI: '1.0079', periodoF: 'H' },
  { institucion: 'EL Bosque', titulo: 'Helium', periodoI: '4.0026', periodoF: 'He' },
  { institucion: 'EL Bosque', titulo: 'Lithium', periodoI: '6.941', periodoF: 'Li' },
  { institucion: 'EL Bosque', titulo: 'Beryllium', periodoI: '9.0122', periodoF: 'Be' },
  { institucion: 'EL Bosque', titulo: 'Boron', periodoI: '10.811', periodoF: 'B' },
  { institucion: 'EL Bosque', titulo: 'Carbon', periodoI: '12.0107', periodoF: 'C' },
  { institucion: 'EL Bosque', titulo: 'Nitrogen', periodoI: '14.0067', periodoF: 'N' },
  { institucion: 'EL Bosque', titulo: 'Oxygen', periodoI: '15.9994', periodoF: 'O' },
  { institucion: 'EL Bosque', titulo: 'Fluorine', periodoI: '18.9984', periodoF: 'F' },
  { institucion: 'EL Bosque', titulo: 'Neon', periodoI: '20.1797', periodoF: 'Ne' },
];

@Component({
  selector: 'app-agentes-simus',
  templateUrl: './agentes-simus.component.html',
  styleUrls: ['./agentes-simus.component.css']
})
export class AgentesSimusComponent implements OnInit {

  depLista: Array<IOption>;
  agente: Agente;
  munLista: Array<IOption>;
  areaLista: Array<IOption>;
  email = new FormControl('', [Validators.required, Validators.email]);
  closeResult: string;
  selectedValue: string;
  displayedColumns: string[] = ['institucion', 'titulo', 'periodoI', 'periodoF'];
  dataSource = ELEMENT_DATA;


  // Grey Jimenes - Listados para llenar preguntar como se van a manejar los listados
  lstTipoDoc: Listados[] = [
    { value: '0', viewValue: 'Cedula de Ciudadanía' },
    { value: '1', viewValue: 'Cedula de Extranjería' },
    { value: '2', viewValue: 'Pasaporte' }
  ];

  lstSexo: Listados[] = [
    { value: '0', viewValue: 'Femenino' },
    { value: '1', viewValue: 'Masculino' },
    { value: '2', viewValue: 'LGBTI' }
  ];

  lstMes: Listados[] = [
    { value: '0', viewValue: 'Enero' },
    { value: '1', viewValue: 'Febrero' },
    { value: '2', viewValue: 'Marzo' }
  ];
  //Fin 

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, public _tipoReferenciaService: TipoReferenciaService, private modalService: NgbModal) {

    // tslint:disable-next-line: max-line-length
    this.agente = new Agente(null, null, 146, '', '', '', '', '', null, '', '', '', '', '', null, null, '', null, null, null, null, 198, '', null, null, null, null, '', '', null, null, '', false, null, '', '', '', '', '', '', '', '', null, null, null, null, null, null, '', '', null, null);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.getDep();
    this.cargarAreas();
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

  cargarAreas() {
    this._tipoReferenciaService.getValorReferenciaPorTipoValorId(10).subscribe(
      result => {
        this.areaLista = result.Lista;
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

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}

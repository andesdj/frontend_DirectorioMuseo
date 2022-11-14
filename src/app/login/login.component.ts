import { NgForm, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { Usuario, RecuperarClave } from '../models/usuario.model';
import { Session } from 'src/app/models/session.model';
//import swal from 'sweetalert';
import { User } from '../models/user.model';
import Swal from 'sweetalert2';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', { static: false })
  customLoadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = PrimaryRed;
  public secondaryColour = SecondaryBlue;
  public coloursEnabled = true;
  public loadingTemplate: TemplateRef<any>;
  // tslint:disable-next-line: max-line-length
  public config = {
    animationType: ngxLoadingAnimationTypes.none,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: '3px',
  };

  email: string;
  recuerdame: boolean = false;
  condiciones: boolean = false;
  auth2: any;
  public esError: boolean;
  oculto: string = 'oculto';
  ocultoContrasena: string = 'oculto';
  emailParaRecuperar: string;
  loading = false;
  c: string;
  idUser: string;
  token: string;

  constructor(
    private route: ActivatedRoute,
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) {
    this.token = '';
    // Valida inscripcion de nuevo Usuario
    this.route.queryParams.subscribe((params) => {
      this.c = params['c'];
      this.idUser = params['id'];
      if (this.c.length > 0 && this.idUser.length > 0) {
        this._usuarioService.activarUsuario(this.c, this.idUser).subscribe(
          (result) => {
            debugger;
            // this.loading = false;
            let resultado: any;
            resultado = result;
            if (result['OperacionExitosa']) {
              Swal.fire(
                'Importante',
                'Usuario Activado exitosamente, ya puede ingresar al sistema !!! ',
                'info'
              );
            } else {
              Swal.fire('Importante', result['Mensaje'], 'info');
            }
          },
          (error) => {
            //  this.loading = false;
            this.esError = true;
            if (this.esError) {
              Swal.fire('Validación', 'Usuario o password invalidos', 'error');
            }
          }
        );
      }
    });
    // Fin Valida Inscripcion
  }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
      this.condiciones = false;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '1092911327060-g2vc47pf21u508mom4jj4kfe4mqbecmn.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  resolved(captchaResponse: string) {
    //console.log(`Resolved response token: ${captchaResponse}`);
    this.token = captchaResponse;
    this.validateToken();
  }


  validateToken() {


    // let token = req.body.recaptcha;
    const secretkey1 = '6LelS7UZAAAAAFYomVyPttyDSewxlm9BYGVkSn4H'; //the secret key from your google admin console;

    //token validation url is URL: https://www.google.com/recaptcha/api/siteverify 
    // METHOD used is: POST

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretkey1}&response=${this.token}`;
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');

    this.http.post(url, headers).subscribe(
      (result) => {
        debugger;
        console.log(result);
      },
      (error) => {
        // this.error = error;
        // if (error.statusText === 'Unauthorized') {
        //     this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
        //     this.authenticationService.logout().subscribe(response => { });
        //     this.storageService.logout();
        // }
        // swal('Agente Creado', resp.Mensaje, 'success' );
        console.log(<any>error);
      }
    );




  }

  ayudaIngreso() {
    Swal.fire({
      // icon: 'warning',
      html:
        '<iframe width=480 height=280 frameborder="0" scrolling="no" src="https://screencast-o-matic.com/embed?sc=cr6tqAVlbX9&v=5&ff=1" allowfullscreen="true"></iframe>',
      showCloseButton: true,
      focusConfirm: false,
    });
  }

  ayudaRecuperarClave() {

    this.ocultoContrasena = 'oculto';
    Swal.fire({
      // icon: 'warning',
      html:
        '<iframe width=480 height=280 frameborder="0" scrolling="no" src="https://screencast-o-matic.com/embed?sc=cYijo35CTD&v=5&ff=1" allowfullscreen="true"></iframe>',
      showCloseButton: true,
      focusConfirm: false,
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      debugger;
      const profile = googleUser.getBasicProfile();
      const u3Email = profile.U3;
      console.log(profile);
      console.log(u3Email);
      const token = googleUser.getAuthResponse().id_token;

      console.log(token);
      console.log(googleUser.getAuthResponse());
      this._usuarioService
        .loginGoogle(token, u3Email)
        .subscribe(() => (window.location.href = '#/dashboard'));
    });
  }
  recuperar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    this.loading = true;
    let recuperarClave: RecuperarClave;
    recuperarClave = new RecuperarClave('');
    recuperarClave.username = forma.value.emailParaRecuperar;
    this._usuarioService.recuperarContrasena(recuperarClave).subscribe(
      //correcto => this.router.navigate(['/dashboard'])
      (result) => {
        this.loading = false;
        this.ocultoContrasena = '';
        let resultado: any;
        resultado = result;
        Swal.fire(
          'Importante',
          'Sus datos de acceso se enviaron!!! ' + resultado.Mensaje,
          'info'
        );
        this.ocultoContrasena = 'oculto';
        forma.value.emailParaRecuperar = '';
      },
      (error) => {
        this.loading = false;
        this.esError = true;
        if (this.esError) {
          Swal.fire('Validación', 'Usuario o password invalidos', 'error');
        }
      }
    );
  }

  ingresar(forma: NgForm) {
    debugger;
    // if (this.token === '') {
    //   Swal.fire('Importante', 'reCAPTCHA invalido', 'warning');
    //   return;
    // }

    if (forma.invalid) {
      return;
    }
    if (!this.condiciones) {
      Swal.fire('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }
    const usuario = new Usuario(
      1,
      '',
      '',
      '',
      '',
      '',
      forma.value.email,
      forma.value.password,
      forma.value.password,
      false,
      false,
      1,
      null
    );
    this.loading = true;
    this.login(usuario, forma.value.recuerdame).subscribe(
      (data) => {
        this.esError = false;
        this.correctLogin(data);
        this.loading = false;
      },
      (error) => {
        this.esError = true;
        this.loading = false;
        if (this.esError) {
          Swal.fire('Validación', 'Usuario o password invalidos', 'error');
        }
      }
    );
    //  .subscribe( correcto => {
    //    console.log(correcto);
    //  });

    //this.router.navigate(['/dashboard']);
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.PersonaEmail);
    } else {
      localStorage.removeItem('email');
    }
    const params =
      'grant_type=password&username=' +
      usuario.PersonaEmail +
      '&password=' +
      encodeURIComponent(usuario.CuentaUsuarioClave);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    //  headers.set('Access-Control-Allow-Origin', '*');
    //    headers.set('Access-Control-Allow-Methods', '*');
    //    headers.set('Access-Control-Allow-Headers', '*');
    return this.http.post(URL_SERVICIOS + 'token', params, {
      headers: headers,
    });
    // .pipe(
    //   map( (resp: any) => {
    //     //debugger;
    //     swal('Usuario creado', resp.Mensaje, 'success' );
    //     console.log(resp);
    //    return resp.usuario;
    //   }));
  }

  ingresar3(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    if (!this.condiciones) {
      Swal.fire('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }
    const usuario = new Usuario(
      1,
      '',
      '',
      '',
      '',
      '',
      forma.value.email,
      forma.value.password,
      forma.value.password,
      false,
      false,
      1,
      null
    );

    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe(
      //correcto => this.router.navigate(['/dashboard'])
      (data) => {
        this.esError = false;
        debugger;
        this.correctLogin(data);
        //this.cargarMenu();
        //console.log(data);
      },
      (error) => {
        //debugger;
        //let errorPayload = JSON.parse(error.message);
        //console.log(errorPayload[0].description);
        // console.log(error.error);
        // console.log(error.message);
        this.esError = true;
        if (this.esError) {
          Swal.fire('Validación', 'Usuario o password invalidos', 'error');
        }
      }
    );
    //  .subscribe( correcto => {
    //    console.log(correcto);
    //  });

    //this.router.navigate(['/dashboard']);
  }

  private correctLogin(data: any) {
    this._usuarioService.setCurrentSession(data);
    let usuario: User;
    let roles: any;
    let role: string;
    let perfilId: number;

    const user: any = this._usuarioService.getCurrentUser();
    usuario = JSON.parse(user);
    roles = usuario.Perfiles;
    if (roles.length > 0) {
      role = roles[0].PER_NOMBRE;
      perfilId = roles[0].PER_ID;
      if (perfilId === 1004) {
        this.router.navigate(['agentes']);
      } else {
        this.router.navigate(['dashboard']);
      }
    }


  }

  cargarMenu() {
    let usuario: User;
    let usuarioNombre: string;
    let roles: any;
    const user: any = this._usuarioService.getCurrentUser();
    usuario = JSON.parse(user);
    usuarioNombre = usuario.USU_NOMBRE;
    roles = usuario.Perfiles;
    if (roles.length > 0) {
      this._usuarioService
        .cargarMenuPorPerfilId(roles[0].PER_ID)
        .subscribe((resp: any) => {
          this._usuarioService.menu = resp.Lista;
        });
    }
  }

  mostrarModal() {
    Swal.fire({
      title: 'Términos y Condiciones',
      // type: 'info',
      // tslint:disable-next-line:max-line-length
      html:
        'Autorizo al Museo de Memoria de Colombia, para dar tratamiento de mis datos personales aquí registrados, conforme a la Ley 1581 de 2012 y la política de tratamiento de datos personales, con la finalidad de efectuar las funciones propias y procedentes de la Entidad. Consulte nuestra política de tratamiento en la páginahttps://centrodememoriahistorica.gov.co/wp-content/uploads/2020/06/SIP-PC-015-V2-Politica-de-tratamiento-de-datos-CNMH.pdf.',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: true,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Acepto los términos!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    });
  }
}

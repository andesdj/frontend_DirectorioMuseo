import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { UsuarioService } from "../services/service.index";
import { Usuario } from "../models/usuario.model";
import { Router } from "@angular/router";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from "ngx-loading";
const PrimaryWhite = "#ffffff";
const SecondaryGrey = "#ccc";
const PrimaryRed = "#dd0031";
const SecondaryBlue = "#006ddd";

declare function init_plugins();

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./login.component.css"],
})
export class RegisterComponent implements OnInit {
  @ViewChild("ngxLoading", { static: false })
  ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild("customLoadingTemplate", { static: false })
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
    backdropBorderRadius: "3px",
  };
  loading = false;

  forma: FormGroup;
  tipoDoc: Array<any>;
  //condiciones: boolean = false;

  constructor(public _usuarioService: UsuarioService, public router: Router) { }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true,
      };
    };
  }

  ngOnInit() {
    init_plugins();
    this.tipoDoc = [
      { Id: 1, Nombre: "CC" },
      { Id: 2, Nombre: "NIT" },
      { Id: 3, Nombre: "CE" },
      { Id: 4, Nombre: "PASAPORTE" },
    ];
    this.forma = new FormGroup(
      {
        TipoIdentificacionId: new FormControl(null, Validators.required),
        numeroDocumento: new FormControl(null, Validators.required),
        primerNombre: new FormControl(null, Validators.required),
        segundoNombre: new FormControl(null),
        primerApellido: new FormControl(null, Validators.required),
        segundoApellido: new FormControl(null),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false),
      },
      { validators: this.sonIguales("password", "password2") }
    );
  }

  ayudaIngreso() {
    Swal.fire({
      // icon: 'warning',
      html:
        '<iframe width=480 height=280 frameborder="0" scrolling="no" src="https://screencast-o-matic.com/embed?sc=cYijF555iE&v=5&ff=1" allowfullscreen="true"></iframe>',
      showCloseButton: true,
      focusConfirm: false,
    });
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    // if (!this.condiciones) {
    //   Swal.fire('Importante', 'Debe de aceptar las condiciones', 'warning');
    //   return;
    // }

    if (!this.forma.value.condiciones) {
      Swal.fire("Importante", "Debe de aceptar las condiciones", "warning");
      return;
    }

    let segundoApellido = "";
    if (this.forma.value.segundoApellido != null) {
      segundoApellido = this.forma.value.segundoApellido;
    }

    let segundoNombre = "";
    if (this.forma.value.segundoNombre != null) {
      segundoNombre = this.forma.value.segundoNombre;
    }

    const usuario = new Usuario(
      this.forma.value.TipoIdentificacionId,
      this.forma.value.numeroDocumento,
      this.forma.value.primerNombre,
      segundoNombre,
      this.forma.value.primerApellido,
      segundoApellido,
      this.forma.value.correo,
      this.forma.value.password,
      this.forma.value.password2,
      false,
      false,
      1004, // Perfil por Defecto
      null
    );

    this.loading = true;
    this._usuarioService.crearUsuario(usuario).subscribe(
      (resp) => {
        this.loading = false;
        if (resp["OperacionExitosa"]) {
          Swal.fire(
            "Usuario creado",
            resp["Mensaje"] +
            " Se ha enviado a su correo para activar su cuenta de usuario, por favor verificar, Gracias",
            "success"
          );

          this.limpiarCampos();
          this.router.navigate(["/login"]);
        } else {
          Swal.fire("Error", resp["Mensaje"], "error");
        }
      },
      (error) => {
        this.loading = false;
        console.log(<any>error);
      }
    );
  }
  limpiarCampos() {
    this.forma.value.primerNombre = "";
    this.forma.value.correo = "";
  }

  mostrarModal() {
    Swal.fire({
      title: "Términos y Condiciones",
      // type: 'info',
      // tslint:disable-next-line:max-line-length
      html:
        "Autorizo al Ministerio de Cultura para dar tratamiento de mis datos personales aquí registrados, conforme a la Ley 1581 de 2012 y la política de tratamiento de datos personales, con la finalidad de efectuar las funciones propias y procedentes de la Entidad. Consulte nuestra política de tratamiento en la página https://www.mincultura.gov.co. Sitio web. - El sitio web del Ministerio estará ubicado en la dirección URL: https://siartes.mincultura.gov.co o en cualquier otra dirección URL que discrecionalmente y sin limitación alguna, designe el Ministerio. Los sitios web de otras dependencias o unidades administrativas del Ministerio, a los cuales se accede a través de este sitio web, estarán sometidos a las presentes condiciones de uso y a la política de privacidad del Ministerio. Usuario. -Es la persona que se registra en el sitio web del Ministerio o que utiliza los servicios de este sitio web. World Wide Web. - Se refiere a la red de recursos accesibles en el Internet, usando el protocolo de transferencia de recursos – Hypertext Transfer Protocol – http. C. Publicidad, mensajes comerciales e hipervínculos El Ministerio no le remitirá al e-mail o dirección electrónica del usuario información que no haya solicitado, excepto información o noticias que se relacionen con los servicios del Ministerio. El Ministerio, a través de este sitio web, en ningún caso envía mensajes o realiza ofertas de servicios o productos, dirigidas a menores de edad, no recauda sus datos personales o generales, y no contiene información o contenidos que puedan perjudicar, dañar o atentar contra la privacidad o integridad personal y/o emocional de los menores. En la operación del sitio web, el Ministerio no genera, divulga o remite información, contenidos o mensajes de alcance ilícito, pornográfico, violento, discriminatorio, racista o sexista. Este sitio web puede tener hipervínculos a otros sitios web o a documentos localizados en otros sitios web de propiedad de otras empresas, personas u organizaciones diferentes al Ministerio. Solamente por el hecho que el usuario acceda a otro sitio web o a un documento individual localizado en otro sitio web, a través de un vínculo establecido en el sitio web, el usuario está sujeto a las condiciones de uso y a la política de privacidad del sitio web al cual remite el vínculo. Ni el Ministerio, ni las personas que coordinan, administran o actualizan este sitio web serán responsables en ningún caso por el contenido, alcance, veracidad, validez, integridad, autenticidad o licitud de cualquier información que el usuario localice en otro sitio web, a través de un vínculo establecido en el sitio web. Los usuarios y, en general, aquellas personas que se propongan establecer un hipervínculo entre su página web y el sitio web del Ministerio deberán cumplir las condiciones siguientes: (a) el hipervínculo únicamente permitirá el acceso a las páginas web del Ministerio, pero no podrá reproducirlas de ninguna forma; (b) no se establecerán hiperenlaces con las páginas web del Ministerio distintas de la página primera del sitio web o de los servicios; (c) no se creará un browser ni un border enviroment sobre las páginas del sitio web del Ministerio; (d) no se realizarán manifestaciones o indicaciones falsas, inexactas o incorrectas sobre las páginas web y, en particular, no se declarará ni dará a entender que el Ministerio ha autorizado el hipervínculo o que ha supervisado o asumido de cualquier forma los contenidos o servicios ofrecidos o puestos a disposición de la página web en la que se establece el hipervínculo; (e) excepción hecha de aquellos signos que formen parte del mismo hipervínculo, la página web en la que se establezca el hipervínculo no contendrá ninguna marca, nombre comercial, rótulo de establecimiento, denominación, logotipo, eslogan u otros signos distintivos pertenecientes al Ministerio; (f) la página web en la que se establezca el hipervínculo no contendrá informaciones o contenidos ilícitos, contrarios a la moral y buenas costumbres generalmente aceptadas y al orden público, así como tampoco contendrá contenidos contrarios a cualesquiera derechos de terceros. El establecimiento del hipervínculo no implica en ningún caso la existencia de relaciones entre el Ministerio y el propietario de la página web en la que se establezca, ni la aceptación y aprobación por parte del Ministerio de sus contenidos o servicios. D. Aceptación de las condiciones de uso Los contenidos y servicios del sitio web del Ministerio son de conocimiento público, por lo tanto, la aceptación plena y sin reservas de las presentes condiciones de uso es un requisito indispensable para que el usuario o cualquier persona pueda hacer uso legítimo del mismo. La aceptación de las presentes condiciones de uso por el usuario de este sitio Web, tendrá lugar cuando se presente cualquiera de los siguientes eventos: i) Suministro de datos en los formularios de registro del sitio Web. ii) El empleo de los mecanismos de aceptación, de seguridad o de acceso al sitio web que establezca el Ministerio. iii) La consulta de cualquier contenido incorporado en el sitio. iv) La utilización de cualquiera de los servicios que el Ministerio provea a los visitantes o usuarios a través de este sitio web. E. Contenido del sitio web Cualquier información o contenido del sitio web será definido en cualquier tiempo de forma unilateral, autónoma y discrecional por el Ministerio, y en ningún caso el uso de este sitio web por el visitante o usuario supone restricción o limitación de cualquier tipo a esta facultad del Ministerio. El Ministerio en ningún caso y bajo ninguna circunstancia será responsable por cualquier daño o perjuicio, directo o indirecto, real o potencial y generado a cualquier persona, por el alcance, validez, autenticidad, integridad o exactitud de los contenidos o de cualquier información que esté incorporada en cualquier momento en el sitio web del SINIC o en los sitios web vinculados al sitio web del Ministerio. F. Responsabilidad por uso indebido del sitio El visitante o usuario del sitio web se hará responsable por cualquier uso indebido, ilícito o anormal que hiciere de los contenidos, información o servicios del sitio web. El visitante o usuario del sitio, directa o por interpuesta persona, no atentará de cualquier forma contra el sitio web, contra su plataforma tecnológica, sus sistemas de información o interferirá en su normal funcionamiento. El visitante o el usuario del sitio no alterará, bloqueará o realizará cualquier otro acto que impida mostrar o acceder a cualquier contenido, información o servicios del sitio web o que estén incorporados en los sitios web vinculados al sitio web del Ministerio. El visitante o el usuario del sitio web no enviará o trasmitirá en este sitio web o hacia el mismo, a otros usuarios o a cualquier persona, cualquier información de alcance obsceno, difamatorio, injuriante, calumniante o discriminatorio contra el Ministerio, sus funcionarios o las personas responsables de la administración de este sitio web. El visitante o el usuario del sitio Web del Sistema de Información de la Dirección de Artes no incurrirá en y desde el mismo, en conductas ilícitas tales como daños o ataques informáticos, interceptación de comunicaciones, infracciones al derecho de autor, uso no autorizado de terminales, usurpación de identidad, revelación de secretos o falsedades documentales. El visitante o el usuario del sitio responderá penal y civilmente por los daños y perjuicios de toda naturaleza causados al Ministerio o a otras entidades del Sector de Artístico, directa o indirectamente, como consecuencia del incumplimiento de cualquiera de las obligaciones derivadas de las presentes condiciones de uso y demás parámetros normativos o de la ley aplicables en relación con la utilización del sitio web. El Ministerio tomará las medidas legales o disciplinarias que sean procedentes y aplicará las sanciones del caso, cuando un visitante o un usuario infrinja cualquiera de las obligaciones y deberes definidos en las presentes condiciones de uso. G. Responsabilidad por el uso de los servicios en línea El usuario es el único y exclusivo responsable del uso que haga de los servicios en línea disponibles en cualquier tiempo en este sitio web, y cualquier uso de los mismos, que realice un tercero se entenderá que lo hace a nombre del usuario y bajo su responsabilidad. El usuario es el único y exclusivo responsable del uso que haga de los mecanismos de acceso y seguridad –login, clave, etc.– que defina en cualquier tiempo el Ministerio, como requisito para utilizar o acceder a los servicios en línea. El Ministerio no garantiza la disponibilidad de los servicios en línea y de la información que los usuarios incorporen, transmitan, envíen o reciban a través de dichos servicios. El Ministerio no incurrirá en ninguna responsabilidad frente al usuario o terceros, porque el sitio web no se encuentre disponible o porque se restrinja en cualquier momento el acceso al mismo. El usuario no podrá divulgar o remitir información, contenidos o mensajes con alcance ilícito, pornográfico, violento, discriminatorio, vulgar, racista o sexista; a través de los servicios de este sitio web. El usuario se abstendrá de molestar o vulnerar cualquier derecho de otros usuarios de los servicios en línea. El usuario no debe enviar mensajes globales a toda la red, que generen mucho tráfico o que amenacen la disponibilidad de los servicios. El usuario debe utilizar un lenguaje apropiado y respetuoso cuando utilice los servicios en línea. El usuario en cualquier tiempo deberá observar cualquier otra regla, obligación, deber, uso o mejor práctica que defina el Ministerio, para garantizar una eficiente y eficaz prestación de cualquiera de los servicios disponibles en el sitio web del SINIC. H. Propiedad intelectual del sitio web El visitante o usuario del sitio Web deberá cumplir con las siguientes normas sobre protección de los derechos de propiedad intelectual: Todos los contenidos, información, signos distintivos y obras protegidas por el derecho de autor, incluidos en el sitio web del Ministerio, sin limitación -tales como texto, bases de datos, gráficas, imágenes, fotografías, video, sonidos, música, programas de computador, nombres de dominio, marcas, logos, símbolos, enseñas, nombres comerciales, lemas, modelos de utilidad, diseños industriales, etc.- son propiedad del Ministerio o de las organizaciones o personas que estén vinculadas a este sitio a través de banners o vínculos. Los contenidos, textos, bases de datos, diseños, gráficas, imágenes, fotografías, video, audio, sonidos, música, programas de computador y otras obras o creaciones intelectuales incluidas o vinculadas en el sitio web, están protegidas por las leyes colombianas y convenios internacionales sobre propiedad intelectual y derechos de autor. El visitante o usuario de este sitio web, directa o indirectamente, no podrá de ninguna forma y en ningún caso: reproducir, copiar, transformar, modificar, ceder, transmitir, divulgar, publicar, o distribuir cualquier información, contenidos o bienes susceptibles de protección por la propiedad intelectual, propiedad industrial o el derecho de autor que sean del Ministerio de Cultura o de las organizaciones o personas que estén vinculadas a este sitio web a través de banners o vínculos. El visitante o usuario de este sitio web utilizará cualquier información, contenidos o bienes susceptibles de protección por la propiedad intelectual, propiedad industrial o el derecho de autor que se encuentren en los sitios web que estén vinculadas a este sitio a través de banners o vínculos, conforme a las condiciones de uso de dichos sitios web. Cualquier persona que considere que su obra o creación intelectual ha sido divulgada en este sitio con violación de sus derechos de propiedad intelectual, puede notificar esta situación al Ministerio contáctenos aquí: Dirección Postal: Carrera 8 No. 8-55 Teléfono: (571) 342 41000 Ext. 4033 Fax: (571) 336 1007 Línea de Quejas y Reclamos: 01 8000 913079 I. Disponibilidad del sitio web El Ministerio en ningún caso responderá por cualquier atraso, interrupción, errores, fallas técnicas o por la no-disponibilidad o falla en el sitio web del Sistema de Información de la Dirección de Artes y tampoco responde frente al usuario, visitante o terceros por cualquier perjuicio directo o indirecto que se derive de tales hechos. Cuando sea razonablemente posible, el Ministerio advertirá previamente las interrupciones en el funcionamiento del sitio web y de sus servicios. El Ministerio tampoco garantiza la utilidad del sitio web del para la realización de ninguna actividad particular, y manifiesta que la falibilidad y accesibilidad del mismo estarán sujetas en todo momento a las situaciones de hecho que puedan afectarlas, y a las medidas que el Ministerio razonablemente pueda tomar para contrarrestar los problemas tecnológicos o de cualquier tipo que se presenten. El Ministerio no responderá en ningún caso y bajo ninguna circunstancia por los ataques o incidentes contra la seguridad del sitio web o contra sus sistemas de información; o por cualquier exposición o acceso no autorizado, fraudulento o ilícito al sitio web y que puedan afectar la confidencialidad, integridad o autenticidad de la información publicada en el sitio o asociada con los contenidos y servicios que se ofrecen en el sitio web. J. Ley aplicable y jurisdicción Estas condiciones serán gobernadas por las leyes de la República de Colombia, en los aspectos que no estén expresamente regulados en ellas. El usuario no podrá alegar ante el Ministerio o ante una autoridad judicial o administrativa, la aplicación de condición, norma o convenio que no esté expresamente incorporado en las presentes condiciones de uso. Si cualquier disposición de estas condiciones pierde validez o fuerza obligatoria, por cualquier razón, todas las demás disposiciones, conservan su fuerza obligatoria, carácter vinculante y generarán todos sus efectos. Para cualquier efecto legal o judicial, el lugar de las presentes condiciones es la ciudad de Bogotá D.C., República de Colombia y cualquier controversia que surja de su interpretación o aplicación se someterá a los jueces de la República de Colombia. K. Incorporación por remisión Se advierte al visitante y usuario del sitio web, que conforme al artículo 44 de la Ley 527 de 1999, las presentes condiciones de uso incorporan por remisión la política de privacidad de este sitio web. La política de privacidad y sus términos serán jurídicamente válidos como si hubieran sido incorporados en su totalidad en estas condiciones de uso. L. Modificación de las condiciones de uso El Ministerio de Cultura en cualquier tiempo, puede dejar sin efecto, limitar, modificar, suprimir o adicionar las disposiciones de estas condiciones de uso. LL. Contáctenos Si el usuario desea hacer sugerencias al Ministerio, para mejorar los contenidos, la información y los servicios que ofrece en este sitio web se puede dirigir al siguiente correo electrónico: direccionartes@mincultura.gov.co.",
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: true,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Acepto los términos!',
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: "Thumbs down",
    });
  }
}

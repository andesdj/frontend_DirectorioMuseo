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
      title: "T??rminos y Condiciones",
      // type: 'info',
      // tslint:disable-next-line:max-line-length
      html:
        "Autorizo al Ministerio de Cultura para dar tratamiento de mis datos personales aqu?? registrados, conforme a la Ley 1581 de 2012 y la pol??tica de tratamiento de datos personales, con la finalidad de efectuar las funciones propias y procedentes de la Entidad. Consulte nuestra pol??tica de tratamiento en la p??gina https://www.mincultura.gov.co. Sitio web. - El sitio web del Ministerio estar?? ubicado en la direcci??n URL: https://siartes.mincultura.gov.co o en cualquier otra direcci??n URL que discrecionalmente y sin limitaci??n alguna, designe el Ministerio. Los sitios web de otras dependencias o unidades administrativas del Ministerio, a los cuales se accede a trav??s de este sitio web, estar??n sometidos a las presentes condiciones de uso y a la pol??tica de privacidad del Ministerio. Usuario. -Es la persona que se registra en el sitio web del Ministerio o que utiliza los servicios de este sitio web. World Wide Web. - Se refiere a la red de recursos accesibles en el Internet, usando el protocolo de transferencia de recursos ??? Hypertext Transfer Protocol ??? http. C. Publicidad, mensajes comerciales e hiperv??nculos El Ministerio no le remitir?? al e-mail o direcci??n electr??nica del usuario informaci??n que no haya solicitado, excepto informaci??n o noticias que se relacionen con los servicios del Ministerio. El Ministerio, a trav??s de este sitio web, en ning??n caso env??a mensajes o realiza ofertas de servicios o productos, dirigidas a menores de edad, no recauda sus datos personales o generales, y no contiene informaci??n o contenidos que puedan perjudicar, da??ar o atentar contra la privacidad o integridad personal y/o emocional de los menores. En la operaci??n del sitio web, el Ministerio no genera, divulga o remite informaci??n, contenidos o mensajes de alcance il??cito, pornogr??fico, violento, discriminatorio, racista o sexista. Este sitio web puede tener hiperv??nculos a otros sitios web o a documentos localizados en otros sitios web de propiedad de otras empresas, personas u organizaciones diferentes al Ministerio. Solamente por el hecho que el usuario acceda a otro sitio web o a un documento individual localizado en otro sitio web, a trav??s de un v??nculo establecido en el sitio web, el usuario est?? sujeto a las condiciones de uso y a la pol??tica de privacidad del sitio web al cual remite el v??nculo. Ni el Ministerio, ni las personas que coordinan, administran o actualizan este sitio web ser??n responsables en ning??n caso por el contenido, alcance, veracidad, validez, integridad, autenticidad o licitud de cualquier informaci??n que el usuario localice en otro sitio web, a trav??s de un v??nculo establecido en el sitio web. Los usuarios y, en general, aquellas personas que se propongan establecer un hiperv??nculo entre su p??gina web y el sitio web del Ministerio deber??n cumplir las condiciones siguientes: (a) el hiperv??nculo ??nicamente permitir?? el acceso a las p??ginas web del Ministerio, pero no podr?? reproducirlas de ninguna forma; (b) no se establecer??n hiperenlaces con las p??ginas web del Ministerio distintas de la p??gina primera del sitio web o de los servicios; (c) no se crear?? un browser ni un border enviroment sobre las p??ginas del sitio web del Ministerio; (d) no se realizar??n manifestaciones o indicaciones falsas, inexactas o incorrectas sobre las p??ginas web y, en particular, no se declarar?? ni dar?? a entender que el Ministerio ha autorizado el hiperv??nculo o que ha supervisado o asumido de cualquier forma los contenidos o servicios ofrecidos o puestos a disposici??n de la p??gina web en la que se establece el hiperv??nculo; (e) excepci??n hecha de aquellos signos que formen parte del mismo hiperv??nculo, la p??gina web en la que se establezca el hiperv??nculo no contendr?? ninguna marca, nombre comercial, r??tulo de establecimiento, denominaci??n, logotipo, eslogan u otros signos distintivos pertenecientes al Ministerio; (f) la p??gina web en la que se establezca el hiperv??nculo no contendr?? informaciones o contenidos il??citos, contrarios a la moral y buenas costumbres generalmente aceptadas y al orden p??blico, as?? como tampoco contendr?? contenidos contrarios a cualesquiera derechos de terceros. El establecimiento del hiperv??nculo no implica en ning??n caso la existencia de relaciones entre el Ministerio y el propietario de la p??gina web en la que se establezca, ni la aceptaci??n y aprobaci??n por parte del Ministerio de sus contenidos o servicios. D. Aceptaci??n de las condiciones de uso Los contenidos y servicios del sitio web del Ministerio son de conocimiento p??blico, por lo tanto, la aceptaci??n plena y sin reservas de las presentes condiciones de uso es un requisito indispensable para que el usuario o cualquier persona pueda hacer uso leg??timo del mismo. La aceptaci??n de las presentes condiciones de uso por el usuario de este sitio Web, tendr?? lugar cuando se presente cualquiera de los siguientes eventos: i) Suministro de datos en los formularios de registro del sitio Web. ii) El empleo de los mecanismos de aceptaci??n, de seguridad o de acceso al sitio web que establezca el Ministerio. iii) La consulta de cualquier contenido incorporado en el sitio. iv) La utilizaci??n de cualquiera de los servicios que el Ministerio provea a los visitantes o usuarios a trav??s de este sitio web. E. Contenido del sitio web Cualquier informaci??n o contenido del sitio web ser?? definido en cualquier tiempo de forma unilateral, aut??noma y discrecional por el Ministerio, y en ning??n caso el uso de este sitio web por el visitante o usuario supone restricci??n o limitaci??n de cualquier tipo a esta facultad del Ministerio. El Ministerio en ning??n caso y bajo ninguna circunstancia ser?? responsable por cualquier da??o o perjuicio, directo o indirecto, real o potencial y generado a cualquier persona, por el alcance, validez, autenticidad, integridad o exactitud de los contenidos o de cualquier informaci??n que est?? incorporada en cualquier momento en el sitio web del SINIC o en los sitios web vinculados al sitio web del Ministerio. F. Responsabilidad por uso indebido del sitio El visitante o usuario del sitio web se har?? responsable por cualquier uso indebido, il??cito o anormal que hiciere de los contenidos, informaci??n o servicios del sitio web. El visitante o usuario del sitio, directa o por interpuesta persona, no atentar?? de cualquier forma contra el sitio web, contra su plataforma tecnol??gica, sus sistemas de informaci??n o interferir?? en su normal funcionamiento. El visitante o el usuario del sitio no alterar??, bloquear?? o realizar?? cualquier otro acto que impida mostrar o acceder a cualquier contenido, informaci??n o servicios del sitio web o que est??n incorporados en los sitios web vinculados al sitio web del Ministerio. El visitante o el usuario del sitio web no enviar?? o trasmitir?? en este sitio web o hacia el mismo, a otros usuarios o a cualquier persona, cualquier informaci??n de alcance obsceno, difamatorio, injuriante, calumniante o discriminatorio contra el Ministerio, sus funcionarios o las personas responsables de la administraci??n de este sitio web. El visitante o el usuario del sitio Web del Sistema de Informaci??n de la Direcci??n de Artes no incurrir?? en y desde el mismo, en conductas il??citas tales como da??os o ataques inform??ticos, interceptaci??n de comunicaciones, infracciones al derecho de autor, uso no autorizado de terminales, usurpaci??n de identidad, revelaci??n de secretos o falsedades documentales. El visitante o el usuario del sitio responder?? penal y civilmente por los da??os y perjuicios de toda naturaleza causados al Ministerio o a otras entidades del Sector de Art??stico, directa o indirectamente, como consecuencia del incumplimiento de cualquiera de las obligaciones derivadas de las presentes condiciones de uso y dem??s par??metros normativos o de la ley aplicables en relaci??n con la utilizaci??n del sitio web. El Ministerio tomar?? las medidas legales o disciplinarias que sean procedentes y aplicar?? las sanciones del caso, cuando un visitante o un usuario infrinja cualquiera de las obligaciones y deberes definidos en las presentes condiciones de uso. G. Responsabilidad por el uso de los servicios en l??nea El usuario es el ??nico y exclusivo responsable del uso que haga de los servicios en l??nea disponibles en cualquier tiempo en este sitio web, y cualquier uso de los mismos, que realice un tercero se entender?? que lo hace a nombre del usuario y bajo su responsabilidad. El usuario es el ??nico y exclusivo responsable del uso que haga de los mecanismos de acceso y seguridad ???login, clave, etc.??? que defina en cualquier tiempo el Ministerio, como requisito para utilizar o acceder a los servicios en l??nea. El Ministerio no garantiza la disponibilidad de los servicios en l??nea y de la informaci??n que los usuarios incorporen, transmitan, env??en o reciban a trav??s de dichos servicios. El Ministerio no incurrir?? en ninguna responsabilidad frente al usuario o terceros, porque el sitio web no se encuentre disponible o porque se restrinja en cualquier momento el acceso al mismo. El usuario no podr?? divulgar o remitir informaci??n, contenidos o mensajes con alcance il??cito, pornogr??fico, violento, discriminatorio, vulgar, racista o sexista; a trav??s de los servicios de este sitio web. El usuario se abstendr?? de molestar o vulnerar cualquier derecho de otros usuarios de los servicios en l??nea. El usuario no debe enviar mensajes globales a toda la red, que generen mucho tr??fico o que amenacen la disponibilidad de los servicios. El usuario debe utilizar un lenguaje apropiado y respetuoso cuando utilice los servicios en l??nea. El usuario en cualquier tiempo deber?? observar cualquier otra regla, obligaci??n, deber, uso o mejor pr??ctica que defina el Ministerio, para garantizar una eficiente y eficaz prestaci??n de cualquiera de los servicios disponibles en el sitio web del SINIC. H. Propiedad intelectual del sitio web El visitante o usuario del sitio Web deber?? cumplir con las siguientes normas sobre protecci??n de los derechos de propiedad intelectual: Todos los contenidos, informaci??n, signos distintivos y obras protegidas por el derecho de autor, incluidos en el sitio web del Ministerio, sin limitaci??n -tales como texto, bases de datos, gr??ficas, im??genes, fotograf??as, video, sonidos, m??sica, programas de computador, nombres de dominio, marcas, logos, s??mbolos, ense??as, nombres comerciales, lemas, modelos de utilidad, dise??os industriales, etc.- son propiedad del Ministerio o de las organizaciones o personas que est??n vinculadas a este sitio a trav??s de banners o v??nculos. Los contenidos, textos, bases de datos, dise??os, gr??ficas, im??genes, fotograf??as, video, audio, sonidos, m??sica, programas de computador y otras obras o creaciones intelectuales incluidas o vinculadas en el sitio web, est??n protegidas por las leyes colombianas y convenios internacionales sobre propiedad intelectual y derechos de autor. El visitante o usuario de este sitio web, directa o indirectamente, no podr?? de ninguna forma y en ning??n caso: reproducir, copiar, transformar, modificar, ceder, transmitir, divulgar, publicar, o distribuir cualquier informaci??n, contenidos o bienes susceptibles de protecci??n por la propiedad intelectual, propiedad industrial o el derecho de autor que sean del Ministerio de Cultura o de las organizaciones o personas que est??n vinculadas a este sitio web a trav??s de banners o v??nculos. El visitante o usuario de este sitio web utilizar?? cualquier informaci??n, contenidos o bienes susceptibles de protecci??n por la propiedad intelectual, propiedad industrial o el derecho de autor que se encuentren en los sitios web que est??n vinculadas a este sitio a trav??s de banners o v??nculos, conforme a las condiciones de uso de dichos sitios web. Cualquier persona que considere que su obra o creaci??n intelectual ha sido divulgada en este sitio con violaci??n de sus derechos de propiedad intelectual, puede notificar esta situaci??n al Ministerio cont??ctenos aqu??: Direcci??n Postal: Carrera 8 No. 8-55 Tel??fono: (571) 342 41000 Ext. 4033 Fax: (571) 336 1007 L??nea de Quejas y Reclamos: 01 8000 913079 I. Disponibilidad del sitio web El Ministerio en ning??n caso responder?? por cualquier atraso, interrupci??n, errores, fallas t??cnicas o por la no-disponibilidad o falla en el sitio web del Sistema de Informaci??n de la Direcci??n de Artes y tampoco responde frente al usuario, visitante o terceros por cualquier perjuicio directo o indirecto que se derive de tales hechos. Cuando sea razonablemente posible, el Ministerio advertir?? previamente las interrupciones en el funcionamiento del sitio web y de sus servicios. El Ministerio tampoco garantiza la utilidad del sitio web del para la realizaci??n de ninguna actividad particular, y manifiesta que la falibilidad y accesibilidad del mismo estar??n sujetas en todo momento a las situaciones de hecho que puedan afectarlas, y a las medidas que el Ministerio razonablemente pueda tomar para contrarrestar los problemas tecnol??gicos o de cualquier tipo que se presenten. El Ministerio no responder?? en ning??n caso y bajo ninguna circunstancia por los ataques o incidentes contra la seguridad del sitio web o contra sus sistemas de informaci??n; o por cualquier exposici??n o acceso no autorizado, fraudulento o il??cito al sitio web y que puedan afectar la confidencialidad, integridad o autenticidad de la informaci??n publicada en el sitio o asociada con los contenidos y servicios que se ofrecen en el sitio web. J. Ley aplicable y jurisdicci??n Estas condiciones ser??n gobernadas por las leyes de la Rep??blica de Colombia, en los aspectos que no est??n expresamente regulados en ellas. El usuario no podr?? alegar ante el Ministerio o ante una autoridad judicial o administrativa, la aplicaci??n de condici??n, norma o convenio que no est?? expresamente incorporado en las presentes condiciones de uso. Si cualquier disposici??n de estas condiciones pierde validez o fuerza obligatoria, por cualquier raz??n, todas las dem??s disposiciones, conservan su fuerza obligatoria, car??cter vinculante y generar??n todos sus efectos. Para cualquier efecto legal o judicial, el lugar de las presentes condiciones es la ciudad de Bogot?? D.C., Rep??blica de Colombia y cualquier controversia que surja de su interpretaci??n o aplicaci??n se someter?? a los jueces de la Rep??blica de Colombia. K. Incorporaci??n por remisi??n Se advierte al visitante y usuario del sitio web, que conforme al art??culo 44 de la Ley 527 de 1999, las presentes condiciones de uso incorporan por remisi??n la pol??tica de privacidad de este sitio web. La pol??tica de privacidad y sus t??rminos ser??n jur??dicamente v??lidos como si hubieran sido incorporados en su totalidad en estas condiciones de uso. L. Modificaci??n de las condiciones de uso El Ministerio de Cultura en cualquier tiempo, puede dejar sin efecto, limitar, modificar, suprimir o adicionar las disposiciones de estas condiciones de uso. LL. Cont??ctenos Si el usuario desea hacer sugerencias al Ministerio, para mejorar los contenidos, la informaci??n y los servicios que ofrece en este sitio web se puede dirigir al siguiente correo electr??nico: direccionartes@mincultura.gov.co.",
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: true,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Acepto los t??rminos!',
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: "Thumbs down",
    });
  }
}

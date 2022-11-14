import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';

// Temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

import { DxCheckBoxModule, DxDataGridModule, DxFileUploaderModule, DxListModule } from 'devextreme-angular';
import { ModaltextComponent } from './components/modaltext/modaltext.component';

import { AgmCoreModule } from '@agm/core';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './utils/app-init';

import { NgxLoadingModule } from 'ngx-loading';
import { ValidarCuentaComponent } from './login/validar-cuenta.component';

import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ObjetosComponent } from './objetos/objetos.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { DxDateBoxModule } from 'devextreme-angular';

import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ModaltextComponent,
    HomeComponent,
    ValidarCuentaComponent,
    ObjetosComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    DxDataGridModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD1S_KatBI9RiyeU_VunIYDS6tWRr5QfsY',
      libraries: ['geometry', 'places', 'drawing'],
    }),
    BrowserAnimationsModule,
    KeycloakAngularModule,
    NgxLoadingModule.forRoot({}),
    RecaptchaModule,
    RecaptchaFormsModule,
    MatDatepickerModule,
    DxDateBoxModule,
    MatNativeDateModule,
    MatRippleModule,
    NgbModule,
    DxFileUploaderModule,
    DxCheckBoxModule,
    DxListModule,
  ],
  providers: [
    // ---- keycloak ----//
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializer,
    //   multi: true,
    //   deps: [KeycloakService]
    // }
    // ---- keycloak ----//
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

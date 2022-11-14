import { NgModule, Injectable } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';


// Modulos
import { SharedModule } from '../shared/shared.modules';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectModule } from 'ng-select';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { DxNumberBoxModule } from 'devextreme-angular';


// Pipe Modules
import { PipesModule } from '../pipes/pipes.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';
import { ChartsModule } from 'ng2-charts';


// componentes
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilesComponent } from './perfiles/perfiles.component';

// tslint:disable-next-line:max-line-length
import { DxScrollViewModule, DxBulletModule, DxPopupModule, DxListModule, DxVectorMapModule, DxDataGridModule, DxButtonModule, DxSelectBoxModule, DxFileUploaderModule, DxDateBoxModule, DxPivotGridModule, DxChartModule, DxPieChartModule, DxSchedulerModule, DxTemplateModule, DxCheckBoxModule } from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';
import { TablasTipoComponent } from './tablas-tipo/tablas-tipo.component';
import { TablasValoresComponent } from './tablas-valores/tablas-valores.component';

import { NgbModule, NgbDateStruct, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Ficha1Component } from './ficha1/ficha1.component';
import { AgentesComponent } from './agentes/agentes.component';
import { PermisosComponent } from './permisos/permisos.component';
import { FichaGeneralComponent } from './ficha-general/ficha-general.component';
import { ComisionesCalendarioComponent } from './comisiones-calendario/comisiones-calendario.component';
import { MapaFichasComponent } from './mapa-fichas/mapa-fichas.component';
import { ComisionesGastosComponent } from './comisiones-gastos/comisiones-gastos.component';
import { EqualValidator } from '../directive/equal-validator.directive';
import { OfertaArtesComponent } from './oferta-artes/oferta-artes.component';
import { ConcertacionComponent } from './concertacion/concertacion.component';
import { EntidadesComponent } from './entidades/entidades.component';
import { AgrupacionesComponent } from './agrupaciones/agrupaciones.component';
import { AgentesSimusComponent } from './agentes-simus/agentes-simus.component';
import { EntidadesSimusComponent } from './entidades-simus/entidades-simus.component';
// tslint:disable-next-line:max-line-length
import { AgrupacionesSimusComponent } from './agrupaciones-simus/agrupaciones-simus.component'; // Grey Jimenez - Se adicina ruta para agentes simus
import { MapUbicacionComponent } from '../components/map-ubicacion/map-ubicacion.component';
import { EspaciosComponent } from './espacios/espacios.component';
import { ConcertacionAComponent } from './concertacion-a/concertacion-a.component';
import { NgxLoadingModule } from 'ngx-loading';
import { PoligonosComponent } from './poligonos/poligonos.component';
import { CurrencyPipe } from '@angular/common';
import { TokenInterceptor } from '../login/token.interceptor';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { TablerosComponent } from './tableros/tableros.component';
import { OfertaAdministracionComponent } from './oferta-administracion/oferta-administracion.component';
import { CompromisosAdministracionComponent } from './compromisos-administracion/compromisos-administracion.component';
import { ProgramacionActividadesComponent } from './programacion-actividades/programacion-actividades.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ObjetosAdminComponent } from './objetos-admin/objetos-admin.component';



@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('.');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { day: toInteger(dateParts[0]), month: null, year: null };
            } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: null };
            } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: toInteger(dateParts[2]) };
            }
        }
        return null;
    }

    format(date: NgbDateStruct): string {
        return date ?
            `${isNumber(date.day) ? padNumber(date.day) : ''}/${isNumber(date.month) ? padNumber(date.month) : ''}/${date.year}` :
            '';
    }
}

export function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return '';
    }
}

export function isNumber(value: any): value is number {
    return !isNaN(toInteger(value));
}

export function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}

@Injectable()
export class NgbUTCStringAdapter extends NgbDateAdapter<string> {

    fromModel(date: string): NgbDateStruct {
        return (date && Number(date.substring(0, 2)) && Number(date.substring(3, 5) + 1) && Number(date.substring(6, 10))) ?
            {
                year: Number(date.substring(6, 10)),
                month: Number(date.substring(3, 5)),
                day: Number(date.substring(0, 2))
            } : null;
    }

    toModel(date: NgbDateStruct): string {
        return date ? String('00' + date.day).slice(-2) + '/' + String('00' + date.month).slice(-2) + '/' + date.year.toString() : null;
    }
}



@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        {
            provide: NgbDateParserFormatter,
            useClass: NgbDateCustomParserFormatter
        },
        {
            provide: NgbDateAdapter,
            useClass: NgbUTCStringAdapter
        }, CurrencyPipe
    ],
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        TablasTipoComponent,
        TablasValoresComponent,
        PerfilesComponent,
        Ficha1Component,
        AgentesComponent,
        PermisosComponent,
        FichaGeneralComponent,
        ComisionesCalendarioComponent,
        MapaFichasComponent,
        ComisionesGastosComponent,
        EqualValidator,
        OfertaArtesComponent,
        ConcertacionComponent,
        EntidadesComponent,
        AgrupacionesComponent,
        AgentesSimusComponent,
        EntidadesSimusComponent,
        AgrupacionesSimusComponent,
        MapUbicacionComponent,
        EspaciosComponent,
        ConcertacionAComponent,
        PoligonosComponent,
        IndicadoresComponent,
        TablerosComponent,
        OfertaAdministracionComponent,
        CompromisosAdministracionComponent,
        ProgramacionActividadesComponent,
        ActividadesComponent,
        ObjetosAdminComponent,
        
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        DxDataGridModule,
        DxPivotGridModule,
        DxChartModule,
        DxPieChartModule,
        DxSchedulerModule,
        DxTemplateModule,
        DxButtonModule,
        DxSelectBoxModule,
        DxFileUploaderModule,
        DxDateBoxModule,
        DxCheckBoxModule,
        DxSelectBoxModule,
        DxNumberBoxModule,
        BrowserModule,
        DxBulletModule,
        DxPopupModule,
        DxScrollViewModule,
        NgbModule,
        NgSelectModule,
        SelectModule,
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyD1S_KatBI9RiyeU_VunIYDS6tWRr5QfsY' }),
        AgmJsMarkerClustererModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        NgxLoadingModule.forRoot({}),
        DxVectorMapModule,
        DxListModule,
        
        
    ],
})
export class PagesModule { }

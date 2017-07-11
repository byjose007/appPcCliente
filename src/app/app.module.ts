import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import { BlockUIModule } from 'ng-block-ui';

import { AppRoutingModule }        from './app-routing.module';
import { AppComponent } from './app.component';

import { ComposeMessageComponent } from './compose-message.component';
import { PageNotFoundComponent }   from './not-found.component';

import { AreasModule }            from './areas/areas.module';
import { EmpleadosModule }            from './empleados/empleados.module';
import { ImagenesModule }            from './imagenes/imagenes.module';
import { HorarioSistemaModule }            from './horarioSistema/horarioSistema.module';
import { UltimosRegistrosModule }            from './ultimosRegistros/ultimosRegistros.module';
import { LimpiezaImagenesModule }            from './limpiezaImagenes/limpiezaImagenes.module';
import { PermisosModule }            from './permisos/permisos.module';
import { MultasModule }            from './multas/multas.module';
import { ReporteModule }            from './reportes/reporte.module';
import { LoginModule } from './login/login.module';

import { Router } from '@angular/router';
import { AppAboutComponent } from "./app.about.component";

import { PagerService } from '../providers/PagerService'
import { AuthService } from '../providers/auth.service';
import { AuthGuard } from '../providers/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    ComposeMessageComponent,
    PageNotFoundComponent,
    AppAboutComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AreasModule,
    EmpleadosModule,
    HorarioSistemaModule,
    ImagenesModule,
    UltimosRegistrosModule,
    LimpiezaImagenesModule,
    PermisosModule,
    MultasModule,
    ReporteModule,
    LoginModule,
    BlockUIModule,
    ReactiveFormsModule
    
  ],
  providers: [PagerService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    //console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }   
}

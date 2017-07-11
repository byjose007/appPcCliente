import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ReporteComponent }    from './reporte.component';
import { ReporteMultas }  from './reporte.multas';

//import { EmpleadoService } from './empleado.service';

import { ReporteRoutingModule } from './reporte-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReporteRoutingModule
  ],
  declarations: [
    ReporteComponent,
    ReporteMultas
  ],
  //providers: [ EmpleadoService ]
})
export class ReporteModule {}

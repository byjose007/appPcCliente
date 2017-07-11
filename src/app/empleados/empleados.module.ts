import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoListComponent }    from './empleado-list.component';
//import { AreaDetailComponent }  from './area-detail.component';

import { EmpleadoService } from './empleado.service';

import { EmpleadoRoutingModule } from './empleados-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmpleadoRoutingModule
  ],
  declarations: [
    EmpleadoListComponent,
    //AreaDetailComponent
  ],
  providers: [ EmpleadoService ]
})
export class EmpleadosModule {}

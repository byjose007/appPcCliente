import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { HorarioSistemaListComponent }    from './horarioSistema-list.component';
//import { AreaDetailComponent }  from './area-detail.component';

import { HorarioSistemaService } from './horarioSistema.service';

import { HorarioSistemaRoutingModule } from './horarioSistema-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HorarioSistemaRoutingModule
  ],
  declarations: [
    HorarioSistemaListComponent,
    //AreaDetailComponent
  ],
  providers: [ HorarioSistemaService ]
})
export class HorarioSistemaModule {}

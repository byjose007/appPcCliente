import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { LimpiezaImagenesListComponent }    from './limpiezaImagenes-list.component';
//import { AreaDetailComponent }  from './area-detail.component';

import { LimpiezaImagenesService } from './limpiezaImagenes.service';

import { LimpiezaImagenesRoutingModule } from './limpiezaImagenes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LimpiezaImagenesRoutingModule
  ],
  declarations: [
    LimpiezaImagenesListComponent,
    //AreaDetailComponent
  ],
  providers: [ LimpiezaImagenesService ]
})
export class LimpiezaImagenesModule {}

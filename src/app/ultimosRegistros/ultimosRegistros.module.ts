import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { UltimosRegistrosListComponent }    from './ultimosRegistros-list.component';
//import { AreaDetailComponent }  from './area-detail.component';

import { UltimosRegistrosService } from './ultimosRegistros.service';

import { UltimosRegistrosRoutingModule } from './ultimosRegistros-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UltimosRegistrosRoutingModule
  ],
  declarations: [
    UltimosRegistrosListComponent,
    //AreaDetailComponent
  ],
  providers: [ UltimosRegistrosService ]
})
export class UltimosRegistrosModule {}

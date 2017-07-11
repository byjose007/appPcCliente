import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { MultasListComponent }    from './multas-list.component';
//import { AreaDetailComponent }  from './area-detail.component';

import { MultasService } from './multas.service';

import { MultasRoutingModule } from './multas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MultasRoutingModule
  ],
  declarations: [
    MultasListComponent,
    //AreaDetailComponent
  ],
  providers: [ MultasService ]
})
export class MultasModule {}

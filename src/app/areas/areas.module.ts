import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { AreaListComponent }    from './area-list.component';
import { AreaDetailComponent }  from './area-detail.component';

import { AreaService } from './area.service';

import { AreaRoutingModule } from './areas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AreaRoutingModule
  ],
  declarations: [
    AreaListComponent,
    AreaDetailComponent
  ],
  providers: [ AreaService ]
})
export class AreasModule {}

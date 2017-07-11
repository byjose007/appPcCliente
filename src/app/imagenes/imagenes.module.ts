import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ImagenesListComponent }    from './imagenes-list.component';
//import { AreaDetailComponent }  from './area-detail.component';

import { ImagenesService } from './imagenes.service';

import { ImagenesRoutingModule } from './imagenes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ImagenesRoutingModule
  ],
  declarations: [
    ImagenesListComponent,
    //AreaDetailComponent
  ],
  providers: [ ImagenesService ]
})
export class ImagenesModule {}

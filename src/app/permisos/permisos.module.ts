import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { PermisosListComponent }    from './permisos-list.component';
//import { AreaDetailComponent }  from './area-detail.component';

import { PermisosService } from './permisos.service';

import { PermisosRoutingModule } from './permisos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PermisosRoutingModule
  ],
  declarations: [
    PermisosListComponent,
    //AreaDetailComponent
  ],
  providers: [ PermisosService ]
})
export class PermisosModule {}

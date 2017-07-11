import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImagenesListComponent }    from './imagenes-list.component';
import { AuthGuard } from '../../providers/auth.guard';
//import { AreaDetailComponent }  from './empleado-detail.component';

const heroesRoutes: Routes = [
  { path: 'imagenes',  component: ImagenesListComponent,canActivate: [AuthGuard]  },
  //{ path: 'areas/:id', component: AreaDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ImagenesRoutingModule { }

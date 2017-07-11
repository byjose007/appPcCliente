import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LimpiezaImagenesListComponent }    from './limpiezaImagenes-list.component';
import { AuthGuard } from '../../providers/auth.guard';
//import { AreaDetailComponent }  from './empleado-detail.component';

const heroesRoutes: Routes = [
  { path: 'limpiezaImagenes',  component: LimpiezaImagenesListComponent,canActivate: [AuthGuard]  },
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
export class LimpiezaImagenesRoutingModule { }

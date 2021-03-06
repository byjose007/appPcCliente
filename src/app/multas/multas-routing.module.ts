import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MultasListComponent }    from './multas-list.component';
//import { AreaDetailComponent }  from './empleado-detail.component';
import { AuthGuard } from '../../providers/auth.guard';

const heroesRoutes: Routes = [
  { path: 'multas',  component: MultasListComponent,canActivate: [AuthGuard]  },
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
export class MultasRoutingModule { }

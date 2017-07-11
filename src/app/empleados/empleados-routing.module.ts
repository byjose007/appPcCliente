import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpleadoListComponent }    from './empleado-list.component';
//import { AreaDetailComponent }  from './empleado-detail.component';
import { AuthGuard } from '../../providers/auth.guard';

const heroesRoutes: Routes = [
  { path: 'empleados',  component: EmpleadoListComponent,canActivate: [AuthGuard]  },
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
export class EmpleadoRoutingModule { }

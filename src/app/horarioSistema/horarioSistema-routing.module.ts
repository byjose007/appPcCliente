import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HorarioSistemaListComponent }    from './horarioSistema-list.component';
//import { AreaDetailComponent }  from './empleado-detail.component';
import { AuthGuard } from '../../providers/auth.guard';

const heroesRoutes: Routes = [
  { path: 'horarioSistema',  component: HorarioSistemaListComponent,canActivate: [AuthGuard]  },
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
export class HorarioSistemaRoutingModule { }

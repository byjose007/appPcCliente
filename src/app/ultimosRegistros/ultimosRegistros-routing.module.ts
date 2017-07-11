import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UltimosRegistrosListComponent }    from './ultimosRegistros-list.component';
//import { AreaDetailComponent }  from './empleado-detail.component';

const heroesRoutes: Routes = [
  { path: 'ultimosRegistros',  component: UltimosRegistrosListComponent },
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
export class UltimosRegistrosRoutingModule { }

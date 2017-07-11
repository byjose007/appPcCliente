import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PermisosListComponent }    from './permisos-list.component';
//import { AreaDetailComponent }  from './empleado-detail.component';

const heroesRoutes: Routes = [
  { path: 'permisos',  component: PermisosListComponent },
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
export class PermisosRoutingModule { }

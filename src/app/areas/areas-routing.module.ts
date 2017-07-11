import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AreaListComponent }    from './area-list.component';
import { AreaDetailComponent }  from './area-detail.component';
import { AuthGuard } from '../../providers/auth.guard';

const heroesRoutes: Routes = [
  { path: 'areas',  component: AreaListComponent,canActivate: [AuthGuard]  },
  { path: 'areas/:id', component: AreaDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AreaRoutingModule { }

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReporteComponent }    from './reporte.component';
import { ReporteMultas }  from './reporte.multas';

const heroesRoutes: Routes = [
  { path: 'reportes',  component: ReporteComponent },
  { path: 'reportMultas', component: ReporteMultas }
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ReporteRoutingModule { }

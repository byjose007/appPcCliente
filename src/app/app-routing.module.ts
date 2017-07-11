import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComposeMessageComponent }  from './compose-message.component';
import { PageNotFoundComponent }    from './not-found.component';

import { CanDeactivateGuard }       from './can-deactivate-guard.service';
import { AuthGuard }                from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { AppAboutComponent } from "./app.about.component";

const appRoutes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '',   redirectTo: '/areas', pathMatch: 'full' },
  { path: '',   redirectTo: '/empleados', pathMatch: 'full' },
  { path: '',   redirectTo: '/imagenes', pathMatch: 'full' },
  { path: '',   redirectTo: '/horarioSistema', pathMatch: 'full' },
  { path: '',   redirectTo: '/ultimosRegistros', pathMatch: 'full' },
  { path: '',   redirectTo: '/limpiezaImagenes', pathMatch: 'full' },
  { path: '',   redirectTo: '/permisos', pathMatch: 'full' },
  { path: '',   redirectTo: '/multas', pathMatch: 'full' },
  { path: '',   redirectTo: '/reportes', pathMatch: 'full' },
  { path: '',   redirectTo: '/usuarios', pathMatch: 'full' },
  { path: '',   redirectTo: '/roles', pathMatch: 'full' },
  { path: 'about', component: AppAboutComponent },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { preloadingStrategy: SelectivePreloadingStrategy }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }

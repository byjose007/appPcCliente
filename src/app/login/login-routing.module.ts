import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login }    from './login';
import { UsuarioComponent }  from './usuario';
import { RolComponent }  from './rol';

const heroesRoutes: Routes = [
  { path: 'login',  component: Login },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'roles', component: RolComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }

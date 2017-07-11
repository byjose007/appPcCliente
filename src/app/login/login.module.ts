import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';


import { Login }    from './login';
import { UsuarioComponent }    from './usuario';
import { RolComponent }    from './rol';
//import { AreaDetailComponent }  from './area-detail.component';

//import { AreaService } from './area.service';

import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ],
  declarations: [
    Login,
    UsuarioComponent,
    RolComponent
  ],
})
export class LoginModule {}

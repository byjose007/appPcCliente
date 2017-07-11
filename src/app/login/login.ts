import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
//import {controllerLogin} from './controller/controllerLogin';
//import {AppComponent} from './app.component';

@Component({
  templateUrl: './login.html',
  styleUrls: ['./login.css']
  //providers: [controllerLogin]
})
export class Login implements OnInit {
  ngVariable:string;
  valid: boolean = false;
  username: string = "";
  error: boolean = false;
  password: string;
  usuario: any;
  constructor(private router: Router, private auth: AuthService//, public controllerLogin: controllerLogin, public main:AppComponent
  ) {
   
  }
  ngOnInit() {
    

    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/areas']);
    }
  }
  public ingresar() {

    this.auth.login(this.username, this.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/areas']);
          location.reload(true);
          
        } else {
          
          this.ngVariable = 'Usuario o password incorrecto';
          this.router.navigate(['/login']);
        }
      }, error => {
        this.error =true;
        this.ngVariable = "Usuario o password incorrecto";
        this.router.navigate(['/login']);
      });

    /*this.auth.login(this.username, this.password)
      .subscribe(data => {
        this.usuario = data;
        if (this.auth.isLoggedIn) {
          //this.main.visible = true;            
          localStorage.setItem('id_token', '1');
          this.router.navigate(['/areas']);
          // location.reload(true);
        } else {
          localStorage.setItem('id_token', "0");
          this.ngVariable = "Usuario o password incorrecto";
          this.router.navigate(['/']);
        }
      }, error => {
        //this.mensajeLoginUsuario = "Usuario o contraseña con inválidos";
        console.log(error)
        this.ngVariable = "Usuario o password incorrecto";
        this.router.navigate(['/']);

      });*/
  }
}

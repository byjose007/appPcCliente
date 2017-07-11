import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../providers/auth.service';
import { AppGeneric } from '../providers/app.generic';


@Component({
  selector: 'app-root',
  providers: [AppGeneric],
  templateUrl: './app.component.html',    
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user:any = {
    username: "admin"
  };
  titulo = "Municipio de Loja";
  controller :"/areas";
  nombre : String = "Estructura Organizacional!!";
  menus : any = [];
  login:boolean = false;
  showMenu:boolean=false;
  usr:any;
  

 constructor(public router: Router,private title:Title, public AppGeneric: AppGeneric, private auth:AuthService){
   let token = localStorage.getItem('id_token');
   title.setTitle(this.titulo);

    if (localStorage.getItem('currentUser')){
      this.showMenu = true;
      this.usr = JSON.parse(localStorage.getItem('currentUser'));

      //this.router.navigate(['/']);
         this.AppGeneric.getDataId("menu",this.usr.username).subscribe((data:any) => {
      let lista = data;
      lista.forEach(element => {
        if(element.padre==undefined)
        {          
          let items: any = [];
          lista.forEach(item => {
            if(item.padre == element.id )
            {
              items.push(item);
            }
          });
          this.menus.push({"element":element,"items":items});          
        }
      });
      //this.menus = data;

    },
      error => {

        console.error("Error obteniendo empleados" + error);
      }
    );
    }



 

 
 }
  public salir(){
    /*localStorage.setItem('id_token', "0");
    this.usr = localStorage.getItem('id_token');*/
     this.showMenu = false;
     this.auth.logout();
    this.router.navigate(['/login']);
   
  }

}

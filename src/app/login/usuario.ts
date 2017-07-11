import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppGeneric } from '../../providers/app.generic';
import { PagerService } from '../../providers/PagerService';

@Component({
  templateUrl: './usuario.html',
  styleUrls: ['./login.css']
  //providers: [controllerLogin]
})
export class UsuarioComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  private allItems: any[] = [];
  pager: any = {};
  pagedItems: any[];

  total: number = 0;
  count: number = 5;
  valores: any[] = [];

  usuario = {
    username:"",
    clave:"",
    clave2:"",
    rol:""
  };
  clave: String;
  clave2: String;
  id : String;
  rol: any;
  roles: any = [];

  constructor(private router: Router, public AppGeneric: AppGeneric, private pagerService: PagerService
  ) {

  }
  ngOnInit() {
    this.getData();
  }
  editUsuario(item:any)
  {
    this.id = item.usuario.id;
    this.usuario = item.usuario.username;
    //this.clave = item.usuario.password;
    //this.clave2 = item.usuario.password;
    this.rol = item.rol;
  }
  public nuevoUsuario() {
    this.id = "0";
    this.rol = 0;
  }
  public guardar() {
    if (this.id != undefined) this.clave="00";
    this.AppGeneric.listPageP("usuario",this.id,this.usuario,this.clave,this.rol.id).subscribe((data: any) => {
      let respuesta = data;
      this.blockUI.stop();
    },
      error => {
        this.blockUI.stop();
        console.error("Error obteniendo empleados" + error);
      }
    );
  }
  public getData() {
    this.blockUI.start("espere...");
    this.AppGeneric.list("usuarioRol").subscribe((data: any) => {
      this.allItems = data;
      this.total = data.length;
      this.setPage(1);
      this.AppGeneric.list("roles").subscribe((roles: any) => {
        this.roles = roles;
        this.blockUI.stop();
      },
        error => {
          this.blockUI.stop();
          console.error("Error obteniendo empleados" + error);
        }
      );
    },
      error => {
        this.blockUI.stop();
        console.error("Error obteniendo empleados" + error);
      }
    );
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.count);
    this.valores = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}

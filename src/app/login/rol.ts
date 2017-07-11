import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppGeneric } from '../../providers/app.generic';
import { PagerService } from '../../providers/PagerService';

@Component({
  templateUrl: './rol.html',
  styleUrls: ['./login.css']
  //providers: [controllerLogin]
})
export class RolComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  private allItems: any[] = [];
  pager: any = {};
  pagedItems: any[];

  total: number = 0;
  count: number = 5;
  valores: any[] = [];  
  rol={
    id: "0",
    nombre: ""
  };
  valor: any;
  menu: any = [];
  menus: any = [];
  items: any = [];
  menuRol: any = [];
  constructor(private router: Router, public AppGeneric: AppGeneric, private pagerService: PagerService) {

  }
  ngOnInit() {
    this.getData();
  }
  addElement(item, e: any) {
    /*if (e.target.checked)
      this.items.push(item);
    else
      this.deleteMsg(item);*/
  }
  deleteMsg(msg: any) {
    let index: number = this.items.indexOf(msg);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
  nuevoRol() {
    this.rol = {
      id: "0",
      nombre:""
    };
    this.menus = [];
    this.menu.forEach(itc => {
      let select = false;
      this.menus.push({
        item: itc,
        select: select
      });
    });
  }
  editRol(item) {
    this.rol  = item;
    this.menus = [];
    this.blockUI.start("espere...");
    this.AppGeneric.getDataId("menuRol", item.id).subscribe((data: any) => {
      this.menuRol = data;
      this.menu.forEach(itc => {
        let select = false;
        this.menuRol.forEach(element => {
          if (itc.id == element.menu.id)
            select = true;
        });
        this.menus.push({
          item: itc,
          select: select
        });
      });
      this.blockUI.stop();
    },
      error => {
        this.blockUI.stop();
        console.error("Error obteniendo empleados" + error);
      }
    );
  }
  public guardar() {
    let cads = "";
    this.menus.forEach(element => {
      if(element.select)
        cads += element.item.id + "_";
    });
    this.AppGeneric.listPageM("rol", this.rol.id , this.rol.nombre, cads).subscribe((data: any) => {
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
    this.AppGeneric.list("roles").subscribe((data: any) => {
      this.allItems = data;
      this.total = data.length;
      this.setPage(1);
      this.AppGeneric.list("menus").subscribe((menus: any) => {
        this.menu = menus;
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

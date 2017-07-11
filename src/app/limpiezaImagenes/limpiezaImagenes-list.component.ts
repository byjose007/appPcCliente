// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppGeneric } from '../../providers/app.generic';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PagerService } from '../../providers/PagerService';
@Component({
  templateUrl: './limpiezaImagenes-list.html',
  providers: [AppGeneric],
  styleUrls: ['./limpiezaImagenes.css']
})
export class LimpiezaImagenesListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  private allItems: any[] = [];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  selectPage:boolean = false;
  btnEditar:boolean = true;
  pathImage:String;
  filteredList:any[] = [];
  public query = '';
  public empleados:any[] = [];
  registros:any[] = [];
  error: any;
  total: number = 0;
  count: number = 5;
  valores: any[] = [];
  private selectedId: number;
  operacion: any;
  constructor(public AppGeneric:AppGeneric, private pagerService: PagerService,private router: Router
  ) {
   
  }
  ngOnInit() {


       this.getData();
      this.getEmpleados();
 
     
  }
  public getData() {
    this.blockUI.start("espere...");
    this.AppGeneric.list("registroSize").subscribe(data => {      
      let items: any = data;
      this.allItems = items;
      this.setPage(1);
      this.total = items.length;
      this.blockUI.stop();
    },
      error => {
        console.error("Error obteniendo empleados" + error)
        this.blockUI.stop();
      }
    );
  }

  public getEmpleados() {
    this.AppGeneric.list("persona").subscribe(data => {      
      let items: any = data;
      this.empleados = items;
    },
      error => {
        console.error("Error obteniendo empleados" + error)
        this.blockUI.stop();
      }
    );
  }  

  public onChangeSelect() {
    this.btnEditar = !this.selectPage;
    this.valores.forEach(r => r["select"] = this.selectPage);
  }

  public onChangeSelectItem() {
    this.btnEditar = true;
    this.valores.forEach(r => r["select"] == true ? this.btnEditar = false : this.btnEditar);
    if (this.btnEditar)
      this.selectPage = false;
  }

  filter() {
    if (this.query !== "") {
      this.filteredList = this.empleados.filter(function (el:any) {
        return (el.nombres.toLowerCase().indexOf(this.query.toLowerCase()) > -1);
      }.bind(this));
    } else {
      this.filteredList = [];
    }
  }

  select(item:any) {
    this.query = item.nombres;
    this.filteredList = [];
  }

  public setPathImage(image:String) {
    this.pathImage = image;
  }

  public eliminarRegistros() {
    let ultimo = "";
    this.valores.forEach(r => r.select && (ultimo += r.registro.id + "x")
    );
    this.AppGeneric.updateRegistros(ultimo, 0, 2
    ).subscribe(data => {
        
      },
      error => {
        console.error("Error al actualizar el registro!" + error)
      }
    )
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.count);
    this.valores = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  public limpiarDatosFormulario(){

    this.query = "";
    this.filteredList = [];
  }

  public getItems(ev:any) {
    let val = ev.target.value;
    if (val == " " || val == null || val == undefined || val == "") {
      val = "";
      this.getData();
    }
    if (val && val.trim() != '') {
      // let total_empleados:any;
      let total_registros:any;
      this.AppGeneric.listPage("registrosL",this.total,1).subscribe(data => {        
          total_registros = data;
          this.registros = total_registros.filter((item:any) => {
            return (item.persona.nombres.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
          this.valores = [];
          this.registros.forEach(r => this.valores.push(
            {
              registro: r,select: false
            }
          ));

        }, error => {
        console.error("Error obteniendo registros!" + error)
      });
    }
  }

}

// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppGeneric } from '../../providers/app.generic';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PagerService } from '../../providers/PagerService'

@Component({
  templateUrl: './imagenes-list.html',
  providers: [AppGeneric],
  styleUrls: ['./imagenes.css']
})
export class ImagenesListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  private allItems: any[] = [];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  empleados: any[] = [];
  ngVariable = "";
  pagina: number = 1;
  total: number = 0;
  count: number = 5;
  fotos: any[] = [];
  paginas: number = 0;
  public items: any[];
  error: any;
  private selectedId: number;
  operacion: any;

  constructor(public AppGeneric: AppGeneric, private pagerService: PagerService, private router: Router
  ) {

  }
  ngOnInit() {

   
      setTimeout((blockUI) => {
        this.getData();

      }, 100);
    


  }
  public getData() {
    this.blockUI.start("espere...");
    this.AppGeneric.list("persona").subscribe(data => {
      let empleados: any = data;
      this.total = empleados.length;
      this.allItems = empleados;
      this.setPage(1);
      if (empleados.length > 0)
        this.buscarEmpleado(this.empleados[0].id);
    },
      error => {
        this.blockUI.stop();
        console.error("Error obteniendo empleados" + error)
      }
    );
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.count);
    this.empleados = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  public cambioPagina(valor: number) {
    this.ngVariable = "Pagina: " + this.pagina;
    if (valor == 1 && this.pagina < this.total / this.count)
      this.pagina++;
    else
      if (this.pagina > 1 && valor == -1)
        this.pagina--;
    this.updatePage();
  }

  public updatePage() {
    this.paginas = parseInt((this.total / this.count).toString()) + 1;
    this.ngVariable = "Pagina: " + this.pagina;
    this.AppGeneric.listPage("empleados", this.count, this.pagina).subscribe(data => {
      let empleados: any = data;
      this.empleados = empleados;
    },
      error => {
        console.error("Error saving food!" + error)
      }
    );
  }

  public onChange() {
    this.pagina = 1;
    this.updatePage();
  }

  public buscarEmpleado(empleado: any) {
    this.AppGeneric.getDataId("fotos", empleado).subscribe(data => {
      this.fotos = data;
      this.blockUI.stop();
    },
      error => {
        this.blockUI.stop();
        console.error("Error saving food!" + error)
      }
    );
  }
}

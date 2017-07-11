// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppGeneric } from '../../providers/app.generic';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PagerService } from '../../providers/PagerService';

@Component({
  templateUrl: './permisos-list.html',
  providers: [AppGeneric],
  styleUrls: ['./permisos.css']
})
export class PermisosListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  private allItems: any[] = [];
  pager: any = {};
  pagedItems: any[];

  valores: any[] = [];
  total: number = 0;
  count: number = 5;
  registros: any[] = [];
  permiso: any = {};
  permisos: any[] = [];
  horarios: any[] = [];
  filteredList: any[] = [];
  public query = '';
  empleados: any[] = [];
  nuevo: boolean;
  id_horario: any;
  fecha: any;
  empleado : any;
  constructor(public AppGeneric: AppGeneric, private pagerService: PagerService, private router: Router
  ) {
    this.fecha = new Date();
  }
  ngOnInit() {

      this.blockUI.start("espere...");
      setTimeout((blockUI) => {
        this.getData();
        this.blockUI.stop();
      }, 100)
   
  }
  public getData() {
    this.blockUI.start("espere...");
    this.AppGeneric.list("permisosAll").subscribe(data => {
      let permisos: any = data;
      this.allItems = permisos;
      this.setPage(1);
      this.total = permisos.length;
      this.AppGeneric.list("horario").subscribe(hors => {
        let horarios: any = hors;
        this.horarios = horarios;
        this.AppGeneric.list("persona").subscribe(emps => {
          let personas: any = emps;
          this.empleados = personas;
          this.blockUI.stop();
        },
          error => {
            this.blockUI.stop();
            console.error("Error obteniendo empleados" + error)
          }
        );
      },
        error => {
          this.blockUI.stop();
          console.error("Error obteniendo empleados" + error)
        }
      );
    },
      error => {
        this.blockUI.stop();
        console.error("Error obteniendo empleados" + error)
      }
    );
  }

  filter() {
    if (this.query !== "") {
      this.filteredList = this.empleados.filter(function (el: any) {
        return el.nombres.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
    } else {
      this.filteredList = [];
    }
  }

  select(item: any) {
    this.empleado = item;
    this.query = item.nombres;
    this.filteredList = [];
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.count);
    this.valores = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  set fechaReporte(e) {
    e = e.split('-');
    let d = new Date(Date.UTC(e[0], e[1] - 1, e[2]));
    this.fecha.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }
  get fechaReporte() {
    return this.fecha.toISOString().substring(0, 10);
  }
  getPermisos()
  {
    //this.blockUI.start("espere...");
    this.AppGeneric.list("permisosAll").subscribe(data => {
      let permisos: any = data;
      this.allItems = permisos;
      this.setPage(1);
      this.blockUI.stop();
    },
      error => {
        this.blockUI.stop();
        console.error("Error obteniendo empleados" + error)
      }
    );
  }
  public nuevoPermiso(){}

  public guardarPermiso() {

    this.permiso.estado = true;
    this.permiso.fecha = this.fecha.getUTCFullYear()+"-"+(this.fecha.getUTCMonth()+1)+"-"+this.fecha.getUTCDate();
    this.permiso.persona = this.empleado.id;
    this.blockUI.start("espere...");
    this.AppGeneric.save(this.permiso,"permisos")
      .subscribe(data => {
        this.getPermisos();
      },
      error => {
        this.blockUI.stop();
        console.error("Error guardando permiso!");        
      });
  }

}

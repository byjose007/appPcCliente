// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppGeneric } from '../../providers/app.generic';
import { PagerService } from '../../providers/PagerService'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from '../../providers/auth.service';


@Component({
  templateUrl: './areas-list.html',
  providers: [AppGeneric],
  styleUrls: ['./areas.css']
})
export class AreaListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  private allItems: any[] = [];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  total: number = 0;
  count: number = 5;
  area: any = {};
  nombre: string;
  categoria: string;
  ciudad: string;
  controller: any;
  estados: any[] = [{ id: true, estado: 'Activo' }, { id: false, estado: 'Inactivo' }];
  ciudades: any[] = [{ id: true, estado: 'Activo' }, { id: false, estado: 'Inactivo' }];
  //estado : any;
  selectedValue = null;

  public items: any[];
  public catalogoEstados: any[];
  public catalogoCategorias: any[];
  error: any;
  private selectedId: number;
  operacion: any;
  constructor(public AppGeneric: AppGeneric, private router: Router, private pagerService: PagerService, private auth: AuthService) {
    //   let usr = localStorage.getItem('id_token');
    //  if(usr=='0'){
    //    this.router.navigate(['../login/login']);
    //  }

  }
  //---------------------------------
  ngOnInit() {
 
      this.getData();
   

  }

  //---------------------------------
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.count);
    this.items = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  //---------------------------------
  public getData() {
    this.blockUI.start("espere...");
    this.AppGeneric.list("area").subscribe(data => {
      let areas: any = data;
      this.allItems = areas;
      this.total = this.allItems.length;
      this.setPage(1);

      this.AppGeneric.getDataId("catalogo","ESTADOS").subscribe(cats => {
        let catalogos: any = cats;
        this.catalogoEstados = catalogos;

          this.AppGeneric.getDataId("catalogo","CATEGORIAS").subscribe(categorias => {
            let categoria: any = categorias;
            this.catalogoCategorias = categoria;
            this.blockUI.stop();
          },
            error => {
              console.error("Error obteniendo empleados" + error)
              this.blockUI.stop();
            }
          );
      },
        error => {
          console.error("Error obteniendo empleados" + error)
          this.blockUI.stop();
        }
      );

    },
      error => {
        console.error("Error obteniendo empleados" + error)
        this.blockUI.stop();
      }
    );
  }
  //---------------------------------
  public nuevo() {
    this.area = {};
  }
  //---------------------------------
  public guardar() {
    /* this.area = {
       nombre:this.nombre,
       categoria:this.categoria,
       ciudad:this.ciudad,
       estado:this.estado,
     };*/

    //this.area.estado = this.area.estado;
    //guarda si es una nueva area
    if (this.area.id == undefined) {
      this.AppGeneric.save(this.area, "area").subscribe(data => { this.getData(); });
    } else {
      this.AppGeneric.update(this.area, "area").subscribe(data => { this.getData(); });
    }
  }
  //---------------------------------

  public editar(area: any) {


    this.area = area;
    //this.area = this.empleado.area.id;
    //this.getHorariosEmpleado(this.empleado.id);
  }
  //---------------------------------
}

// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppGeneric } from '../../providers/app.generic';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PagerService } from '../../providers/PagerService';
@Component({
  templateUrl: './multas-list.html',
  providers: [AppGeneric],
  styleUrls: ['./multas.css']
})
export class MultasListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  private allItems: any[] = [];
  pager: any = {};
  pagedItems: any[];

  multas: any[] = [];
  pagina: number = 1;
  total: number = 0;
  count: number = 10;
  valores: any[] = [];
  paginas: number = 0;
  ngVariable = "Registro de movimiento de empleados";
  pathImage: String;
  public items: any[];
  public horarios: any[];
  error: any;
  private selectedId: number;
  multa: any;
  constructor(public AppGeneric: AppGeneric, private pagerService: PagerService, private router: Router
  ) {

  }
  ngOnInit() {
  
      this.getData();
   
  }
  public getData() {
    this.blockUI.start("espere...");
    this.AppGeneric.list("registro").subscribe(data => {
      let registros: any = data;
      this.allItems = registros;
      this.total = registros.length;
      this.setPage(1);

      this.AppGeneric.list("horarioEmpleado").subscribe(hors => {
        let horsE: any = hors;
        this.horarios = horsE;
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
  }
  /*public getData() {
    this.controllerData.getTotalMultas().subscribe(data => {
        this.total = data.length;
        this.cambioPagina(0);
      },
      error => {
        console.error("Error obteniendo multas!" + error)
      }
    );
  }*/

  public cambioPagina(valor: number) {
    this.ngVariable = "Pagina: " + this.pagina;
    if (valor == 1 && this.pagina < this.total / this.count)
      this.pagina++;
    else if (this.pagina > 1 && valor == -1)
      this.pagina--;
    this.updatePage();
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.count);
    this.valores = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  public updatePage() {
    this.paginas = parseInt((this.total / this.count).toString()) + 1;
    /*for (let i = 2; i <= this.total / this.count; i++) {
      this.paginas.push(i);
    }*/
    this.ngVariable = "Pagina: " + this.pagina;
    this.valores = [];
    this.AppGeneric.listPage("multas", this.count, this.pagina).subscribe(data => {
      let multas: any = data;
      this.multas = multas;
      this.multas.sort();
      this.multas.forEach(r => this.valores.push(
        {
          registro: r, select: false
        }
      ));
    },
      error => {
        console.error("Error al guardar!" + error)
      }
    );
  }

  public onChange() {
    this.pagina = 1;
    this.updatePage();
  }

  public setPathImage(image: String) {
    this.pathImage = image;
  }

  public editMulta(multa: any) {
    let horarioEmpleado = {"persona":0,"id":0};
    this.horarios.forEach(horario => {
      let h = horario.horarioSistema;
      let time = new Date(multa.fecha);
      let hora = time.getHours();
      let minuto = time.getMinutes();
      let hora_entrada = Number(h.entrada.substring(0, 2));
      let minuto_entrada = Number(h.entrada.substring(3, 5));
      let hora_salida = Number(h.salida.substring(0, 2));
      let minuto_salida = Number(h.salida.substring(3, 5));
      if (hora >= hora_entrada && minuto >= minuto_entrada
        && hora <= hora_salida && minuto <= minuto_salida) {
        horarioEmpleado = horario;
      }
    });
    if (horarioEmpleado.persona != 0) {
      this.multa = {};
      this.multa.horarioEmp = horarioEmpleado.id;
      this.multa.registro = multa.id;
      this.multa.persona = multa.persona.id;
      this.AppGeneric.save(this.multa, "multas")
        .subscribe(data => {
          this.setPage(1);
        },
        error => {
          console.error("Error actualizando multa");
        });
    }
  }

}

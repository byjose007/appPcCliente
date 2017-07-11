// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppGeneric } from '../../providers/app.generic';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  templateUrl: './horarioSistema-list.html',
  providers: [AppGeneric],
  styleUrls: ['./horarioSistema.css']
})
export class HorarioSistemaListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public items: any[];
  error: any;
  private selectedId: number;
  operacion: any;
  horario = {
    nombre:"",
    entrada:"",
    salida:""
  }
  constructor(public AppGeneric: AppGeneric, private router: Router
  ) {

  }
  ngOnInit() {

 
      this.blockUI.start("espere...");
      setTimeout((blockUI) => {
        this.getData();
        this.blockUI.stop();
      }, 100);


  }
  public getData() {
    this.AppGeneric.list("horario")
      .subscribe(data => {
        let horarios: any = data
        this.items = horarios;
      },
      error => {
        console.error("Error obteniendo empleados" + error)
      }
      );
  }
  public nuevo() {

  }
  public editar(item){
    this.horario = item;
  }
}

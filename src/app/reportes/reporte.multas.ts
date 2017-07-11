// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
//import { Observable } from 'rxjs/Observable';
import {Observable} from "rxjs/Rx";
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppGeneric } from '../../providers/app.generic';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PagerService } from '../../providers/PagerService';
declare let jsPDF;

@Component({
  templateUrl: './reporte.multas.html',
  providers: [AppGeneric],
  styleUrls: ['./reporte.css']
})
export class ReporteMultas implements OnInit {
  @ViewChild('layout') canvasRef;
  @BlockUI() blockUI: NgBlockUI;
  image = 'http://localhost:8000/media/registro/prueba_img.png';

  startDate: any;
  endDate: any;

  private allItems: any[] = [];
  pager: any = {};
  pagedItems: any[];

  vals = [];
  registros: any[] = [];
  pagina: number = 1;
  total: number = 0;
  count: number = 5;
  valores: any[] = [];
  paginas: number = 0;
  doc = new jsPDF();
  empleado: any;
  constructor(public AppGeneric: AppGeneric, private pagerService: PagerService, private route: ActivatedRoute
  ) {
    this.startDate = new Date();
    this.endDate = new Date();
  }

  aderirImagen(i, src) {

    //let canvas = this.canvasRef.nativeElement;
    //let context = canvas.getContext('2d');
    
    //this.image = canvas.toDataURL();
    

    var img = new Image();
    if (i == this.valores.length) {
      this.doc.save('test.pdf');
      return;
    }     
    img.onload = (c) => {

      //context.drawImage(img, 0, 0);  

      this.doc.text(10, ((i+3) * 20)+5, this.valores[i].persona.cedula);
      this.doc.text(40, ((i+3) * 20)+5, this.valores[i].persona.nombres);
      this.doc.text(70, ((i+3) * 20)+5, this.valores[i].persona.apellidos);
      this.doc.text(120, ((i+3) * 20)+5, this.valores[i].registro.fecha);
      this.doc.addImage(img, 'png', 170, (i+3) * 20,15,15);
      this.aderirImagen(i + 1,this.valores[i + 1] != undefined ? this.valores[i + 1].registro.imagenFace:"");
    };
    img.crossOrigin = 'Anonymous';    
    img.setAttribute('header', 'Access-Control-Allow-Origin: *');
    img.setAttribute('Access-Control-Allow-Origin', '*');
    //img.setAttribute('Access-Control-Allow-Credentials', 'true');
    img.src = src;
      
  }
  public downloadRegistros() {


    var img = new Image();
    img.onload = (c) => {

        
        //var doc = new jsPDF();
        this.doc.setFont("helvetica");
        this.doc.setFontType("bold");
        this.doc.text(64, 12, 'Municipio de Loja');

        this.doc.setFont("courier");
        this.doc.setFontType("bolditalic");
        this.doc.text(60, 20, 'Reporte de Registros');

        this.doc.setFont("courier");
        this.doc.setFontType("bolditalic");
        this.doc.text(10, 50, 'Cedula');
        this.doc.text(40, 50, 'Nombres');
        this.doc.text(70, 50, 'Apellidos');
        this.doc.text(110, 50, 'Fecha Captura');
        this.doc.text(160, 50, 'Imagen'); 

        this.doc.setFont("courier");
        this.doc.setFontType("normal"); 
        this.doc.setFontSize(10);      

        this.doc.addImage(img, 'png', 10, 5);
        this.aderirImagen(0, this.valores[0].registro.imagenFace);
        //this.doc.save('test.pdf');
    };
    //img.src = canvas.toDataURL();
    img.src = './assets/media/logo-municipio.png';
  }

  set fechaDesde(e) {
    e = e.split('-');
    let d = new Date(Date.UTC(e[0], e[1] - 1, e[2]));
    this.startDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }
  get fechaDesde() {
    return this.startDate.toISOString().substring(0, 10);
  }
  set fechaHasta(e) {
    e = e.split('-');
    let d = new Date(Date.UTC(e[0], e[1] - 1, e[2]));
    this.endDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }
  get fechaHasta() {
    return this.endDate.toISOString().substring(0, 10);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.empleado = params;
    });
    //this.getData();
  }

  public getData() {
    this.blockUI.start("espere...");
    this.AppGeneric.getDataIdFechas("multasFecha",this.empleado.id,this.fechaDesde,this.fechaHasta).subscribe(data => {
      let items: any = data;
      this.allItems = items;
      this.pager = this.pagerService.getPager(items.length,1,this.count);
      this.setPage(1);
      this.total = items.length;
      this.blockUI.stop();
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
    this.valores = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}

// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppGeneric } from '../../providers/app.generic';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { PagerService } from '../../providers/PagerService'

declare let jsPDF;
@Component({
  templateUrl: './ultimosRegistros-list.html',
  providers: [AppGeneric],
  styleUrls: ['./ultimosRegistros.css']
})
export class UltimosRegistrosListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  private allItems: any[] = [];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  registros: any[] = [];
  pagina: number = 1;
  total: number = 0;
  count: number = 5;
  valores: any[] = [];
  paginas: number = 0;
  ngVariable = "Registro de movimiento de empleados";
  pathImage: String;
  constructor(public AppGeneric: AppGeneric, private pagerService: PagerService,private router: Router
  ) {

  }


  download(): void {
    const elementToPrint = document.getElementById('test');
    let pdf = new jsPDF('l', 'pt', 'a4');
    let options = {
      pagesplit: true
    };

    pdf.save("test.pdf");

  }

  /*public download() {

    var doc = new jsPDF();
    doc.text(20, 20, 'Reporte de Empleados');
    doc.text(20, 30, 'Pagina 1');
    doc.addPage();
    doc.text(20, 20, 'Pagina 2');

    doc.open();
    // Save the PDF
    doc.save('Test.pdf');
  }*/

  ngOnInit() {
     let login =  localStorage.getItem('id_token');
    if (login == '1') {
      this.getData();
    } else {
      this.router.navigate(['/login']);
    }

    
  }
  public getData() {
    this.blockUI.start("espere...");
    this.AppGeneric.list("registro").subscribe(data => {      
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

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.count);
    // get current page of items
    //this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.valores = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  public cambioPagina(valor: number) {
    this.ngVariable = "Pagina: " + this.pagina;
    if (valor == 1 && this.pagina < this.total / this.count)
      this.pagina++;
    else if (this.pagina > 1 && valor == -1)
      this.pagina--;
    this.updatePage();
  }

  public updatePage() {
    
    this.paginas = parseInt((this.total / this.count).toString()) + 1;
    /*for (let i = 2; i <= this.total / this.count; i++) {
      this.paginas.push(i);
    }*/
    this.ngVariable = "Pagina: " + this.pagina;
    this.valores = [];
    this.AppGeneric.listPage("registros", this.count, this.pagina).subscribe(data => {
      let registros: any = data;
      this.registros = registros;
      this.registros.forEach(r => this.valores.push(
        {
          registro: r, select: false
        }
      ));
      this.blockUI.stop();
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

  public setPathImage(image: String) {
    this.pathImage = image;
  }

}

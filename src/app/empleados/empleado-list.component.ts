// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppGeneric } from '../../providers/app.generic';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PagerService } from '../../providers/PagerService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  templateUrl: './empleados-list.html',
  providers: [AppGeneric],
  styleUrls: ['./empleados.css']
})
export class EmpleadoListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  private allItems: any[] = [];
  pager: any = {};
  pagedItems: any[];

  empleado: any = {};
  cedula: string = "";
  fecha_nacimiento: string;
  telefono: string;
  area: number;
  ruta_foto: File;

  empleados: any[] = [];
  ngVariable = "";
  pagina: number = 1;
  total: number = 0;
  count: number = 5;
  valores: any[] = [];
  file: File;
  horariosDisponibles: any[] = [];
  horariosEmpleado: any[] = [];
  horarioObj: any;
  horariosAll: any[] = [];

  horariosEdit: any[] = [];
  horarioGuardar: any[] = [];
  horarioEditar: any[] = [];
  editarElemento: boolean = true;
  guardarElemento: boolean;
  generos: string[] = ['Masculino', 'Femenino', 'Otro'];
  areas: any[] = [];

  public items: any[];
  error: any;
  private selectedId: number;
  operacion: any;
  query: string = '';



  formErrors = {
    'cedula': '',
    'nombres': '',
    'apellidos': ''
  };

  validationMessages = {
    'cedula': {
      'required': 'Éste campo es requerido.',
      'minlength': 'La cédula debe tener 10 números.',
      'maxlength': 'La cédula no debe tener más de 10 números.'
    },
    'nombres': {
      'required': 'Éste campo es requerido'
    },
    'apellidos': {
      'required': 'Éste campo es requerido'
    },
    'telefono': {
      'required': 'Éste campo es requerido'
    },
    'area': {
      'required': 'Éste campo es requerido'
    },
    'fecha': {
      'required': 'Éste campo es requerido'
    }

  };

  postForm: FormGroup;


  constructor(public AppGeneric: AppGeneric, private pagerService: PagerService, private router: Router, private fb: FormBuilder) {

  }

  ngOnInit() {

    this.getTotalEmpleados();
    this.getAreas();
    this.getHorariosAll();
    //this.buildForm();   

  }

  // buildForm()
  //   {

  //       this.postForm = this.fb.group({
  //           cedula: [this.empleado.cedula, Validators.compose([

  //               Validators.required,
  //               Validators.minLength(10),                
  //               Validators.maxLength(10)
  //           ])],
  //           nombres: [this.empleado.nombres, Validators.required],
  //           apellidos: [this.empleado.apellidos,Validators.required],
  //           genero: [this.empleado.genero,Validators.required],
  //           telefono: [this.empleado.telefono,Validators.required],
  //            area: [this.empleado.area,Validators.required],
  //            fecha: [this.empleado.fecha,Validators.required],
  //            foto: [this.empleado.foto,Validators.nullValidator]
  //       });


  //       this.postForm.valueChanges.subscribe(
  //           data => this.onValueChanged(data)
  //       );

  //       this.onValueChanged();
  //   }


  //       onValueChanged(data?: any)
  //   {
  //       if (!this.postForm) {
  //           return;
  //       }
  //       //console.log(data);
  //       this.empleado = data;
  //       const form = this.postForm;
  //       for (const field in this.formErrors)
  //       {

  //           this.formErrors[field] = '';
  //           const control = form.get(field);
  //           if (control && control.dirty && !control.valid) {
  //               const messages = this.validationMessages[field];
  //               for (const key in control.errors) {
  //                   this.formErrors[field] += messages[key] + ' ';
  //               }
  //           }
  //       }
  //   }




  public getData() {
    this.blockUI.start("espere...");
    this.AppGeneric.list("persona").subscribe((data: any) => {
      this.allItems = data;
      this.total = data.length;
      this.setPage(1);
      this.blockUI.stop();
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

  // -------------Total empleados-----------------
  public getTotalEmpleados() {
    this.AppGeneric.list("persona").subscribe((data: any) => {
      this.total = data.length;
      this.getData();
    },
      error => {
        console.error("Error obteniendo total empleados" + error)
      }
    )
  }

  // ------------------------------

  public getAreas() {

    this.AppGeneric.list("area").subscribe((data: any) => {
      //let areas: any = data
      this.areas = data;
    }
    );

  }

  // ------------------------------
  public editarEmpleado(empleado: any) {

    this.empleado = empleado;
    this.area = this.empleado.area;
    //this.getHorariosEmpleado(this.empleado.id);
  }
  // ------------------------------
  public editarHorario(empleado: any) {
    this.empleado = empleado;
    this.getHorariosEmpleado(this.empleado.id);
  }
  // ------------------------------
  public reporteRegistros(empleado: any) {
    this.router.navigate(['/reportes', empleado]);
  }
  public reporteMultas(empleado: any) {
    this.router.navigate(['/reportMultas', empleado]);
  }
  // ------------HORARIOS------------------
  public getHorariosEmpleado(empleado: any) {

    this.AppGeneric.getDataId("horariosEmpleados", empleado).subscribe(data => {
      this.horariosEmpleado = data;
      this.horariosAll = [];
      let encontrado = false;
      let miHorario: any;

      for (let horarioDisp of this.horariosDisponibles) {
        encontrado = false;
        for (let j = 0; j < this.horariosEmpleado.length; j++) {

          if (horarioDisp.id === this.horariosEmpleado[j].horarioSistema) {
            miHorario = horarioDisp;
            encontrado = true;
          }
        }
        if (encontrado === false)
          this.horarioObj = { h: horarioDisp, select: false };
        else
          this.horarioObj = { h: miHorario, select: true };

        this.horariosAll.push(this.horarioObj);
      }
    });
  }

  // ------------------------------
  public onUpload(event: any) {
    this.file = event.srcElement.files[0];
  }

  // ------------------------------
  public nuevo() {
    this.empleado = {};
  }
  // ------------------------------
  // cancela guardar o editar empleado 
  public cancelar() {
    this.horarioGuardar = [];

  }

  // ------------------------------
  public guardar() {

    // this.empleado.area = this.area;
    this.AppGeneric.setEmpleado(this.empleado, this.file)
      .subscribe(() => {
        this.ngOnInit();
      }

      );
  }

  // ------------------------------

  // public onChange() {
  //   this.pagina = 1;
  //   this.ngVariable = "Pagina: " + this.pagina;
  //   this.AppGeneric.listPage("empleados",this.count, this.pagina)
  //   .subscribe(data => {
  //       let empleados:any = data;
  //      this.items = empleados;
  //     },
  //     error => {
  //       console.error("Error al cambiar página!" + error)
  //     }
  //   );
  // }
  // ------------------------------


  // ------------------------------
  // public cambioPagina(valor:number) {
  //   this.ngVariable = "Pagina: " + this.pagina;
  //   if (valor == 1 && this.pagina < this.total / this.count)
  //     this.pagina++;
  //   else if (this.pagina > 1 && valor == -1)
  //     this.pagina--;
  //   this.ngVariable = "Pagina: " + this.pagina;
  //   this.AppGeneric.listPage('empleados',this.count, this.pagina)
  //     .subscribe(data => {
  //       let datos: any = data;
  //       this.items = datos;
  //     },
  //     error => {
  //       console.error("Error al cambiar página!" + error)
  //     }
  //   );
  // }

  // ------------------------------
  public guardarHorariosAll() {
    if (this.guardarElemento) {
      console.log(this.horarioGuardar);
      for (let horario of this.horarioGuardar) {
        this.AppGeneric.save(horario, "horarioEmpleado").subscribe(() => { return true; });
      }
      this.horarioGuardar = [];
    }
  }
  // ------------------------------
  public editHorario(horario: any) {

    let horarioObj: any;
    let nuevo: boolean;
    nuevo = horario.select ? false : true;
    if (horario.select && !nuevo) {
      let quitarElemento = false;
      let horarioSistema: any;
      horario.select = false;
      for (let horarioEmp of this.horariosEmpleado) {
        if (horarioEmp.horarioSistema === horario.h.id) {
          this.editarElemento = true;
          //console.log("editar");
          // this.guardarElemento = false;
          // this.horariosEdit.push(horarioEmp);
          this.AppGeneric.delete(horarioEmp, "horarioEmpleado").subscribe(() => { return true; });

        } else {
          quitarElemento = true;

        }
      }

      if (quitarElemento)
        this.deleteHorario(horario);

    } else {
      this.editarElemento = false;
      this.guardarElemento = true;
      horario.select = true;
      horarioObj = {
        estado: horario.select,
        fecha_inicio: null,
        fecha_fin: null,
        persona: this.empleado.id,
        horarioSistema: horario.h.id
      };
      this.horarioGuardar.push(horarioObj);
    }
  }

  // ------------------------------
  public deleteHorario(horario: any) {
    var start_index = this.horarioGuardar.findIndex(horarioG => horarioG.horarioSistema == horario.h.id);
    var number_of_elements_to_remove = 1;
    if (start_index >= 0)
      this.horarioGuardar.splice(start_index, number_of_elements_to_remove);

  }

  // ------------------------------
  public getHorariosAll() {

    this.AppGeneric.list('horario').subscribe((horarios: any) => {
      this.horariosDisponibles = horarios;
    },
      error => {
        console.error("Error obteniendo horarios!" + error)

      }
    );
  }

  // ------------------------------


  public getItems(ev: any) {
    let val = ev.target.value;
    if (val == " " || val == null || val == undefined || val == "") {
      val = "";
      this.getData();
    }
    if (val && val.trim() != '') {
      //let total_empleados : any;

      console.log(this.valores);
      this.valores = [];
      this.AppGeneric.listPage("empleados", this.total, 1)
        .subscribe((empleados: any) => {
          this.valores = empleados.filter((item: any) => {

            console.log(this.valores);
            console.log(item);

            return item.nombres.toLowerCase().indexOf(val.toLowerCase()) > -1;

          });


        });






    }
  }
  // ------------------------------

  filter() {
    if (this.query !== "") {
      this.valores = [];
      this.allItems.filter(function (el: any) {
        if( el.nombres.toLowerCase().indexOf(this.query.toLowerCase()) > -1){
          this.valores.push(el);
        }
      }.bind(this));

    } else {
      this.setPage(1);
     }

  }





}

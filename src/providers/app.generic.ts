import { Injectable } from '@angular/core';
import { URLSearchParams, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as ns from "../constantes/constants";
import 'rxjs/add/operator/toPromise';
import { Constants } from '../constantes/constants';
//import {Observable} from "rxjs/Rx";

import { AreaListComponent } from 'app/areas/area-list.component';

@Injectable()
export class AppGeneric {
  //public items: Promise<any>;
  public data:any;
  public name: any;
  public entity: String;
  private authorization = '';
  constructor(private http: Http) {
  }
  // -----------------------------------
  public list(entity: String): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.set('Access-Control-Allow-Origin','*');
    headers.set('Authorization', this.authorization);
    return this.http.get(Constants.SERVER_IP + '/api/rest/' + entity + '/', headers)
      .map(res => res.json());
      
  }
  // -----------------------------------
  public listPage(entity: String, count, page): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.set('Authorization', this.authorization);
    return this.http.get(Constants.SERVER_IP + '/api/rest/' + entity + '/' + count + '/' + page+'/', headers)
      .map(res => res.json());
  }
  // -----------------------------------
  public listPageP(entity: String, id, user, clave, rol) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.set('Authorization', this.authorization);
    return this.http.get(Constants.SERVER_IP + '/api/rest/' + entity + '/' + id + '/' + user + '/' + clave+'/'+ rol+'/', headers)
      .map(res => res.json());
  }

  public listPageM(entity: String, rol, nombre, menus) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.set('Authorization', this.authorization);
    return this.http.get(Constants.SERVER_IP + '/api/rest/' + entity + '/' + rol + '/' + nombre + '/' + menus +'/', headers)
      .map(res => res.json());
  }

  // -----------------------------------
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  // -----------------------------------
  public getDataId(entity: String, id) {
    return this.http.get(Constants.SERVER_IP + '/api/rest/' + entity + '/' + id + '/')
      .map(res => res.json());
  }
  
  public getDataIdFechas(entity: String, id, desde,hasta) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.set('Access-Control-Allow-Origin','*');
    headers.set('Authorization', this.authorization);    
    let newDateI = new Date(desde+" 00:00:00");
    let newDateF = new Date(hasta+" 00:00:00");
    return this.http.get(Constants.SERVER_IP + '/api/rest/' + entity + '/' + id + '/' + newDateI.getFullYear() 
    + '/' + (newDateI.getMonth()+1) + '/' + newDateI.getUTCDate() + '/' + newDateF.getFullYear() + '/' + (newDateF.getMonth()+1)
    + '/' + newDateF.getUTCDate() + '/',headers)
      .map(res => res.json());
  }  
  // ------------------Save-----------------
  save(dato: any, entity: String): Observable<Response> {
    let body = JSON.stringify(dato);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
     
    let repos = this.http.post(Constants.SERVER_IP + '/api/rest/' + entity + '/', body, options)
      .map(res => res.json());
    return repos;
    }

  // ---------------save---------------------
   public setEmpleado(empleado:any, file:File) {
    let body = JSON.stringify(empleado);
    let headers = new Headers();//{'Content-Type': 'application/json'});
    let formData:FormData = new FormData();
    if (file != undefined)
      formData.append("ruta_foto", file);
    if (empleado !== "" && empleado !== undefined && empleado !== null) {
      for (var property in empleado) {
        if (empleado.hasOwnProperty(property) && empleado[property] != undefined && empleado[property] != null && property != "ruta_foto") {
          formData.append(property, empleado[property]);
        }
      }
    }

    let options = new RequestOptions({headers: headers});
    let repos:any = {};
    if (empleado.id == undefined)
      repos = this.http.post(Constants.SERVER_IP + '/api/rest/persona/', formData, options)
        .map(res => res.json());
    else
      repos = this.http.put(Constants.SERVER_IP + '/api/rest/persona/' + empleado.id + '/', formData, options)
        .map(res => res.json());

    return repos;
  }

  // ----------------udate-------------------
  update(dato: any, entity: String): Observable<Response> {
    let body = JSON.stringify(dato);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(Constants.SERVER_IP + '/api/rest/' + entity + '/' + dato.id + '/', body, options)
      .map(res => res.json());

  }
  // -------------------delete----------------
  delete(dato: any,entity:String): Observable<Response> {
  
   let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(Constants.SERVER_IP + '/api/rest/' + entity + '/' + dato.id + '/', options)
    .map((res) => res.json())
  }

  public updateRegistros(registros:any, persona:number, operacion:number) {
    return this.data = this.http.get(Constants.SERVER_IP + '/api/rest/registrosUpdate/' + registros + '/' + persona + '/' + operacion + '/')
      .map(res => res.json());
  }

}

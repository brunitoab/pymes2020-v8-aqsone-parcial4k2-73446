import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Presupuesto } from "../models/presupuesto";

@Injectable({
  providedIn: "root",

})
export class PresupuestoService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    // la barra al final del resourse url es importante para los metodos que concatenan el id del recurso (GetById, Put)
    this.resourceUrl = "https://pavii.ddns.net/api/presupuestos";
  
  }
  get() {
    return this.httpClient.get(this.resourceUrl);
  }
  post(obj:Presupuesto) {
    return this.httpClient.post(this.resourceUrl, obj);
  }
  put(Id: number, obj:Presupuesto) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }
}
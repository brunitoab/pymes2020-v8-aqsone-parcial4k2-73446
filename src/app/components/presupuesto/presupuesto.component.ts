import { Component, OnInit } from "@angular/core";
import { Presupuesto } from "../../models/presupuesto";
import { MockArticulosFamiliasService } from "../../services/mock-articulos-familias.service";
import { PresupuestoService } from "../../services/presupuesto.service";
 
@Component({
  selector: "app-presupuesto",
  templateUrl: "./presupuesto.component.html",
  styleUrls: ["./presupuesto.component.css"]
})
export class PresupuestoComponent implements OnInit {
  Titulo = "Presupuesto";
  Items: Presupuesto[] = [];
 
  constructor(
    private presupuestoService:  PresupuestoService
    //private articulosFamiliasService:  MockArticulosFamiliasService
  ){}
 
  ngOnInit() {
    this.GetPresupuesto();
  }
 
  GetPresupuesto() {
    this.presupuestoService.get()
    .subscribe((res:Presupuesto[]) => {
      this.Items = res;
    });
  }
}
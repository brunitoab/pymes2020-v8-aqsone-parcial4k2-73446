import { Component, OnInit } from "@angular/core";
import { Presupuesto } from "../../models/presupuesto";
import { MockArticulosFamiliasService } from "../../services/mock-articulos-familias.service";
import { PresupuestoService } from "../../services/presupuesto.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
 
@Component({
  selector: "app-presupuesto",
  templateUrl: "./presupuesto.component.html",
  styleUrls: ["./presupuesto.component.css"]
})
export class PresupuestoComponent implements OnInit {
  Titulo = "Presupuesto";


  TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };
  AccionABMC = "L"; 

  submitted = false;

  Items: Presupuesto[] = [];

  FormReg: FormGroup;
 
  constructor(
    private presupuestoService:  PresupuestoService,
    public formBuilder: FormBuilder
    //private articulosFamiliasService:  MockArticulosFamiliasService
  ){}
 
  ngOnInit() {
    this.GetPresupuesto();
    this.FormReg = this.formBuilder.group({
      IdPresupuesto: [0],

      PresupuestoDescripcion: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(55)]
      ],

      PresupuestoImporte: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],

  
    });
  }
  
 
  GetPresupuesto() {
    this.presupuestoService.get()
    .subscribe((res:Presupuesto[]) => {
      this.Items = res;
    });
  }
  Agregar() {
    this.AccionABMC = "A";
    //this.FormReg.reset(this.FormReg.value);
    this.FormReg.reset();
    //this.FormReg.controls['IdEmpresa'].setValue(0);

    this.submitted = false;
    //this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
  }
  Cancelar() {
    this.AccionABMC = "L";
    this.submitted = false;

    this.GetPresupuesto();
  }
  Grabar() {

    this.submitted = true;

    // verificar que los validadores esten OK
     if (this.FormReg.invalid) {
      window.alert("Revisar Datos");
      return;
    }

    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };

   

    // agregar post
    if (itemCopy.IdPresupuesto == 0 || itemCopy.IdPresupuesto == null) {
      itemCopy.IdPresupuesto = 0;
      console.log(itemCopy);
      this.presupuestoService.post(itemCopy).subscribe((res: any) => {

        this.Cancelar();
        window.alert("Registro grabado");
        // this.modalDialogService.Alert('Registro agregado correctamente.');
        // this.Buscar();
      });
    } else {
      // modificar put
      this.presupuestoService
        .put(itemCopy.IdPresupuesto, itemCopy)
        .subscribe((res: any) => {
          this.Cancelar();
          window.alert("Registro modificado");
        });
    }

    this.GetPresupuesto();
  }
}
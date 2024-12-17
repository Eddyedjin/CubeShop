import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IOrdenCompras } from '../model/IOrdenCompras';
import { OrdenServiceService } from '../orden-service.service';

@Component({
  selector: 'app-orden-add',
  templateUrl: './orden-add.page.html',
  styleUrls: ['./orden-add.page.scss'],
})

export class OrdenAddPage implements OnInit {
  ordenForm!: FormGroup;

  // Definimos el objeto sucursal pero no lo inicializamos hasta que el formulario se envíe
  orden: IOrdenCompras = {} as IOrdenCompras;

  today: string;

  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: OrdenServiceService,
    private router: Router,) {
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
     }

  ngOnInit() {
    // Especificamos que todos los campos son obligatorios
    this.orden = {
      proveedor:'',
      fecha_Orden:'',
      cantidad: 0,
      precioUnitario: 0,
      total: 0,
      id_producto:'7VupImTwzjnXf7aaWnFF', //valor por defecto
      id_usuario:'0nE6MnsjzluvrTAZR3m5', //valor por defecto

    };

    this.ordenForm = this.formBuilder.group({
      oc_proveedor: [this.orden.proveedor, Validators.required],
      oc_fecha_Orden: [this.orden.fecha_Orden, Validators.required],
      oc_cantidad: [this.orden.cantidad, Validators.required],
      oc_precioUnitario: [this.orden.precioUnitario, Validators.required],
      oc_total: [this.orden.total, Validators.required],
      oc_id_producto: [this.orden.id_producto, Validators.required],
      oc_id_usuario: [this.orden.id_usuario, Validators.required],
    });
  }

  async onFormSubmit() {
    console.log("onFormSubmit del oferta ADD");

    // Asignamos los valores del formulario al objeto orden de compra
    this.orden = {
      proveedor: this.ordenForm.value.oc_proveedor,
      fecha_Orden:this.ordenForm.value.oc_fecha_Orden,
      cantidad:this.ordenForm.value.oc_cantidad,
      precioUnitario:this.ordenForm.value.oc_precioUnitario,
      total:this.ordenForm.value.oc_total,
      id_producto:this.ordenForm.value.oc_id_producto,
      id_usuario:this.ordenForm.value.oc_id_usuario,
    };

    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    await loading.present();

    try {
      await this.restApi.addOrden(this.orden);
      console.log("Orden agregada con éxito");
      loading.dismiss();
      this.router.navigate(['/orden-list']);
    } catch (error) {
      console.error("Error al agregar la orden de compra:", error);
      loading.dismiss();
    }

    
  
  }

}

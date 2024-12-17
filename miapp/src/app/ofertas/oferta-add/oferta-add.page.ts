import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IOfertas } from '../model/IOfertas';
import { OfertaServiceService } from '../oferta-service.service';

@Component({
  selector: 'app-oferta-add',
  templateUrl: './oferta-add.page.html',
  styleUrls: ['./oferta-add.page.scss'],
})
export class OfertaAddPage implements OnInit {
  ofertaForm!: FormGroup;

  // Definimos el objeto sucursal pero no lo inicializamos hasta que el formulario se envíe
  oferta: IOfertas = {} as IOfertas;

  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: OfertaServiceService,
    private router: Router,) { }

  ngOnInit() {
    // Especificamos que todos los campos son obligatorios
    this.oferta = {
      nombre:'',
      descuento:0 ,
      fechaInicio:'',
      fechaFin:'' ,
      id_producto:'7VupImTwzjnXf7aaWnFF', //valor por defecto
    };

    this.ofertaForm = this.formBuilder.group({
      of_nombre: [this.oferta.nombre, Validators.required],
      of_descuento: [this.oferta.descuento, Validators.required],
      of_fechaInicio: [this.oferta.fechaInicio, Validators.required],
      of_fechaFin: [this.oferta.fechaFin, Validators.required],
      of_id_producto: [this.oferta.id_producto, Validators.required],
    });
  }

  async onFormSubmit() {
    console.log("onFormSubmit del oferta ADD");

    // Asignamos los valores del formulario al objeto imagen
    this.oferta = {
      nombre: this.ofertaForm.value.of_nombre,
      descuento:this.ofertaForm.value.of_descuento,
      fechaInicio:this.ofertaForm.value.of_fechaInicio,
      fechaFin:this.ofertaForm.value.of_fechaFin,
      id_producto:this.ofertaForm.value.of_id_producto,
    };

    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    await loading.present();

    try {
      await this.restApi.addOferta(this.oferta);
      console.log("Oferta agregada con éxito");
      loading.dismiss();
      this.router.navigate(['/oferta-list']);
    } catch (error) {
      console.error("Error al agregar la imagen:", error);
      loading.dismiss();
    }
  }

}
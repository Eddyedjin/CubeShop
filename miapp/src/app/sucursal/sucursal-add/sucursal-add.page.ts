import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { SucursalServiceService } from '../sucursal-service.service';
import { ISucursales } from '../model/ISucursales';

@Component({
  selector: 'app-sucursal-add',
  templateUrl: './sucursal-add.page.html',
  styleUrls: ['./sucursal-add.page.scss'],
})
export class SucursalAddPage implements OnInit {
  sucursalForm!: FormGroup;

  // Definimos el objeto sucursal pero no lo inicializamos hasta que el formulario se envíe
  sucursal: ISucursales = {} as ISucursales;

  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: SucursalServiceService,
    private router: Router,) { }

  ngOnInit() {
    // Especificamos que todos los campos son obligatorios
    this.sucursal = {
      nombre:'',
      id_direccion:'LWRCUxcC2v9fKU0WZS6P' // Valor por defecto
    };

    this.sucursalForm = this.formBuilder.group({
      suc_name: [this.sucursal.nombre, Validators.required],
      suc_id_direccion: [this.sucursal.id_direccion, Validators.required],
    });
  }

  async onFormSubmit() {
    console.log("onFormSubmit del Sucursal ADD");

    // Asignamos los valores del formulario al objeto sucursal
    this.sucursal = {
      nombre: this.sucursalForm.value.suc_name,
      id_direccion: this.sucursalForm.value.suc_id_direccion,
      
    };

    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    await loading.present();

    try {
      await this.restApi.addSucursal(this.sucursal);
      console.log("Sucursal agregada con éxito");
      loading.dismiss();
      this.router.navigate(['/sucursal-list']);
    } catch (error) {
      console.error("Error al agregar la sucursal:", error);
      loading.dismiss();
    }
  }

}
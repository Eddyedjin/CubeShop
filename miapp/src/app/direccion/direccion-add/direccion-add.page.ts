import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { DireccionServiceService } from '../direccion-service.service';
import { IDirecciones } from '../model/IDirecciones';


@Component({
  selector: 'app-direccion-add',
  templateUrl: './direccion-add.page.html',
  styleUrls: ['./direccion-add.page.scss'],
})
export class DireccionAddPage implements OnInit {
  direccionForm!: FormGroup;
  // Definimos el objeto direccion pero no lo inicializamos hasta que el formulario se envíe
  direccion: IDirecciones = {} as IDirecciones;


  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: DireccionServiceService,
    private router: Router,) { }

  ngOnInit() {
    this.direccion = {
      region: '',
      comuna: '',
      calle: '',
      piso: '',
      apartamento: ''
    };

    this.direccionForm = this.formBuilder.group({
      "direc_region": [this.direccion.region, Validators.required],
      'direc_comuna': [this.direccion.comuna, Validators.required],
      'direc_calle': [this.direccion.calle, Validators.required],
      'direc_piso': [this.direccion.piso, Validators.required],
      'direc_apartamento': [this.direccion.apartamento, Validators.required]
      
    });
  
  }

  async onFormSubmit() {
    console.log("onFormSubmit del Direccion ADD");

    // Asignamos los valores del formulario al objeto direccion
    this.direccion = {
      region: this.direccionForm.value.direc_region,
      comuna: this.direccionForm.value.direc_comuna,
      calle: this.direccionForm.value.direc_calle,
      piso: this.direccionForm.value.direc_piso,
      apartamento: this.direccionForm.value.direc_apartamento,
    };

    // Creamos un Loading Controller, Ojo no lo muestra
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });

    // Muestra el Loading Controller
    await loading.present();

    try{
      await this.restApi.addDireccion(this.direccion)

      console.log("Direccion agregado con éxito");
      loading.dismiss();

      this.router.navigate(['/direccion-list']);

    }catch (error) {
      console.error("Error al agregar la direccion", error);
        loading.dismiss(); //Elimina la espera

    }
  }
    
}

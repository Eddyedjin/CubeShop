import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { IImagenes } from '../model/IImagenes';
import { ImagenServiceService } from '../imagen-service.service';


@Component({
  selector: 'app-imagen-add',
  templateUrl: './imagen-add.page.html',
  styleUrls: ['./imagen-add.page.scss'],
})
export class ImagenAddPage implements OnInit {
  imagenForm!: FormGroup;

  // Definimos el objeto sucursal pero no lo inicializamos hasta que el formulario se envíe
  imagen: IImagenes = {} as IImagenes;

  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: ImagenServiceService,
    private router: Router,) { }

  ngOnInit() {
    // Especificamos que todos los campos son obligatorios
    this.imagen = {
      nombre:'',
      ruta:'assets/Placeholder/productos/cuboRubik3x3.png' // Valor por defecto
    };

    this.imagenForm = this.formBuilder.group({
      img_name: [this.imagen.nombre, Validators.required],
      img_ruta: [this.imagen.ruta, Validators.required],
    });
  }

  async onFormSubmit() {
    console.log("onFormSubmit del Imagen ADD");

    // Asignamos los valores del formulario al objeto imagen
    this.imagen = {
      nombre: this.imagenForm.value.img_name,
      ruta: this.imagenForm.value.img_ruta,
      
    };

    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    await loading.present();

    try {
      await this.restApi.addImagen(this.imagen);
      console.log("Imagen agregada con éxito");
      loading.dismiss();
      this.router.navigate(['/imagen-list']);
    } catch (error) {
      console.error("Error al agregar la imagen:", error);
      loading.dismiss();
    }
  }

}
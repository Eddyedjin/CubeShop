import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IImagenes } from '../model/IImagenes';
import { ImagenServiceService } from '../imagen-service.service';

@Component({
  selector: 'app-imagen-edit',
  templateUrl: './imagen-edit.page.html',
  styleUrls: ['./imagen-edit.page.scss'],
})
export class ImagenEditPage implements OnInit {
  imagenForm!: FormGroup;
  imagen: IImagenes = {
    id: '',
    nombre: '',
    ruta:''
  };
  id: string = '';

  constructor(
    public restApi: ImagenServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getImagen();
    } else {
      console.error('No ID found in route params');
    }

    this.imagenForm = this.formBuilder.group({
      img_nombre: ['', Validators.required],
      img_ruta: ['', Validators.required],
    });
  }

  getImagen() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    console.log("ID capturado:", id); // Para depuración

    if (id) {
      this.restApi.getImagenId(id).subscribe({
        next: (res: IImagenes | undefined) => {
          if (res) {
            this.imagen = res; // Asigna el resultado a imagen
            this.imagen.id = id; // Asegúrate de asignar el ID aquí si no está incluido en el objeto
            this.imagenForm.setValue({
              img_nombre: this.imagen.nombre,
              img_ruta: this.imagen.ruta,
            });
      
          } else {
            console.warn("Imagen no encontrada");
          }
        },
        error: (err) => {
          console.error("Error al obtener la imagen:", err);
        }
      });
    } else {
      console.warn("ID no encontrado en la ruta");
    }
    
  }

  async onFormSubmit() {
    if (this.imagenForm.valid) {
      this.imagen.id = this.id;
      this.imagen.nombre = this.imagenForm.value.img_nombre;
      this.imagen.ruta = this.imagenForm.value.img_ruta;
      

      try {
        await this.restApi.updateImagen(this.id, this.imagen);
        this.router.navigate(['/imagen-list']);
      } catch (error) {
        console.error("Error updating imagen", error);
      }
    } else {
      console.error("Form is not valid");
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IOfertas } from '../model/IOfertas';
import { OfertaServiceService } from '../oferta-service.service';

@Component({
  selector: 'app-oferta-edit',
  templateUrl: './oferta-edit.page.html',
  styleUrls: ['./oferta-edit.page.scss'],
})
export class OfertaEditPage implements OnInit {
  ofertaForm!: FormGroup;
  oferta: IOfertas = {
    id: '',
    nombre: '',
    descuento:0,
    fechaInicio:'',
    fechaFin:'',
    id_producto:'',
  };
  id: string = '';

  constructor(
    public restApi: OfertaServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getOferta();
    } else {
      console.error('No ID found in route params');
    }

    this.ofertaForm = this.formBuilder.group({
      of_nombre: ['', Validators.required],
      of_descuento: [0, Validators.required],
      of_fechaInicio: ['', Validators.required],
      of_fechaFin: ['', Validators.required],
      of_id_producto: ['', Validators.required],
    });
  }

  getOferta() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    console.log("ID capturado:", id); // Para depuración

    if (id) {
      this.restApi.getOfertasId(id).subscribe({
        next: (res: IOfertas | undefined) => {
          if (res) {
            this.oferta = res; // Asigna el resultado a oferta
            this.oferta.id = id; // Asegúrate de asignar el ID aquí si no está incluido en el objeto
            this.ofertaForm.setValue({
              of_nombre: this.oferta.nombre,
              of_descuento: this.oferta.descuento,
              of_fechaInicio: this.oferta.fechaInicio,
              of_fechaFin: this.oferta.fechaFin,
              of_id_producto: this.oferta.id_producto,
            });
      
          } else {
            console.warn("oferta no encontrada");
          }
        },
        error: (err) => {
          console.error("Error al obtener la oferta:", err);
        }
      });
    } else {
      console.warn("ID no encontrado en la ruta");
    }
    
  }

  async onFormSubmit() {
    if (this.ofertaForm.valid) {
      this.oferta.id = this.id;
      this.oferta.nombre = this.ofertaForm.value.of_nombre;
      this.oferta.descuento = this.ofertaForm.value.of_descuento;
      this.oferta.fechaInicio = this.ofertaForm.value.of_fechaInicio;
      this.oferta.fechaFin = this.ofertaForm.value.of_fechaFin;
      this.oferta.id_producto = this.ofertaForm.value.of_id_producto;
      

      try {
        await this.restApi.updateOferta(this.id, this.oferta);
        this.router.navigate(['/oferta-list']);
      } catch (error) {
        console.error("Error updating oferta", error);
      }
    } else {
      console.error("Form is not valid");
    }
  }
}
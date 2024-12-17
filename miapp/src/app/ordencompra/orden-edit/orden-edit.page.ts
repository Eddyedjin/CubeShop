import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IOrdenCompras } from '../model/IOrdenCompras';
import { OrdenServiceService } from '../orden-service.service';


@Component({
  selector: 'app-orden-edit',
  templateUrl: './orden-edit.page.html',
  styleUrls: ['./orden-edit.page.scss'],
})
export class OrdenEditPage implements OnInit {
  ordenForm!: FormGroup;
  orden: IOrdenCompras = {
    id: '',
    proveedor: '',
    fecha_Orden:'',
    cantidad: 0,
    precioUnitario: 0,
    total: 0,
    id_producto:'',
    id_usuario:'',
  };
  id: string = '';

  constructor(
    public restApi: OrdenServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getOrden();
    } else {
      console.error('No ID found in route params');
    }

    this.ordenForm = this.formBuilder.group({
      oc_proveedor: ['', Validators.required],
      oc_fecha_Orden: [0, Validators.required],
      oc_cantidad: ['', Validators.required],
      oc_precioUnitario: ['', Validators.required],
      oc_total: ['', Validators.required],
      oc_id_producto: ['', Validators.required],  
      oc_id_usuario: ['', Validators.required],
    });
  }

  getOrden() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    console.log("ID capturado:", id); // Para depuración

    if (id) {
      this.restApi.getOrdenId(id).subscribe({
        next: (res: IOrdenCompras | undefined) => {
          if (res) {
            this.orden = res; // Asigna el resultado a orden de compra
            this.orden.id = id; // Asegúrate de asignar el ID aquí si no está incluido en el objeto
            this.ordenForm.setValue({
              oc_proveedor: this.orden.proveedor,
              oc_fecha_Orden: this.orden.fecha_Orden,
              oc_cantidad: this.orden.cantidad,
              oc_precioUnitario: this.orden.precioUnitario,
              oc_total: this.orden.total,
              oc_id_producto: this.orden.id_producto,
              oc_id_usuario: this.orden.id_usuario,
            });
      
          } else {
            console.warn("orden de compra no encontrada");
          }
        },
        error: (err) => {
          console.error("Error al obtener la orden de compra:", err);
        }
      });
    } else {
      console.warn("ID no encontrado en la ruta");
    }
    
  }

  async onFormSubmit() {
    if (this.ordenForm.valid) {
      this.orden.id = this.id;
      this.orden.proveedor = this.ordenForm.value.oc_proveedor;
      this.orden.fecha_Orden = this.ordenForm.value.oc_fecha_Orden;
      this.orden.cantidad = this.ordenForm.value.oc_cantidad;
      this.orden.precioUnitario = this.ordenForm.value.oc_precioUnitario;
      this.orden.total = this.ordenForm.value.oc_total;
      this.orden.id_producto = this.ordenForm.value.oc_id_producto;
      this.orden.id_usuario = this.ordenForm.value.oc_id_usuario;
 
      try {
        await this.restApi.updateOrden(this.id, this.orden);
        this.router.navigate(['/orden-list']);
      } catch (error) {
        console.error("Error updating orden", error);
      }
    } else {
      console.error("Form is not valid");
    }
  }
}

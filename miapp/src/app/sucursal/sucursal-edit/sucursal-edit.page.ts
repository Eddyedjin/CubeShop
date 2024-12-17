import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ISucursales } from '../model/ISucursales';
import { SucursalServiceService } from '../sucursal-service.service';

@Component({
  selector: 'app-sucursal-edit',
  templateUrl: './sucursal-edit.page.html',
  styleUrls: ['./sucursal-edit.page.scss'],
})
export class SucursalEditPage implements OnInit {
  sucursalForm!: FormGroup;
  sucursal: ISucursales = {
    id: '',
    nombre: '',
    id_direccion:''
  };
  id: string = '';

  constructor(
    public restApi: SucursalServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getSucursal();
    } else {
      console.error('No ID found in route params');
    }

    this.sucursalForm = this.formBuilder.group({
      sucu_nombre: ['', Validators.required],
      suc_id_dire: ['', Validators.required],
    });
  }

  getSucursal() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    console.log("ID capturado:", id); // Para depuración

    if (id) {
      this.restApi.getSucursalId(id).subscribe({
        next: (res: ISucursales | undefined) => {
          if (res) {
            this.sucursal = res; // Asigna el resultado a sucursal
            this.sucursal.id = id; // Asegúrate de asignar el ID aquí si no está incluido en el objeto
            this.sucursalForm.setValue({
              sucu_nombre: this.sucursal.nombre,
              suc_id_dire: this.sucursal.id_direccion,
            });
      
          } else {
            console.warn("Sucursal no encontrada");
          }
        },
        error: (err) => {
          console.error("Error al obtener la sucursal:", err);
        }
      });
    } else {
      console.warn("ID no encontrado en la ruta");
    }
    
  }

  async onFormSubmit() {
    if (this.sucursalForm.valid) {
      this.sucursal.id = this.id;
      this.sucursal.nombre = this.sucursalForm.value.sucu_nombre;
      this.sucursal.id_direccion = this.sucursalForm.value.suc_id_dire;
      

      try {
        await this.restApi.updateSucursal(this.id, this.sucursal);
        this.router.navigate(['/sucursal-list']);
      } catch (error) {
        console.error("Error updating sucursal", error);
      }
    } else {
      console.error("Form is not valid");
    }
  }
}
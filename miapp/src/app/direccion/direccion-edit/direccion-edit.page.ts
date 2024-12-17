import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDirecciones } from '../model/IDirecciones';
import { DireccionServiceService } from '../direccion-service.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-direccion-edit',
  templateUrl: './direccion-edit.page.html',
  styleUrls: ['./direccion-edit.page.scss'],
})
export class DireccionEditPage implements OnInit {
  direccionForm!: FormGroup;
  direccion: IDirecciones = {
    id: '',
    region: '',
    comuna: '',
    calle: '',
    piso: '',
    apartamento: '',
  };
  id: string = '';

  constructor(
    public restApi: DireccionServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getDireccion();
    } else {
      console.error('No ID found in route params');
    }

    this.direccionForm = this.formBuilder.group({
      
      direc_region: ['', Validators.required],
      direc_comuna: ['', Validators.required],
      direc_calle: ['', Validators.required],
      direc_piso: ['', Validators.required],
      direc_apartamento: ['', Validators.required]
    });
  }

  getDireccion() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    console.log("ID capturado:", id); // Para depuración

    if(id) {
      this.restApi.getDireccionId(id). subscribe({
        next: (res: IDirecciones | undefined) => {
          if (res) {
            this.direccion = res; // Asigna el resultado a direccion
            this.direccion.id = id; // Asegúrate de asignar el ID aquí si no está incluido en el objeto
            this.direccionForm.setValue({
            direc_region: this.direccion.region,
            direc_comuna: this.direccion.comuna,
            direc_calle: this.direccion.calle,
            direc_piso: this.direccion.piso,
            direc_apartamento: this.direccion.apartamento
            });

          }else {
            console.warn("Direccion no encontrada");
          }
        },
        error: (err) => {
          console.error("Error al obtener la direccion:", err);
        }
      });
    } else {
      console.warn("ID no encontrado en la ruta");
    }
    
  }
  
  async onFormSubmit() {
    if (this.direccionForm.valid) {
      this.direccion.region = this.direccionForm.value.direc_region;
      this.direccion.comuna = this.direccionForm.value.direc_comuna;
      this.direccion.calle = this.direccionForm.value.direc_calle;
      this.direccion.piso = this.direccionForm.value.direc_piso;
      this.direccion.apartamento = this.direccionForm.value.direc_apartamento;
      
      try {
        await this.restApi.updateDireccion(this.id, this.direccion);

        this.router.navigate(['/direccion-list']);
      
      } catch (error) {
        console.error("Error updating direccion", error);
      }
      
       
    } else {
      console.error("Form is not valid");
    }
  }
  
}
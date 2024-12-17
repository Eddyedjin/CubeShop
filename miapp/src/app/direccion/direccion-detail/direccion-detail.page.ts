import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { IDirecciones } from '../model/IDirecciones';
import { DireccionServiceService } from '../direccion-service.service';


@Component({
  selector: 'app-direccion-detail',
  templateUrl: './direccion-detail.page.html',
  styleUrls: ['./direccion-detail.page.scss'],
})
export class DireccionDetailPage implements OnInit {
  direccion: IDirecciones = {} as IDirecciones; // Asegúrate de que este tipo sea correcto

  constructor(
    public restApi: DireccionServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
  ) {}

  ngOnInit() {
    this.getDireccion();
    }

  getDireccion() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    console.log("ID capturado:", id); // Para depuración
  
    if (id) {
      this.restApi.getDireccionId(id).subscribe({
        next: (res: IDirecciones | undefined) => {
          if (res) {
            this.direccion = res; // Asigna el resultado a la direccion
            this.direccion.id = id; // Asegúrate de asignar el ID aquí si no está incluido en el objeto
          } else {
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
  async delete(id: string | undefined) {
    if (!id) {
      console.warn('No se puede eliminar, ID no definido');
      return;  // No hacer nada si id es undefined
    }
    this.presentAlertConfirm(id, 'Confirme la Eliminación, de lo contrario cancele.');
  }
  
  async presentAlertConfirm(id: string, msg: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia!', // Título
      message: msg, // Mensaje
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteConfirmado(id);
          }
        }
      ]
    });
    await alert.present();
  }
  
  async deleteConfirmado(id: string) {
    const loading = await this.loadingController.create({ message: 'Loading...' });
    await loading.present();
  
    this.restApi.deleteDireccionId(id).then(() => {
      loading.dismiss();
      this.router.navigate(['/direccion-list']);
    }).catch((err) => {
      console.log("Error al eliminar la direccion:", err);
      loading.dismiss();
    });
  }


}



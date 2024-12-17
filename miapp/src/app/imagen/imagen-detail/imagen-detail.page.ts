import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { IImagenes } from '../model/IImagenes';
import { ImagenServiceService } from '../imagen-service.service';

@Component({
  selector: 'app-imagen-detail',
  templateUrl: './imagen-detail.page.html',
  styleUrls: ['./imagen-detail.page.scss'],
})
export class ImagenDetailPage implements OnInit {
  imagen: IImagenes = {} as IImagenes; // Asegúrate de que este tipo sea correcto

  constructor(
    public restApi: ImagenServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.getImagen();
  }

  getImagen() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    console.log("ID capturado:", id); // Para depuración
  
    if (id) {
      this.restApi.getImagenId(id).subscribe({
        next: (res: IImagenes | undefined) => {
          if (res) {
            this.imagen = res; // Asigna el resultado a producto
            this.imagen.id = id; // Asegúrate de asignar el ID aquí si no está incluido en el objeto
          } else {
            console.warn("Imagen no encontrado");
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

    this.restApi.deleteImagenID(id).then(() => {
      loading.dismiss();
      this.router.navigate(['/imagen-list']);
    }).catch((err) => {
      console.log("Error al eliminar la imagen:", err);
      loading.dismiss();
    });
  }
}
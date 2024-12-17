import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { OfertaServiceService } from '../oferta-service.service';
import { IOfertas } from '../model/IOfertas';

@Component({
  selector: 'app-oferta-detail',
  templateUrl: './oferta-detail.page.html',
  styleUrls: ['./oferta-detail.page.scss'],
})
export class OfertaDetailPage implements OnInit {
  oferta: IOfertas = {} as IOfertas;

  constructor(
    public restApi: OfertaServiceService,
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
      this.restApi.getOfertasId(id).subscribe({
        next: (res: IOfertas | undefined) => {
          if (res) {
            this.oferta = res; // Asigna el resultado a producto
            this.oferta.id = id; // Asegúrate de asignar el ID aquí si no está incluido en el objeto
          } else {
            console.warn("oferta no encontrado");
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

    this.restApi.deleteOfertaID(id).then(() => {
      loading.dismiss();
      this.router.navigate(['/oferta-list']);
    }).catch((err) => {
      console.log("Error al eliminar la oferta:", err);
      loading.dismiss();
    });
  }
}
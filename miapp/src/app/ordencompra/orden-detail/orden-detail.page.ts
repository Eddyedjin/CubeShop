import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { IOrdenCompras } from '../model/IOrdenCompras';
import { OrdenServiceService } from '../orden-service.service';


@Component({
  selector: 'app-orden-detail',
  templateUrl: './orden-detail.page.html',
  styleUrls: ['./orden-detail.page.scss'],
})
export class OrdenDetailPage implements OnInit {
  orden: IOrdenCompras = {} as IOrdenCompras;

  constructor(
    public restApi: OrdenServiceService,
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
      this.restApi.getOrdenId(id).subscribe({
        next: (res: IOrdenCompras | undefined) => {
          if (res) {
            this.orden = res; // Asigna el resultado a orden
            this.orden.id = id; // Asegúrate de asignar el ID aquí si no está incluido en el objeto
          } else {
            console.warn("orden de compra no encontrado");
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

    this.restApi.deleteOrdenID(id).then(() => {
      loading.dismiss();
      this.router.navigate(['/orden-list']);
    }).catch((err) => {
      console.log("Error al eliminar la orden:", err);
      loading.dismiss();
    });
  }

}

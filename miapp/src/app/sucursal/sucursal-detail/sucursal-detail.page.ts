import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { ISucursales } from '../model/ISucursales';
import { SucursalServiceService } from '../sucursal-service.service';


@Component({
  selector: 'app-sucursal-detail',
  templateUrl: './sucursal-detail.page.html',
  styleUrls: ['./sucursal-detail.page.scss'],
})
export class SucursalDetailPage implements OnInit {
  sucursal: ISucursales = {} as ISucursales; // Asegúrate de que este tipo sea correcto

  constructor(
    public restApi: SucursalServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.getSucursal();
  }

  getSucursal() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    console.log("ID capturado:", id); // Para depuración
  
    if (id) {
      this.restApi.getSucursalId(id).subscribe({
        next: (res: ISucursales | undefined) => {
          if (res) {
            this.sucursal = res; // Asigna el resultado a producto
            this.sucursal.id = id; // Asegúrate de asignar el ID aquí si no está incluido en el objeto
          } else {
            console.warn("Sucursal no encontrado");
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

    this.restApi.deleteSucursalID(id).then(() => {
      loading.dismiss();
      this.router.navigate(['/producto-list']);
    }).catch((err) => {
      console.log("Error al eliminar la sucursal:", err);
      loading.dismiss();
    });
  }
}

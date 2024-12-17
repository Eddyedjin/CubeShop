import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { IUsuario } from '../model/IUsuario';
import { UsuarioServiceService } from '../usuario-service.service';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.page.html',
  styleUrls: ['./usuario-detail.page.scss'],
})
export class UsuarioDetailPage implements OnInit {
  usuario: IUsuario = {} as IUsuario; // Asegúrate de que este tipo sea correcto

  constructor(
    public restApi: UsuarioServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("ID capturado:", id);
  
    if (id) {
      const loading = await this.loadingController.create({ message: 'Cargando...' });
      await loading.present();
  
      this.restApi.getUsuarioId(id).subscribe({
        next: (res: IUsuario | undefined) => {
          if (res) {
            this.usuario = res;
            this.usuario.id = id; // Asegúrate de que el ID esté asignado
            console.log("Datos del usuario:", this.usuario);
          } else {
            console.warn("Usuario no encontrado");
          }
          loading.dismiss();
        },
        error: (err) => {
          console.error("Error al obtener el usuario:", err);
          loading.dismiss();
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
    console.log("Eliminando usuario con ID:", id);
    const loading = await this.loadingController.create({ message: 'Eliminando...' });
    await loading.present();
  
    this.restApi.deleteUsuarioID(id).then(() => {
      loading.dismiss();
      this.router.navigate(['/usuario-list']);
    }).catch((err) => {
      console.error("Error al eliminar el usuario:", err);
      loading.dismiss();
    });
  }
  
  
}

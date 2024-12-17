import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, AlertController } from '@ionic/angular';
import { ProductoService } from '../productos.service';

@Component({
  selector: 'app-listadeseados',
  templateUrl: './listadeseados.page.html',
  styleUrls: ['./listadeseados.page.scss'],
})
export class ListadeseadosPage implements OnInit {
  //lista de deseados
  deseados: any
  constructor(private alertController: AlertController, public xx: ProductoService) { }

  ngOnInit() {
    this.deseados = this.xx.obtenerDeseados;
  }
  //funcion para realizar Scroll
  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }


  // Elimina un producto de la lista de deseados
  async remove(producto: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que quieres eliminar ${producto.nombre}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'custom-alert-button-no', // Clase para el botón "No"
        },
        {
          text: 'Sí',
          handler: () => {
            this.xx.eliminarDeDeseados(producto.id); // Elimina el producto de la lista de deseados
            this.deseados = this.xx.obtenerDeseados; // Actualiza la lista de deseados en el componente
          },
          cssClass: 'custom-alert-button-yes', // Clase para el botón "Sí"
        }
      ]
    });

    await alert.present();
  }

  // Agrega un producto a la cesta
  async add(producto: any) {
    const alert = await this.alertController.create({
      header: 'Desea agregarlo a la cesta',
      message: `¿Estás seguro de que quieres agregar ${producto.nombre} a la cesta?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'custom-alert-button-no', // Clase para el botón "No"
        },
        {
          text: 'Sí',
          handler: () => {
            this.xx.agregarACesta(producto); // Agrega el producto a la cesta
            this.remove(producto); // Opcional: elimina el producto de la lista de deseados después de agregar a la cesta
          },
          cssClass: 'custom-alert-button-yes', // Clase para el botón "Sí"
        }
      ]
    });

    await alert.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../productos.service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.page.html',
  styleUrls: ['./cesta.page.scss'],
})
export class CestaPage implements OnInit {
  //lista de cesta
  cesta: any
  //variable para guardar el total del carrito
  totalCarrito = 0;
  constructor(private alertController: AlertController, private route: ActivatedRoute,
    private router: Router, public xx: ProductoService) {

  }

  // Totales del carrito 
  totalCarritoFinal() {
    this.totalCarrito = 0;
    for (let obj of this.xx.obtenerCesta) {

      this.totalCarrito = this.totalCarrito + (obj.cantidad * obj.precio)
    }
  }


  ngOnInit() {
    this.totalCarritoFinal();
    this.cesta = this.xx.obtenerCesta;
  }
  //funcion para realizar Scroll
  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  // Elimina un producto de la lista
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
            this.xx.eliminarDeCesta(producto.id); // Elimina el producto de la cesta
            this.cesta = this.xx.obtenerCesta; // Actualiza la lista de la cesta en el componente
            this.totalCarritoFinal(); // Actualiza el total del carrito
          },
          cssClass: 'custom-alert-button-yes', // Clase para el botón "Sí"
        }
      ]
    });

    await alert.present();
  }


  cancelar() {
    this.router.navigate(['/tabinicial/inicio']); // Esto te lleva a la página anterior

  }

}

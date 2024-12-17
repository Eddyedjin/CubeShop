import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../producto/producto-service.service';
import { map } from 'rxjs';
import { forkJoin } from 'rxjs';

import { IOfertas, IProductos } from '../../ofertas/model/IOfertas';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss'],
})
export class OfertaPage implements OnInit {
  ofertas: IOfertas[] = []; // Inicializa el array de ofertas
  
  constructor(private productService: ProductServiceService) {}

  ngOnInit() {
    this.leerFirestore(); // Llama al método para cargar ofertas al inicializar
  }

      leerFirestore() {
        this.productService.getOfertAll().snapshotChanges()
          .pipe(
            map((actions: any[]) => 
              actions.map(a => {
                const data = a.payload.doc.data() as IOfertas;
                const id = a.payload.doc.id;
                return { id, ...data }; // Incluye el ID en el objeto
              })
            )
          )
          .subscribe({
            next: async (data: IOfertas[]) => {
              this.ofertas = data;
              // Obtén producto por id
              const proObservables = this.ofertas.map(oferta => 
                this.productService.getProPorId(oferta.id_producto)
              );
    
              // Usa forkJoin para esperar todos los observables
              forkJoin(proObservables).subscribe(produc => {
                // Asigna el producto a cada oferta
                this.ofertas.forEach((oferta, index) => {
                  oferta.producto = produc[index] || null; // Asigna el producto o null si no se encontró
                });
                console.log("Productos con tipo asignado:", this.ofertas);
              });

              // Obtén las imagenes de los productos
              /*const imgObservables = this.ofertasprod.map(ofertaprod => 
                this.productService.getImgPorId(ofertaprod)
              );
    
              // Usa forkJoin para esperar todos los observables
              forkJoin(imgObservables).subscribe(imgid => {
                // Asigna la img a cada producto
                this.ofertas.forEach((oferta, index) => {
                  oferta.img = imgid[index] || null; // Asigna la img o null si no se encontró
                  
                });
                console.log("Productos con img asignadas:", this.ofertas);
              });*/

            },
            error: (err) => { console.log("Error:", err); }
          });
      }
}

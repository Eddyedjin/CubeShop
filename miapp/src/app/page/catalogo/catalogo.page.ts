import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../producto/producto-service.service';
import { IProductos, ITipoProducto } from '../../producto/model/IProductos';
import { map } from 'rxjs';
import { forkJoin } from 'rxjs'; // Importa forkJoin

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  productos!: IProductos[];

  constructor(private productService: ProductServiceService) { }

  ngOnInit() {
    this.leerFirestore();
  }

  recargar() {
    this.leerFirestore();
  }

  leerFirestore() {
    this.productService.getProductAll().snapshotChanges()
      .pipe(
        map((actions: any[]) => 
          actions.map(a => {
            const data = a.payload.doc.data() as IProductos;
            const id = a.payload.doc.id;
            return { id, ...data }; // Incluye el ID en el objeto
          })
        )
      )
      .subscribe({
        next: async (data: IProductos[]) => {
          this.productos = data;
          
          // Obtén los tipos de productos en paralelo
          const tipoObservables = this.productos.map(producto => 
            this.productService.getTipoProductoPorId(producto.id_tipo)
          );

          // Usa forkJoin para esperar todos los observables
          forkJoin(tipoObservables).subscribe(tipos => {
            // Asigna el tipo a cada producto
            this.productos.forEach((producto, index) => {
              producto.tipo = tipos[index] || null; // Asigna el tipo o null si no se encontró
            });
            console.log("Productos con tipo asignado:", this.productos);
          });
          // Obtén las imagenes de los productos en paralelo
          const imgObservables = this.productos.map(producto => 
            this.productService.getImgPorId(producto.id_img)
          );

          // Usa forkJoin para esperar todos los observables
          forkJoin(imgObservables).subscribe(imgid => {
            // Asigna la img a cada producto
            this.productos.forEach((producto, index) => {
              producto.img = imgid[index] || null; // Asigna la img o null si no se encontró
            });
            console.log("Productos con img asignadas:", this.productos);
          });
        },
        error: (err) => { console.log("Error:", err); }
      });
  }

  createNew() {
    // Lógica para crear un nuevo producto
  }

  reorderItems(event: any) {
    // Lógica para reordenar productos (si es necesario)
  }

  leerObservable() {
    this.productService.getProductsObservable()
      .subscribe({
        next: (data) => { console.log("dataOb", data); },
        error: (err) => { console.log("err", err); }
      });
  }
}

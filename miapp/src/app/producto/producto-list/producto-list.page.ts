import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


import { ProductServiceService } from '../producto-service.service';
import { map } from 'rxjs';
import { IProductos } from '../model/IProductos';



@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.page.html',
  styleUrls: ['./producto-list.page.scss'],
})
export class ProductoListPage implements OnInit {

  productos!: IProductos[]; // Cambia el nombre a 'productos'
  
  constructor(private productService: ProductServiceService) { }

  ngOnInit() {
    this.leerFirestore();
  }

  recargar() {
    this.leerFirestore();
  }

  leerFirestore() {
    this.productService.getProductAll().snapshotChanges() // Usa snapshotChanges para obtener los IDs
      .pipe(
        map((actions: any[]) => 
          actions.map(a => {
            const data = a.payload.doc.data() as IProductos;
            const id = a.payload.doc.id;
            return { id, ...data }; // Incluye el ID en el objeto
          })
        )
      ) // Cambia a getProductAll()
      .subscribe({
        next: (data: any) => {
          console.log("dataFirestone", data);
          this.productos =  data; // Asigna los datos a 'productos'
          console.log("Productos", this.productos);
        },
        error: (err) => { console.log("err", err); },
        complete: () => { }
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
        error: (err) => { console.log("err", err); },
        complete: () => { }
      });
  }

}

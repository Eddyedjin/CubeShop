import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


import { ImagenServiceService } from '../imagen-service.service';
import { map } from 'rxjs';
import { IImagen } from '../model/IImagen';

@Component({
  selector: 'app-imagen-list',
  templateUrl: './imagen-list.page.html',
  styleUrls: ['./imagen-list.page.scss'],
})
export class ImagenListPage implements OnInit {

  imagenes: IImagen[] = [];

  constructor(private imagenService: ImagenServiceService) { }
  
  
  ngOnInit() {
    this.leerFirestore();
  }

  recargar() {
    this.leerFirestore();
  }

  leerFirestore() {
    this.imagenService.getImagenAll().snapshotChanges() // Usa snapshotChanges para obtener los IDs
      .pipe(
        map((actions: any[]) => 
          actions.map(a => {
            const data = a.payload.doc.data() as IImagen;
            const id = a.payload.doc.id;
            return { id, ...data }; // Incluye el ID en el objeto
          })
        )
      ) // Cambia a getImagenAll()
      .subscribe({
        next: (data: any) => {
          console.log("dataFirestone", data);
          this.imagenes =  data; // Asigna los datos a 'imagenes'
          console.log("Imagen", this.imagenes);
        },
        error: (err) => { console.log("err", err); },
        complete: () => { }
      });
  }

  createNew() {
    // Lógica para crear un nueva imagen
  }

  reorderItems(event: any) {
    // Lógica para reordenar imagen (si es necesario)
  }

  leerObservable() {
    this.imagenService.getImagenObservable()
      .subscribe({
        next: (data) => { console.log("dataOb", data); },
        error: (err) => { console.log("err", err); },
        complete: () => { }
      });
  }

}
import { Component, OnInit } from '@angular/core';
import { DireccionServiceService } from '../direccion-service.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { IDirecciones } from '../model/IDirecciones';

@Component({
  selector: 'app-direccion-list',
  templateUrl: './direccion-list.page.html',
  styleUrls: ['./direccion-list.page.scss'],
})
export class DireccionListPage implements OnInit {
  direcciones!: IDirecciones[]; // Cambia el nombre a 'direcciones'
  constructor(private direccionService: DireccionServiceService) { }

  ngOnInit() {
    this.leerFirestore();
  }

  recargar() {
    this.leerFirestore();
  }

  leerFirestore() {
    this.direccionService.getDireccionAll().snapshotChanges() // Usa snapshotChanges para obtener los IDs
      .pipe(
        map((actions: any[]) => 
          actions.map(a => {
            const data = a.payload.doc.data() as IDirecciones;
            const id = a.payload.doc.id;
            return { id, ...data }; // Incluye el ID en el objeto
          })
        )
      ) // Cambia a getDirecciontAll()
      .subscribe({
        next: (data: any) => {
          console.log("dataFirestone", data);
          this.direcciones =  data; // Asigna los datos a 'direcciones'
          console.log("Direcciones", this.direcciones);
        },
        error: (err) => { console.log("err", err); },
        complete: () => { }
      });
  }

  createNew() {
    // Lógica para crear una nueva direccion
  }

  reorderItems(event: any) {
    // Lógica para reordenar direcciones (si es necesario)
  }

  leerObservable() {
    this.direccionService.getDireccionesObservable()

    .subscribe({
      next: (data) => { console.log("dataOb", data); },
      error: (err) => { console.log("err", err); },
        complete: () => { }
    });
  }
     
}

import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { SucursalServiceService } from '../sucursal-service.service';
import { map } from 'rxjs';
import { ISucursal } from '../model/ISucursal';

@Component({
  selector: 'app-sucursal-list',
  templateUrl: './sucursal-list.page.html',
  styleUrls: ['./sucursal-list.page.scss'],
})
export class SucursalListPage implements OnInit {

  sucursales: ISucursal[] = [];

  constructor(private sucursalService: SucursalServiceService) { }
  
  
  ngOnInit() {
    this.leerFirestore();
  }

  recargar() {
    this.leerFirestore();
  }

  leerFirestore() {
    this.sucursalService.getSucursalAll().snapshotChanges() // Usa snapshotChanges para obtener los IDs
      .pipe(
        map((actions: any[]) => 
          actions.map(a => {
            const data = a.payload.doc.data() as ISucursal;
            const id = a.payload.doc.id;
            return { id, ...data }; // Incluye el ID en el objeto
          })
        )
      ) // Cambia a getSucursalAll()
      .subscribe({
        next: (data: any) => {
          console.log("dataFirestone", data);
          this.sucursales =  data; // Asigna los datos a 'sucursales'
          console.log("Sucursal", this.sucursales);
        },
        error: (err) => { console.log("err", err); },
        complete: () => { }
      });
  }

  createNew() {
    // Lógica para crear un nueva sucursal
  }

  reorderItems(event: any) {
    // Lógica para reordenar sucursal (si es necesario)
  }

  leerObservable() {
    this.sucursalService.getSucursalObservable()
      .subscribe({
        next: (data) => { console.log("dataOb", data); },
        error: (err) => { console.log("err", err); },
        complete: () => { }
      });
  }

}
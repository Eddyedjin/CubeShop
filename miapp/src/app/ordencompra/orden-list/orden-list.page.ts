import { Component, OnInit } from '@angular/core';
import { IOrdenCompras } from '../model/IOrdenCompras';
import { OrdenServiceService } from '../orden-service.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-orden-list',
  templateUrl: './orden-list.page.html',
  styleUrls: ['./orden-list.page.scss'],
})
export class OrdenListPage implements OnInit {

  ordenes: IOrdenCompras[] = [];


  constructor(private ordenService: OrdenServiceService) { }

  ngOnInit() {
    this.leerFirestore();
  }

  recargar() {
    this.leerFirestore();
  }

  leerFirestore() {
    this.ordenService.getOrdenAll().snapshotChanges() // Usa snapshotChanges para obtener los IDs
      .pipe(
        map((actions: any[]) => 
          actions.map(a => {
            const data = a.payload.doc.data() as IOrdenCompras;
            const id = a.payload.doc.id;
            return { id, ...data }; // Incluye el ID en el objeto
          })
        )
      ) // Cambia a getImagenAll()
      .subscribe({
        next: (data: any) => {
          console.log("dataFirestone", data);
          this.ordenes =  data; // Asigna los datos a 'imagenes'
          console.log("Ofertas", this.ordenes);
        },
        error: (err) => { console.log("err", err); },
        complete: () => { }
      });
  }

  leerObservable() {
    this.ordenService.getOrdenObservable()
      .subscribe({
        next: (data) => { console.log("dataOb", data); },
        error: (err) => { console.log("err", err); },
        complete: () => { }
      });
  }

}

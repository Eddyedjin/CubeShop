import { Component, OnInit } from '@angular/core';
import { IOfertas } from '../model/IOfertas';
import { OfertaServiceService } from '../oferta-service.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-oferta-list',
  templateUrl: './oferta-list.page.html',
  styleUrls: ['./oferta-list.page.scss'],
})
export class OfertaListPage implements OnInit {

  ofertas: IOfertas[] = [];

  constructor(private ofertaService: OfertaServiceService) { }

  ngOnInit() {
    this.leerFirestore();
  }

  recargar() {
    this.leerFirestore();
  }

  leerFirestore() {
    this.ofertaService.getOfertaAll().snapshotChanges() // Usa snapshotChanges para obtener los IDs
      .pipe(
        map((actions: any[]) => 
          actions.map(a => {
            const data = a.payload.doc.data() as IOfertas;
            const id = a.payload.doc.id;
            return { id, ...data }; // Incluye el ID en el objeto
          })
        )
      ) // Cambia a getImagenAll()
      .subscribe({
        next: (data: any) => {
          console.log("dataFirestone", data);
          this.ofertas =  data; // Asigna los datos a 'imagenes'
          console.log("Ofertas", this.ofertas);
        },
        error: (err) => { console.log("err", err); },
        complete: () => { }
      });
  }

  leerObservable() {
    this.ofertaService.getOfertaObservable()
      .subscribe({
        next: (data) => { console.log("dataOb", data); },
        error: (err) => { console.log("err", err); },
        complete: () => { }
      });
  }

}
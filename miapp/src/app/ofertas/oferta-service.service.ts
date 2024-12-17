import { Injectable } from '@angular/core';
import { IOfertas } from './model/IOfertas';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class OfertaServiceService {

  private dbCollection = "ofertas"
  private dbDoc: AngularFirestoreCollection<IOfertas>;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.dbDoc = this.firestore.collection<IOfertas>(this.dbCollection);
   }
   //List
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }

  getOfertaAll(): AngularFirestoreCollection<IOfertas> {
    return this.dbDoc; // Devuelve la colección
  }

  getOfertaObservable(): Observable<IOfertas[]> {
    return this.dbDoc.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IOfertas;
          const id = a.payload.doc.id;
          return { id, ...data }; // Incluye el ID en el objeto
        })
      ),
      tap(sucursal => console.log('fetched sucursal', sucursal)),
      catchError(this.handleError('getImagenObservable', []))
    );
  }
  //Detail
  getOfertasId(id: string): Observable<IOfertas | undefined> {
    return this.dbDoc.doc<IOfertas>(id).valueChanges(); // Ajuste para obtener el sucursal por ID
  }

  //delete
  deleteOfertaID(id: string): Promise<void> {
    console.log("id Delete ID", id);
    return this.dbDoc.doc(id).delete();
  }
//edit
updateOferta(id: string, oferta: IOfertas): Promise<void> {
    console.log("Actualizando sucursal con ID:", id, "Datos:", oferta);

    // Convierte los campos necesarios si es necesario
    // Por ejemplo, si necesitas asegurarte de que algún campo es un número
    // producto.precio = parseFloat(producto.precio); // Descomentar si es necesario

    return this.dbDoc.doc(id).update(oferta)
      .then(() => {
        console.log('Oferta actualizada:', oferta);
      })
      .catch((error) => {
        console.error("Error al actualizar la Oferta:", error);
        throw error; // Propagar el error para manejarlo más tarde si es necesario
      });
  }

  //add
  addOferta(oferta: IOfertas): Promise<void> {
    console.log("Res-api Enviando addOferta ", oferta);

    // Convertimos cualquier campo necesario (si es necesario)
    // Por ejemplo, si necesitas asegurarte de que algún campo es un número
    // producto.precio = parseFloat(producto.precio);

    return this.dbDoc.add(oferta).then(() => {
      console.log('oferta añadido:', oferta);
    }).catch((error) => {
      console.error("Error al añadir la oferta:", error);
      throw error; // Propagar el error para manejarlo más tarde si es necesario
    });
  }
}

import { Injectable } from '@angular/core';
// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { IOrdenCompras } from './model/IOrdenCompras';



@Injectable({
  providedIn: 'root'
})
export class OrdenServiceService {
  private dbCollection = "orden_compras"
  private dbDoc: AngularFirestoreCollection<IOrdenCompras>;


  constructor( private http: HttpClient, private firestore: AngularFirestore) { 
    this.dbDoc = this.firestore.collection<IOrdenCompras>(this.dbCollection);
  }

  //List
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }

  getOrdenAll(): AngularFirestoreCollection<IOrdenCompras> {
    return this.dbDoc; // Devuelve la colección
  }

  getOrdenObservable(): Observable<IOrdenCompras[]> {
    return this.dbDoc.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IOrdenCompras;
          const id = a.payload.doc.id;
          return { id, ...data }; // Incluye el ID en el objeto
        })
      ),
      tap(orden => console.log('fetched orden', orden)),
      catchError(this.handleError('getImagenObservable', []))
    );
  }
  //Detail
  getOrdenId(id: string): Observable<IOrdenCompras | undefined> {
    return this.dbDoc.doc<IOrdenCompras>(id).valueChanges(); // Ajuste para obtener el sucursal por ID
  }

  //delete
  deleteOrdenID(id: string): Promise<void> {
    console.log("id Delete ID", id);
    return this.dbDoc.doc(id).delete();
  }
//edit
updateOrden(id: string, orden: IOrdenCompras): Promise<void> {
    console.log("Actualizando orden con ID:", id, "Datos:", orden);

    // Convierte los campos necesarios si es necesario
    // Por ejemplo, si necesitas asegurarte de que algún campo es un número
    // producto.precio = parseFloat(producto.precio); // Descomentar si es necesario

    return this.dbDoc.doc(id).update(orden)
      .then(() => {
        console.log('Orden actualizada:', orden);
      })
      .catch((error) => {
        console.error("Error al actualizar la Orden:", error);
        throw error; // Propagar el error para manejarlo más tarde si es necesario
      });
  }

  //add
  addOrden(orden: IOrdenCompras): Promise<void> {
    console.log("Res-api Enviando addOrden ", orden);

    // Convertimos cualquier campo necesario (si es necesario)
    // Por ejemplo, si necesitas asegurarte de que algún campo es un número
    // producto.precio = parseFloat(producto.precio);

    return this.dbDoc.add(orden).then(() => {
      console.log('oferta añadido:', orden);
    }).catch((error) => {
      console.error("Error al añadir la oferta:", error);
      throw error; // Propagar el error para manejarlo más tarde si es necesario
    });
  }
}





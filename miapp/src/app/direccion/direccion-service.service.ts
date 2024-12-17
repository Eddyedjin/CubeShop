import { Injectable } from '@angular/core';
import { IDirecciones } from './model/IDirecciones';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, filter, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DireccionServiceService {
  private dbCollection = "direcciones"
  private dbDoc: AngularFirestoreCollection<IDirecciones>;
  // Injectamos HttpClient, para poder consular una página
  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.dbDoc = this.firestore.collection<IDirecciones>(this.dbCollection);
  }

// Controla y enviará un mensaje a consola para todos los errores
  // ¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿  singo de pregunta al revez
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }

  // Método Agregar direcciones, y devuelve un observable 
  // Debe ser un Observable si deses suscribir este método en otro lado

  
  // Obtenemos todos las Direcciones
  getDireccionesObservable(): Observable<IDirecciones[]> {
    return this.dbDoc.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IDirecciones;
          const id = a.payload.doc.id;
          return { id, ...data }; // Incluye el ID en el objeto
        })
    ),
      tap(direcciones => console.log('fetched direcciones', direcciones)),
      catchError(this.handleError('getDireccionesObservable', []))
      );
  }

   getDireccionAll(): AngularFirestoreCollection<IDirecciones> {
    return this.dbDoc; //Devuelve la coleccion
  }

  getDireccionId(id: string): Observable<IDirecciones | undefined> {
    return this.dbDoc.doc<IDirecciones>(id).valueChanges(); // Ajuste para obtener el direccion por ID
  }

  getDireccionesPaginated(limit: number, lastVisibleDoc: any): Observable<IDirecciones[]> {
    let query = this.firestore.collection<IDirecciones>('direcciones', ref => {
      let q = ref.orderBy('nombre') // Cambia 'nombre' a la propiedad que desees
                      .limit(limit);
      if (lastVisibleDoc) {
        q = q.startAfter(lastVisibleDoc);
      }
      return q;
    });

    return query.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as IDirecciones;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  // Método para eliminar una direccion
  deleteDireccionId(id: string): Promise<void> {
    console.log("id Delete ID", id);
    return this.dbDoc.doc(id).delete();
  }


  addDireccion(direccion: IDirecciones): Promise<void> {
    console.log("Res-api Enviando AddDireccion: ", direccion);

    // Convertimos cualquier campo necesario (si es necesario)
    // Por ejemplo, si necesitas asegurarte de que algún campo es un número

    return this.dbDoc.add(direccion).then(() => {
      console.log('Direccion añadida:', direccion);
    }).catch((error) => {
      console.error("Error al añadir el direccion:", error);
      throw error; // Propagar el error para manejarlo más tarde si es necesario
    });
  }

  // Actualizar la direccion por medio de PUT
  updateDireccion(id: string, direccion: IDirecciones): Promise<void> {
    console.log("Actualizando direccion con ID: ", id, "Datos: ", direccion);
    return this.dbDoc.doc(id).update(direccion)
      .then(() => {
        console.log('Direccion actualizada: ', direccion);
      })
      .catch((error) => {
        console.error("Error al actualizar la direccion:", error);
        throw error; // Propagar el error para manejarlo más tarde si es necesario
      });
  }

  

}

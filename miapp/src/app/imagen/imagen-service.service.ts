import { Injectable } from '@angular/core';
import { IImagen } from './model/IImagen';
import { IImagenes } from './model/IImagenes';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


// creamos Constantes que utilizaremos en el envio
const apiUrl = "http://localhost:3000/imagenes";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ImagenServiceService {
  private dbCollection = "imagenes"
  private dbDoc: AngularFirestoreCollection<IImagenes>;
  // Injectamos HttpClient, para poder consular una página
  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.dbDoc = this.firestore.collection<IImagenes>(this.dbCollection);
  }

  // Controla y enviará un mensaje a consola para todos los errores
  // ¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿  singo de pregunta al revez
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }

  // Método Agregar producto, y devuelve un observable del tipo Producto
  // Debe ser un Observable si deses suscribir este método en otro lado
  getImagenObservable(): Observable<IImagenes[]> {
    return this.dbDoc.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IImagenes;
          const id = a.payload.doc.id;
          return { id, ...data }; // Incluye el ID en el objeto
        })
      ),
      tap(sucursal => console.log('fetched sucursal', sucursal)),
      catchError(this.handleError('getImagenObservable', []))
    );
  }

  getImagenAll(): AngularFirestoreCollection<IImagenes> {
    return this.dbDoc; // Devuelve la colección
  }

  getImagenId(id: string): Observable<IImagenes | undefined> {
    return this.dbDoc.doc<IImagenes>(id).valueChanges(); // Ajuste para obtener el sucursal por ID
  }

  getImagenPaginated(limit: number, lastVisibleDoc: any): Observable<IImagenes[]> {
    let query = this.firestore.collection<IImagenes>('imagenes', ref => {
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
          const data = a.payload.doc.data() as IImagenes;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }


  deleteImagenID(id: string): Promise<void> {
    console.log("id Delete ID", id);
    return this.dbDoc.doc(id).delete();
  }

  addImagen(imagen: IImagenes): Promise<void> {
    console.log("Res-api Enviando AddImagen ", imagen);

    // Convertimos cualquier campo necesario (si es necesario)
    // Por ejemplo, si necesitas asegurarte de que algún campo es un número
    // producto.precio = parseFloat(producto.precio);

    return this.dbDoc.add(imagen).then(() => {
      console.log('Imagen añadido:', imagen);
    }).catch((error) => {
      console.error("Error al añadir el imagen:", error);
      throw error; // Propagar el error para manejarlo más tarde si es necesario
    });
  }

  updateImagen(id: string, imagen: IImagenes): Promise<void> {
    console.log("Actualizando sucursal con ID:", id, "Datos:", imagen);

    // Convierte los campos necesarios si es necesario
    // Por ejemplo, si necesitas asegurarte de que algún campo es un número
    // producto.precio = parseFloat(producto.precio); // Descomentar si es necesario

    return this.dbDoc.doc(id).update(imagen)
      .then(() => {
        console.log('Imagen actualizado:', imagen);
      })
      .catch((error) => {
        console.error("Error al actualizar la imagen:", error);
        throw error; // Propagar el error para manejarlo más tarde si es necesario
      });
  }

  addImage(imagen: IImagen): Observable<IImagen> {
    console.log("Res-api Enviando addImage : ", imagen);
    // Ojo No lo ejecuta lo declara
    // El Pipe lo intercepta
    return this.http.post<IImagen>(apiUrl, imagen, httpOptions)
      .pipe(  // Tubería
        // tap intersecta la respuesta si no hay error
        tap((imagen: IImagen) => console.log('added imagen w/:', imagen)),
        // En caso de que ocurra Error
        catchError(this.handleError<IImagen>('addImage'))
      );
  }

}
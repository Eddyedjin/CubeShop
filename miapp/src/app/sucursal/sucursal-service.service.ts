import { Injectable } from '@angular/core';
import { ISucursal } from './model/ISucursal';
import { ISucursales } from './model/ISucursales';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


// creamos Constantes que utilizaremos en el envio
const apiUrl = "http://localhost:3000/sucursales";
const apiUrlD = "http://localhost:3000/direcciones";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class SucursalServiceService {
  private dbCollection = "sucursales"
  private dbDoc: AngularFirestoreCollection<ISucursales>;
  // Injectamos HttpClient, para poder consular una página
  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.dbDoc = this.firestore.collection<ISucursales>(this.dbCollection);
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
  getSucursalObservable(): Observable<ISucursales[]> {
    return this.dbDoc.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as ISucursales;
          const id = a.payload.doc.id;
          return { id, ...data }; // Incluye el ID en el objeto
        })
      ),
      tap(sucursal => console.log('fetched sucursal', sucursal)),
      catchError(this.handleError('getSucursalObservable', []))
    );
  }

  getSucursalAll(): AngularFirestoreCollection<ISucursales> {
    return this.dbDoc; // Devuelve la colección
  }

  getSucursalId(id: string): Observable<ISucursales | undefined> {
    return this.dbDoc.doc<ISucursales>(id).valueChanges(); // Ajuste para obtener el sucursal por ID
  }

  getSucursalPaginated(limit: number, lastVisibleDoc: any): Observable<ISucursales[]> {
    let query = this.firestore.collection<ISucursales>('sucursales', ref => {
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
          const data = a.payload.doc.data() as ISucursales;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }


  deleteSucursalID(id: string): Promise<void> {
    console.log("id Delete ID", id);
    return this.dbDoc.doc(id).delete();
  }

  addSucursal(sucursal: ISucursales): Promise<void> {
    console.log("Res-api Enviando AddSucursal ", sucursal);

    // Convertimos cualquier campo necesario (si es necesario)
    // Por ejemplo, si necesitas asegurarte de que algún campo es un número
    // producto.precio = parseFloat(producto.precio);

    return this.dbDoc.add(sucursal).then(() => {
      console.log('Sucursal añadido:', sucursal);
    }).catch((error) => {
      console.error("Error al añadir el sucursal:", error);
      throw error; // Propagar el error para manejarlo más tarde si es necesario
    });
  }

  updateSucursal(id: string, sucursal: ISucursales): Promise<void> {
    console.log("Actualizando sucursal con ID:", id, "Datos:", sucursal);

    // Convierte los campos necesarios si es necesario
    // Por ejemplo, si necesitas asegurarte de que algún campo es un número
    // producto.precio = parseFloat(producto.precio); // Descomentar si es necesario

    return this.dbDoc.doc(id).update(sucursal)
      .then(() => {
        console.log('Sucursal actualizado:', sucursal);
      })
      .catch((error) => {
        console.error("Error al actualizar la sucursal:", error);
        throw error; // Propagar el error para manejarlo más tarde si es necesario
      });
  }

  addSucursa(sucursal: ISucursal): Observable<ISucursal> {
    console.log("Res-api Enviando AddSucursal : ", sucursal);
    // Ojo No lo ejecuta lo declara
    // El Pipe lo intercepta
    return this.http.post<ISucursal>(apiUrl, sucursal, httpOptions)
      .pipe(  // Tubería
        // tap intersecta la respuesta si no hay error
        tap((sucursal: ISucursal) => console.log('added sucursal w/:', sucursal)),
        // En caso de que ocurra Error
        catchError(this.handleError<ISucursal>('addSucursal'))
      );
  }

  //Direcciones
  getDirecciones(): Observable<any[]> {
    return this.http.get<any[]>(apiUrlD)
      .pipe(
        tap(dire => console.log('Fetched tipos de direcciones:', dire)),
        catchError(this.handleError('getDirecciones', []))
      );
  }

}
import { Injectable } from '@angular/core';
import { IProductos, ITipoProducto } from './model/IProductos';

// Importamos  las librerías necesarias
import { combineLatest, Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, filter, take, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { IImagenes } from '../imagen/model/IImagenes';
import { IImagen } from '../imagen/model/IImagen';
import { IOfertas } from '../ofertas/model/IOfertas';
import { IProducto } from './model/IProducto';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private dbCollection = "productos"
  private dbDoc: AngularFirestoreCollection<IProductos>;
  //img
private dbCollectionCatImg = "imagenes"
private dbDocImg: AngularFirestoreCollection<IImagenes>;
  //Oferta 
  private dbCollectionCatOf = "ofertas"
  private dbDocOf: AngularFirestoreCollection<IOfertas>;
  // Injectamos HttpClient, para poder consular una página
  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.dbDoc = this.firestore.collection<IProductos>(this.dbCollection);
    //img
    this.dbDocImg = this.firestore.collection<IImagenes>(this.dbCollectionCatImg);
    //Oferta 
    this.dbDocOf = this.firestore.collection<IOfertas>(this.dbCollectionCatOf);
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
  getProductsObservable(): Observable<IProductos[]> {
    return this.dbDoc.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IProductos;
          const id = a.payload.doc.id;
          return { id, ...data }; // Incluye el ID en el objeto
        })
      ),
      switchMap(products => {
        const tipoObservables = products.map(product =>
          this.getTipoProductoPorId(product.id_tipo).pipe(
            map(tipo => ({ ...product, tipo })) // Agrega el tipo al producto
          )
        );
        return combineLatest(tipoObservables); // Combina los observables
      }),
      tap(products => console.log('productos con tipos', products)),
      catchError(this.handleError('getProductsObservable', []))
    );
  }
  
  

  getProductAll(): AngularFirestoreCollection<IProductos> {
    return this.dbDoc; // Devuelve la colección
  }

  getProductoId(id: string): Observable<IProductos | undefined> {
    return this.dbDoc.doc<IProductos>(id).valueChanges(); // Ajuste para obtener el producto por ID
  }

  getProductsPaginated(limit: number, lastVisibleDoc: any): Observable<IProductos[]> {
    let query = this.firestore.collection<IProductos>('productos', ref => {
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
          const data = a.payload.doc.data() as IProductos;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }


  deleteProductoID(id: string): Promise<void> {
    console.log("id Delete ID", id);
    return this.dbDoc.doc(id).delete();
  }

  addProducto(producto: IProductos): Promise<void> {
    console.log("Res-api Enviando AddProducto: ", producto);

    // Convertimos cualquier campo necesario (si es necesario)
    // Por ejemplo, si necesitas asegurarte de que algún campo es un número
    // producto.precio = parseFloat(producto.precio);

    return this.dbDoc.add(producto).then(() => {
      console.log('Producto añadido:', producto);
    }).catch((error) => {
      console.error("Error al añadir el producto:", error);
      throw error; // Propagar el error para manejarlo más tarde si es necesario
    });
  }

  updateProducto(id: string, producto: IProductos): Promise<void> {
    console.log("Actualizando producto con ID:", id, "Datos:", producto);

    // Convierte los campos necesarios si es necesario
    // Por ejemplo, si necesitas asegurarte de que algún campo es un número
    // producto.precio = parseFloat(producto.precio); // Descomentar si es necesario

    return this.dbDoc.doc(id).update(producto)
      .then(() => {
        console.log('Producto actualizado:', producto);
      })
      .catch((error) => {
        console.error("Error al actualizar el producto:", error);
        throw error; // Propagar el error para manejarlo más tarde si es necesario
      });
  }

  getTiposProducto(): Observable<ITipoProducto[]> {
    return this.firestore.collection<ITipoProducto>('tipo_producto').valueChanges().pipe(
      tap(tipos => console.log('Fetched tipos de productos:', tipos)), // Log para depuración
      catchError(this.handleError('getTiposProducto', []))
    );
  }

  getTipoProductoPorId(id: string): Observable<ITipoProducto | undefined> {
    return this.firestore.collection<ITipoProducto>('tipo_producto').doc(id).valueChanges().pipe(
      take(1), // Asegúrate de que solo se tome un valor
      catchError(() => of(undefined)) // Manejar errores y devolver undefined
    );
  }  
  
  getProductsByName(name: string): Observable<IProductos[]> {
    return this.firestore.collection<IProductos>(this.dbCollection, ref => 
      ref.where('nombre', '>=', name)
         .where('nombre', '<=', name + '\uf8ff') // Esto sigue siendo para coincidencias de prefijo
    ).snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as IProductos;
          const id = a.payload.doc.id;
          return { id, ...data }; // Incluye el ID en el objeto
        })
      ),
      catchError(this.handleError('getProductsByName', []))
    );
  }

  //Get Imagen por id
  getImagenId(id: string): Observable<IImagenes | undefined> {
    return this.dbDocImg.doc<IImagenes>(id).valueChanges(); // Ajuste para obtener el sucursal por ID
  }
  //Obtener img por id
  getImgPorId(id: string): Observable<IImagen | undefined> {
    return this.firestore.collection<IImagen>('imagenes').doc(id).valueChanges().pipe(
      take(1), // Asegúrate de que solo se tome un valor
      catchError(() => of(undefined)) // Manejar errores y devolver undefined
    );
  } 

  getOfertAll(): AngularFirestoreCollection<IOfertas> {
    return this.dbDocOf; // Devuelve la colección
  }

  //Obtener img por id
  getProPorId(id: string): Observable<IProductos | undefined> {
    return this.firestore.collection<IProductos>('productos').doc(id).valueChanges().pipe(
      take(1), // Asegúrate de que solo se tome un valor
      catchError(() => of(undefined)) // Manejar errores y devolver undefined
    );
  } 
  
}
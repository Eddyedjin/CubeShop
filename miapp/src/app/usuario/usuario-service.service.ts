import { Injectable } from '@angular/core';
import { IUsuario } from './model/IUsuario';
import { Observable, of } from 'rxjs';
import { catchError, tap, map, take } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  private dbCollection = "usuarios";
  private dbDoc: AngularFirestoreCollection<IUsuario>;
  private readonly ID_TIPO_USER = "Hmr2ThB1jHGaTnKrZMZq"; // ID fijo

  // Inyectamos AngularFirestore
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth, private router: Router,
    private authfirebase: AngularFireAuth
  ) {
    this.dbDoc = this.firestore.collection<IUsuario>(this.dbCollection);
  }

  // Controla y enviará un mensaje a consola para todos los errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Error en ${operation}:`, error); // log to console
      return of(result as T);
    };
  }

  // Obtener todos los usuarios
  getUsersObservable(): Observable<IUsuario[]> {
    return this.dbDoc.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IUsuario;
          const id = a.payload.doc.id;
          return { id, ...data }; // Incluye el ID en el objeto
        })
      ),
      tap(users => console.log('Usuarios obtenidos:', users)),
      catchError(this.handleError('getUsersObservable', []))
    );
  }

  // Obtener un usuario por ID
  getUsuarioId(id: string): Observable<IUsuario | undefined> {
    return this.dbDoc.doc<IUsuario>(id).valueChanges().pipe(
      take(1), // Solo toma un valor
      catchError(() => of(undefined)) // Manejar errores y devolver undefined
    );
  }
  

  // Agregar un nuevo usuario
  addUsuario(usuario: IUsuario): Promise<void> {
    return this.dbDoc.add(usuario).then(() => {
      console.log('Usuario añadido:', usuario);
    }).catch((error) => {
      console.error("Error al añadir el usuario:", error);
      throw error; // Propagar el error para manejarlo más tarde
    });
  }

  // Actualizar un usuario por ID
  // En tu servicio

  updateUsuario(id: string, usuario: IUsuario): Promise<void> {
    return this.dbDoc.doc(id).update(usuario)
      .then(() => {
        console.log('Usuario actualizado:', usuario);
      })
      .catch((error) => {
        console.error("Error al actualizar el usuario:", error);
        throw error;
      });
  }
  


  // Eliminar un usuario por ID
  deleteUsuarioID(id: string): Promise<void> {
    return this.dbDoc.doc(id).delete().then(() => {
      console.log(`Usuario eliminado con ID: ${id}`);
    }).catch((error) => {
      console.error("Error al eliminar el usuario:", error);
      throw error; // Propagar el error para manejarlo más tarde
    });
  }

  // Obtener usuarios por nombre
  getUsersByName(name: string): Observable<IUsuario[]> {
    return this.firestore.collection<IUsuario>(this.dbCollection, ref =>
      ref.where('nombre', '>=', name)
        .where('nombre', '<=', name + '\uf8ff')
    ).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IUsuario;
          const id = a.payload.doc.id;
          return { id, ...data }; // Incluye el ID en el objeto
        })
      ),
      catchError(this.handleError('getUsersByName', []))
    );
  }

  registrarUser(datos: IUsuario) {
    return this.authfirebase.createUserWithEmailAndPassword(datos.correoelectronico, datos.contrasenia);
  }

  //Login
  login(correoelectronico : string, password: string): Promise<void> {
    return this.auth.signInWithEmailAndPassword(correoelectronico , password)
      .then(() => {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/tabinicial/inicio']);
      })
      .catch(error => {
        console.error('Error en inicio de sesión:', error);
        throw error; // Propaga el error
      });
  }

  //Cambiar contraseña
  resetPassword(email:string){
    return this.auth.sendPasswordResetEmail(email);
  }

}

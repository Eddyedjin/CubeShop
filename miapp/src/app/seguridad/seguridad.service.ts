import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  loading: any;
  

  //Lista de personas
  lPersonas = [
    { id_usuario: 1, nombre_usuario: 'Juan', apPat_usuario: 'Pérez', apMat_usuario: 'Aguilera', correoelectronico: 'ana.martinez@gmail.com', contrasenia: 'password456', id_tipo_usuario: 2 },
    { id_usuario: 2, nombre_usuario: 'Ana', apPat_usuario: 'López', apMat_usuario: 'García', correoelectronico: 'ana@example.com', contrasenia: 'password456', id_tipo_usuario: 1 },
    { id_usuario: 3, nombre_usuario: 'Luis', apPat_usuario: 'Martínez', apMat_usuario: 'Hernández', correoelectronico: 'luis@example.com', contrasenia: 'password789', id_tipo_usuario: 1 },
    { id_usuario: 4, nombre_usuario: 'María', apPat_usuario: 'Gómez', apMat_usuario: 'Rodríguez', correoelectronico: 'maria@example.com', contrasenia: 'password321', id_tipo_usuario: 1 },
    { id_usuario: 5, nombre_usuario: 'Pedro', apPat_usuario: 'Ramírez', apMat_usuario: 'Morales', correoelectronico: 'pedro@example.com', contrasenia: 'password654', id_tipo_usuario: 1 },
    { id_usuario: 6, nombre_usuario: 'Laura', apPat_usuario: 'Fernández', apMat_usuario: 'Cruz', correoelectronico: 'laura@example.com', contrasenia: 'password987', id_tipo_usuario: 1 },
    { id_usuario: 7, nombre_usuario: 'Carlos', apPat_usuario: 'Jiménez', apMat_usuario: 'Vázquez', correoelectronico: 'carlos@example.com', contrasenia: 'password111', id_tipo_usuario: 1 },
    { id_usuario: 8, nombre_usuario: 'Sofía', apPat_usuario: 'Castro', apMat_usuario: 'Guerrero', correoelectronico: 'sofia@example.com', contrasenia: 'password222', id_tipo_usuario: 1 },
    { id_usuario: 9, nombre_usuario: 'Ricardo', apPat_usuario: 'Moreno', apMat_usuario: 'Ponce', correoelectronico: 'ricardo@example.com', contrasenia: 'password333', id_tipo_usuario: 1 },
    { id_usuario: 10, nombre_usuario: 'Gabriela', apPat_usuario: 'Álvarez', apMat_usuario: 'Rivas', correoelectronico: 'gabriela@example.com', contrasenia: 'password444', id_tipo_usuario: 1 },
    { id_usuario: 11, nombre_usuario: 'Gabriel', apPat_usuario: 'Peres', apMat_usuario: 'Braund', correoelectronico: 'gabriel@example.com', contrasenia: 'password324', id_tipo_usuario: 1 },
    { id_usuario: 12, nombre_usuario: 'joaquin', apPat_usuario: 'Meza', apMat_usuario: 'Aveiro', correoelectronico: 'joaquin@example.com', contrasenia: 'password573', id_tipo_usuario: 1 },
  ];

  //Constructor
  constructor(private firestore: AngularFirestore,
    private authfirebase: AngularFireAuth,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {}
  //Persona
  damePersona() {
    return this.lPersonas;
  }
  pasamePersona() {
    return [...this.lPersonas];
  }
  get obtenerPersona() {
    return this.lPersonas;
  }
  

  obtenerPersonaPorId(id_usuario: number | null) {
    return this.lPersonas.find(persona => persona.id_usuario === id_usuario);
  }

  //
  getCollection() {

    console.log('Estoy por leer una coleccion')

    this.firestore.collection('usuarios').valueChanges().subscribe( (res) => {

    });
  }

  creatDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }



  //interacciones
  /* Mensaje */
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2100
    });
    toast.present();
  } 

  /* Loading */
  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      message: mensaje,
      duration: 1350
    });
    await this.loading.present();
  }

  /* Cerrar loading */
  async closeLoading() {
    await this.loading.dismiss();
  }



// Método para obtener el perfil del usuario autenticado desde Firestore
obtenerPerfilUsuario(): Observable<any> {
  return this.authfirebase.authState.pipe(
    switchMap(user => {
      if (user) {
        // Obtiene el documento del usuario desde la colección 'usuarios'
        return this.firestore.collection('usuarios').doc(user.uid).valueChanges();
      } else {
        return of(null);
      }
    })
  );
}

login(correoelectronico: string, contrasenia: string) {
  return this.authfirebase.signInWithEmailAndPassword(correoelectronico, contrasenia);
}

logout() {
  this.authfirebase.signOut();
}

// Otros métodos permanecen igual...
}
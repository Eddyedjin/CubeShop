import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioActual$: Observable<any>;

  constructor(private afAuth: AngularFireAuth) {
    // Observable que emite el usuario autenticado actualmente
    this.usuarioActual$ = this.afAuth.authState;
  }

  // Método para iniciar sesión con correo y contraseña
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Método para cerrar sesión
  logout() {
    return this.afAuth.signOut();
  }

  // Método para registrarse con correo y contraseña
  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}

import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/app/usuario/usuario-service.service';
import { IUsuario } from '../model/IUsuario';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.page.html',
  styleUrls: ['./usuario-list.page.scss'],
})
export class UsuarioListPage implements OnInit {
  usuarios!: IUsuario[]; // Cambia el nombre a 'usuarios'

  constructor(
    private usuarioService: UsuarioServiceService,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.leerFirestore();
  }

  recargar() {
    this.leerFirestore();
  }

  leerFirestore() {
    this.usuarioService.getUsersObservable().subscribe({
      next: (data) => {
        console.log("Usuarios obtenidos:", data);
        this.usuarios = data; // Asigna los datos a 'usuarios'
      },
      error: (err) => {
        console.log("Error al obtener usuarios:", err);
      },
      complete: () => { }
    });
  }

  createNew() {
    // Lógica para crear un nuevo usuario
    this.router.navigate(['/path/to/create-user']); // Cambia la ruta según corresponda
  }
}

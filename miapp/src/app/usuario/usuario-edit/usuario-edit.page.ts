import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from '../model/IUsuario';
import { UsuarioServiceService } from '../usuario-service.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.page.html',
  styleUrls: ['./usuario-edit.page.scss'],
})
export class UsuarioEditPage implements OnInit {
  usuarioForm!: FormGroup;
  usuario: IUsuario = {
    nombre: '',
    app: '',
    apm: '',
    correoelectronico: '',
    contrasenia: '',
    id_tipo_user: '',
  };
  id: string = '';

  constructor(
    public restApi: UsuarioServiceService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getUsuario(this.id);
    } else {
      console.error('No ID found in route params');
    }

    this.usuarioForm = this.formBuilder.group({
      usu_name: ['', Validators.required],
      usu_app: ['', Validators.required],
      usu_apm: ['', Validators.required],
      usu_correo: ['', Validators.required],
      usu_contrasenia: ['', Validators.required],
      usu_id_tipo: [null, Validators.required],
    });
  }

  async getUsuario(id: string) {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();

    this.restApi.getUsuarioId(id).subscribe({
      next: (data) => {
        if (data) {
          this.usuario = data;
          this.usuarioForm.setValue({
            usu_name: data.nombre,
            usu_app: data.app,
            usu_apm: data.apm,
            usu_correo: data.correoelectronico,
            usu_contrasenia: data.contrasenia,
            usu_id_tipo: data.id_tipo_user,
          });
        } else {
          console.error("Usuario no encontrado");
        }
        loading.dismiss();
      },
      error: (err) => {
        console.error("Error al obtener el usuario", err);
        loading.dismiss();
      }
    });
  }

  async onFormSubmit() {
    if (this.usuarioForm.valid) {
      this.usuario.id = this.id; // Asegúrate de que el objeto usuario tenga un campo id
      this.usuario.nombre = this.usuarioForm.value.usu_name;
      this.usuario.app = this.usuarioForm.value.usu_app;
      this.usuario.apm = this.usuarioForm.value.usu_apm;
      this.usuario.correoelectronico = this.usuarioForm.value.usu_correo;
      this.usuario.contrasenia = this.usuarioForm.value.usu_contrasenia;
      this.usuario.id_tipo_user = this.usuarioForm.value.usu_id_tipo;

      await this.restApi.updateUsuario(this.id, this.usuario)
        .then(() => {
          this.router.navigate(['/usuario-list']);
        })
        .catch((error) => {
          console.error("Error actualizando el usuario", error);
        });
    } else {
      console.error("El formulario no es válido");
    }
  }
}

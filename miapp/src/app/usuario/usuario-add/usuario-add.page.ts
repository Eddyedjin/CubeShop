import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioServiceService } from '../usuario-service.service';
import { IUsuario } from '../model/IUsuario';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.page.html',
  styleUrls: ['./usuario-add.page.scss'],
})
export class UsuarioAddPage implements OnInit {
  usuarioForm!: FormGroup;
  usuario: IUsuario = {} as IUsuario; // Inicializamos como un objeto vacío

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private restApi: UsuarioServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    // Inicializamos el objeto usuario con valores por defecto
    this.usuario = {
      nombre: '',
      app: '',
      apm: '',
      correoelectronico: '',
      contrasenia: '',
      id_tipo_user: '',
    };

    this.usuarioForm = this.formBuilder.group({
      usu_nombre: [this.usuario.nombre, Validators.required],
      usu_app: [this.usuario.app, Validators.required],
      usu_apm: [this.usuario.apm, Validators.required],
      usu_correoelectronico: [this.usuario.correoelectronico, Validators.required],
      usu_contrasenia: [this.usuario.contrasenia, Validators.required],
      usu_id_tipo_user: [this.usuario.id_tipo_user, Validators.required],
    });
  }

  async onFormSubmit(formValue: any) {
    console.log("onFormSubmit del Usuario ADD", formValue);
  
    // Asignamos los valores del formulario al objeto usuario
    this.usuario = {
      ...this.usuario,
      nombre: formValue.usu_nombre,
      app: formValue.usu_app,
      apm: formValue.usu_apm,
      correoelectronico: formValue.usu_correoelectronico,
      contrasenia: formValue.usu_contrasenia,
      id_tipo_user: formValue.usu_id_tipo_user,
    };
  
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
  
    await loading.present();
  
    try {
      await this.restApi.addUsuario(this.usuario);
      console.log("Usuario agregado con éxito");
      loading.dismiss();
      this.router.navigate(['/usuario-list']);
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
      loading.dismiss();
    }
  }
  
  
}

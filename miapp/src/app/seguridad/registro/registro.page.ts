import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from '../../usuario/usuario-service.service'; // Asegúrate de que la ruta sea correcta
import { IUsuario } from '../../usuario/model/IUsuario'; // Importa la interfaz
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa el AlertController
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  datos: IUsuario = {
  nombre:'',
  app:'',
  apm:'',
  correoelectronico:'',
  contrasenia:'',
   //este obtenerlo por separado
  id_tipo_user:'Hmr2ThB1jHGaTnKrZMZq' // id fijo
  }
  repetirContrasenia: string=''
  //Hmr2ThB1jHGaTnKrZMZq id fijo

  constructor(private usuarioService: UsuarioServiceService,
    private auth: SeguridadService,private router: Router, 
    private alertController: AlertController) { }

  ngOnInit() { }

  async mostrarAlerta(mensaje: string,ruta:string) {
    const alert = await this.alertController.create({
      header: 'Registro',
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/seguridad/',ruta]); // Redirige después de cerrar la alerta
          },
        },
      ],
    });

    await alert.present();
  }

  async registro() {
    
    this.auth.presentLoading('Registrando...')
    if(this.datos.contrasenia != this.repetirContrasenia){
      //mensaje de espera error
      this.mostrarAlerta('Error contraseña no coinciden.','registro')
      console.log("Error contraseña no coinciden")
    }else{
    const res = await this.usuarioService.registrarUser(this.datos).catch(error => {
      this.auth.closeLoading();
      this.auth.presentToast('Error al ingresar los datos.')
      console.log('error');
    })
    if (res) {
      console.log('Exito al crear el usuario');
      //path es la tabla donde guardara los datos
      const path = 'usuarios';
      if (res && res.user) {
        const id = res.user.uid;
        this.datos.id = id;
        this.datos.contrasenia = '';
        await this.auth.creatDoc(this.datos, path, id)
        this.auth.closeLoading();
        this.auth.presentToast('Registrado con exito.')
        //mansaje de espera
        this.mostrarAlerta('El registro se ha completado!','login')
      } else {
        console.error('Error al obtener el UID del usuario');
      }
    }
  }
}
}

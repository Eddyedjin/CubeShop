import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioServiceService } from 'src/app/usuario/usuario-service.service';

@Component({
  selector: 'app-recuperarclave',
  templateUrl: './recuperarclave.page.html',
  styleUrls: ['./recuperarclave.page.scss'],
})
export class RecuperarclavePage implements OnInit {
  email:string='';
  constructor(private usuarioService: UsuarioServiceService,
    private alertController: AlertController,
    private router: Router, 
  ) { }

  ngOnInit() {
  }

  sendLinkReset(){

    if (this.email!= '') {
      this.usuarioService.resetPassword(this.email).then(() =>{
    console.log('Enviado reset')
    this.mostrarAlerta('Se envio un correo para cambiar la contraseña','login');}).catch(()=>{
      console.log('Correo no asociado a ninguna cuenta')
    })
    } else {
      console.log('error, no se ingreso un email')
      this.mostrarAlerta('Error, no se ingreso un email','login')
    }
    
  }


  async mostrarAlerta(mensaje: string,ruta:string) {
    const alert = await this.alertController.create({
      header: 'Cambio contraseña',
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
}

import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from '../../usuario/usuario-service.service'; // Asegúrate de que la ruta sea correcta
import { SeguridadService } from '../seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credenciales = {
    correoelectronico: "",
    contrasenia: ""
  }

  constructor(private usuarioService: UsuarioServiceService,
    private auth: SeguridadService,private router: Router,
  ) { }

  ngOnInit() {
  }

  async login() {
    await this.auth.presentLoading('Ingresando...')
    console.log('credenciales -> ', this.credenciales)
    const res = await this.auth.login(this.credenciales.correoelectronico, this.credenciales.contrasenia).catch( error =>
        {console.log('error')
        this.auth.closeLoading();
        this.auth.presentToast('Usuario o contraseña invalido')
    })
    if (res) {
      console.log('res -> ', res)
      this.auth.closeLoading();
      this.auth.presentToast('Ingresado con exito');
      this.router.navigate(['tabinicial/inicio'])
    }

  }
  

}

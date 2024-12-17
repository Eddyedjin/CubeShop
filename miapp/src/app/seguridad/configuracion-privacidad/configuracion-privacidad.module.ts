import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionPrivacidadPageRoutingModule } from './configuracion-privacidad-routing.module';

import { ConfiguracionPrivacidadPage } from './configuracion-privacidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionPrivacidadPageRoutingModule
  ],
  declarations: [ConfiguracionPrivacidadPage]
})
export class ConfiguracionPrivacidadPageModule {}

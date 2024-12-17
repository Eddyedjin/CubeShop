import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreferenciasNotificacionesPageRoutingModule } from './preferencias-notificaciones-routing.module';

import { PreferenciasNotificacionesPage } from './preferencias-notificaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreferenciasNotificacionesPageRoutingModule
  ],
  declarations: [PreferenciasNotificacionesPage]
})
export class PreferenciasNotificacionesPageModule {}

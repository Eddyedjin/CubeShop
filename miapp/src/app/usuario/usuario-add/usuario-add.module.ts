import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioAddPageRoutingModule } from './usuario-add-routing.module';

import { UsuarioAddPage } from './usuario-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioAddPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UsuarioAddPage]
})
export class UsuarioAddPageModule {}

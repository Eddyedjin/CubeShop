import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionEditPageRoutingModule } from './direccion-edit-routing.module';

import { DireccionEditPage } from './direccion-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DireccionEditPageRoutingModule
  ],
  declarations: [DireccionEditPage]
})
export class DireccionEditPageModule {}

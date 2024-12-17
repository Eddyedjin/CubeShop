import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionAddPageRoutingModule } from './direccion-add-routing.module';

import { DireccionAddPage } from './direccion-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionAddPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DireccionAddPage]
})
export class DireccionAddPageModule {}



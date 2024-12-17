import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionAllPageRoutingModule } from './direccion-all-routing.module';

import { DireccionAllPage } from './direccion-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionAllPageRoutingModule
  ],
  declarations: [DireccionAllPage]
})
export class DireccionAllPageModule {}



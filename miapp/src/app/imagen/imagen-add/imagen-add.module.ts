import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagenAddPageRoutingModule } from './imagen-add-routing.module';

import { ImagenAddPage } from './imagen-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ImagenAddPageRoutingModule
  ],
  declarations: [ImagenAddPage]
})
export class ImagenAddPageModule {}

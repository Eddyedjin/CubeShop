import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagenEditPageRoutingModule } from './imagen-edit-routing.module';

import { ImagenEditPage } from './imagen-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ImagenEditPageRoutingModule
  ],
  declarations: [ImagenEditPage]
})
export class ImagenEditPageModule {}

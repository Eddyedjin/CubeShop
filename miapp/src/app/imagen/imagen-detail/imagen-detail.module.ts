import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagenDetailPageRoutingModule } from './imagen-detail-routing.module';

import { ImagenDetailPage } from './imagen-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagenDetailPageRoutingModule
  ],
  declarations: [ImagenDetailPage]
})
export class ImagenDetailPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagenListPageRoutingModule } from './imagen-list-routing.module';

import { ImagenListPage } from './imagen-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagenListPageRoutingModule
  ],
  declarations: [ImagenListPage]
})
export class ImagenListPageModule {}

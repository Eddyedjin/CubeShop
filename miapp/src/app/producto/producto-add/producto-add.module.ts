import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ProductoAddPageRoutingModule } from './producto-add-routing.module';

import { ProductoAddPage } from './producto-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoAddPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ProductoAddPage]
})
export class ProductoAddPageModule {}

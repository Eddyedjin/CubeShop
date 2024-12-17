import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenAddPageRoutingModule } from './orden-add-routing.module';

import { OrdenAddPage } from './orden-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenAddPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OrdenAddPage]
})
export class OrdenAddPageModule {}

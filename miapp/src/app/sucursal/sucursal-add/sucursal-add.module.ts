import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SucursalAddPageRoutingModule } from './sucursal-add-routing.module';

import { SucursalAddPage } from './sucursal-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SucursalAddPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [SucursalAddPage]
})
export class SucursalAddPageModule {}

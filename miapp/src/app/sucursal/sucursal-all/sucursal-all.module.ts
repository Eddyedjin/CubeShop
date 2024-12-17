import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SucursalAllPageRoutingModule } from './sucursal-all-routing.module';

import { SucursalAllPage } from './sucursal-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SucursalAllPageRoutingModule
  ],
  declarations: [SucursalAllPage]
})
export class SucursalAllPageModule {}

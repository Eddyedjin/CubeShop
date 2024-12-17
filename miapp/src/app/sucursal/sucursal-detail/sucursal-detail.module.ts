import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SucursalDetailPageRoutingModule } from './sucursal-detail-routing.module';

import { SucursalDetailPage } from './sucursal-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SucursalDetailPageRoutingModule
  ],
  declarations: [SucursalDetailPage]
})
export class SucursalDetailPageModule {}

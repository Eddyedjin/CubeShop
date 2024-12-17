import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenDetailPageRoutingModule } from './orden-detail-routing.module';

import { OrdenDetailPage } from './orden-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenDetailPageRoutingModule
  ],
  declarations: [OrdenDetailPage]
})
export class OrdenDetailPageModule {}

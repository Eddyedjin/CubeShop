import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionDetailPageRoutingModule } from './direccion-detail-routing.module';

import { DireccionDetailPage } from './direccion-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionDetailPageRoutingModule
  ],
  declarations: [DireccionDetailPage]
})
export class DireccionDetailPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertaDetailPageRoutingModule } from './oferta-detail-routing.module';

import { OfertaDetailPage } from './oferta-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfertaDetailPageRoutingModule
  ],
  declarations: [OfertaDetailPage]
})
export class OfertaDetailPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertaAddPageRoutingModule } from './oferta-add-routing.module';

import { OfertaAddPage } from './oferta-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfertaAddPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OfertaAddPage]
})
export class OfertaAddPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertaListPageRoutingModule } from './oferta-list-routing.module';

import { OfertaListPage } from './oferta-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfertaListPageRoutingModule
  ],
  declarations: [OfertaListPage]
})
export class OfertaListPageModule {}

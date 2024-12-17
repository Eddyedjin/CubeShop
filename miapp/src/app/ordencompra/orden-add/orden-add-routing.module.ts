import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenAddPage } from './orden-add.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenAddPageRoutingModule {}

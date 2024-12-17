import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenEditPage } from './orden-edit.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenEditPageRoutingModule {}

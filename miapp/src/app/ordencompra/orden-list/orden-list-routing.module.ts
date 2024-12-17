import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenListPage } from './orden-list.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenListPageRoutingModule {}

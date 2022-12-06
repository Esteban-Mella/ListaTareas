import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigCategoriasPage } from './config-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigCategoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigCategoriasPageRoutingModule {}

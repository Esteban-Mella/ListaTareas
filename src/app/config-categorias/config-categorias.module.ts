import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigCategoriasPageRoutingModule } from './config-categorias-routing.module';

import { ConfigCategoriasPage } from './config-categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigCategoriasPageRoutingModule
  ],
  declarations: [ConfigCategoriasPage]
})
export class ConfigCategoriasPageModule {}

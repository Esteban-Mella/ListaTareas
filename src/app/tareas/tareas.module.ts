import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TareasPageRoutingModule } from './tareas-routing.module';

import { TareasPage } from './tareas.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareasPageRoutingModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  
  declarations: [TareasPage]
})
export class TareasPageModule {}

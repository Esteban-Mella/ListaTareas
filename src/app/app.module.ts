import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule,NgxDatatableModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule, Ng2SearchPipeModule],
  providers: [ScreenOrientation,SQLite,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }],
  bootstrap: [AppComponent],
})
export class AppModule {}

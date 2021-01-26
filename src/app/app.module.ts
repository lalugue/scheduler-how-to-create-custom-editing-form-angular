import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DxPopupModule, DxSchedulerModule } from 'devextreme-angular';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DxSchedulerModule,
    DxPopupModule
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }

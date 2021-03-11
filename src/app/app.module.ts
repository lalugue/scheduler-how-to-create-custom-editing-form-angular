import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DxPopupModule, DxSchedulerModule, DxScrollViewModule } from 'devextreme-angular';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DxSchedulerModule,
    DxPopupModule,
    DxScrollViewModule
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }

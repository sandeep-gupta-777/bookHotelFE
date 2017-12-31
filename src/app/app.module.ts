import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Grid1Component } from './grid1/grid1.component';
import {AppComponent} from "./app.component";

@NgModule({
  declarations: [
    AppComponent,
    Grid1Component,
  ],
  imports: [
    BrowserModule
  ],
  providers: [ ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

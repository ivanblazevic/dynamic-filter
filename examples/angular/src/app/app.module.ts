import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { DynamicFilterComponent } from './dynamic-filter/dyamic-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFilterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

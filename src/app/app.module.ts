import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';        

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CelestialMapComponent } from './celestial-map/celestial-map.component';
import { ObservationsTableComponent } from './observations-table/observations-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CelestialMapComponent,
    ObservationsTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AccordionModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

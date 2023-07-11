import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightsComponent } from './components/flights/flights.component';
import { AirportsComponent } from './components/airports/airports.component';
import { RoutesComponent } from './components/routes/routes.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewAirportModalComponent } from './components/new-airport-modal/new-airport-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAirportModalComponent } from './components/edit-airport-modal/edit-airport-modal.component';
import { NewRouteModalComponent } from './components/new-route-modal/new-route-modal.component';
import { EditRouteModalComponent } from './components/edit-route-modal/edit-route-modal.component';
import { NewFlightModalComponent } from './components/new-flight-modal/new-flight-modal.component';
import { EditFlightModalComponent } from './components/edit-flight-modal/edit-flight-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightsComponent,
    AirportsComponent,
    RoutesComponent,
    HomeComponent,
    NavbarComponent,
    NewAirportModalComponent,
    EditAirportModalComponent,
    NewRouteModalComponent,
    EditRouteModalComponent,
    NewFlightModalComponent,
    EditFlightModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

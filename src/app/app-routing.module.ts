import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AirportsComponent } from './components/airports/airports.component';
import { RoutesComponent } from './components/routes/routes.component';
import { FlightsComponent } from './components/flights/flights.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path : "", component : HomeComponent},
  {path : "airports", component : AirportsComponent},
  {path : "routes", component : RoutesComponent},
  {path : "flights", component : FlightsComponent},
  {path : "login", component : LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
})
export class FlightsComponent implements OnInit {
  title = "Flights"
  flightList: any[] = [];
  async ngOnInit(): Promise<void> {
    const response = await axios.get("http://localhost:8080/api/flights/getall");
    this.flightList = response.data;
  }
}

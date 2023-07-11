import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';
import { windowWhen } from 'rxjs';

@Component({
  selector: 'app-new-flight-modal',
  templateUrl: './new-flight-modal.component.html'
})
export class NewFlightModalComponent {
  frm: FormGroup;
  routeList: any[] = [];
  constructor(private formBuilder: FormBuilder) {
    this.getRouteList()
    this.frm = formBuilder.group({
      flightNumber: [""],
      route: [""],
      price: [""],
      date: [""],
      arrivalTime: [""],
      capacity: [""],
      status: [""],
    })

    this.frm.valueChanges.subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }

  async onSubmit() {
    const confirmFlight = window.confirm("Are you sure to add new flight?");
    if (confirmFlight) {
      const { flightNumber, route, price, date, arrivalTime, capacity, status } = this.frm.value;
      axios.post("http://localhost:8080/api/flights/add", {
        flightNumber,
        route,
        price,
        date,
        arrivalTime,
        capacity,
        status,
      })
    }
  }

  async getRouteList() {
    const routeList = await axios.get("http://localhost:8080/api/routes/getall");
    console.log(routeList.data);

    this.routeList = routeList.data;
  }
}

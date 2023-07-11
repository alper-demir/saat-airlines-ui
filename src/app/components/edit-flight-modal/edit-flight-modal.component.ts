import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import axios from 'axios';

@Component({
  selector: 'app-edit-flight-modal',
  templateUrl: './edit-flight-modal.component.html'
})

export class EditFlightModalComponent {

  frm: FormGroup;
  routeList: any[] = [];
  flight = {
    id: 0,
  }

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private formBuilder: FormBuilder) {
    this.getRouteList();
    console.log(data);
    this.flight = data;

    this.frm = formBuilder.group({
      flightNumber: [data.flightNumber],
      route: [data.route.id],
      price: [data.price],
      date: [data.date],
      arrivalTime: [data.arrivalTime],
      capacity: [data.capacity],
      status: [data.status],
    })

    this.frm.valueChanges.subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }

  async getRouteList() {
    const routeList = await axios.get("http://localhost:8080/api/routes/getall");
    console.log(routeList.data);

    this.routeList = routeList.data;
  }

  async deleteFlight() {
    const confirmDeletion = window.confirm("Are you sure delete flight?");
    if (confirmDeletion) {
      axios.delete(`http://localhost:8080/api/flights/${this.flight.id}`);
    }
  }

  async changeFlight() {
    const confirmChange = window.confirm("Are you sure change flight?");
    if (confirmChange) {
      const { flightNumber, route, price, date, arrivalTime, capacity, status } = this.frm.value;
      axios.put("http://localhost:8080/api/flights", {
        id: this.flight.id,
        flightNumber,
        route,
        price,
        date,
        arrivalTime,
        capacity,
        status
      });
    }
  }
}

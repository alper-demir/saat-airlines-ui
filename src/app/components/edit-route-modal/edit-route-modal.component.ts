import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import axios from 'axios';

@Component({
  selector: 'app-edit-route-modal',
  templateUrl: './edit-route-modal.component.html'
})
export class EditRouteModalComponent {
  frm: FormGroup;
  airportList: any[] = [];
  route = {
    id: 0
  }

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private formBuilder: FormBuilder) {
    this.getAirportList()
    console.log(data);
    this.route = data;

    this.frm = formBuilder.group({
      sourceAirport: [data.source.id],
      destinationAirport: [data.destination.id],
      distanceInMiles: [data.distanceInMiles],
    })

    this.frm.valueChanges.subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }

  async deleteRoute() {
    const confirmDeletion = window.confirm("Are you sure delete route?");
    if (confirmDeletion) {
      await axios.delete(`http://localhost:8080/api/routes/${this.route.id}`)
    }
  }

  async changeRoute() {
    const confirmUpdate = window.confirm("Are you sure change route?");
    if (confirmUpdate) {
      const { sourceAirport, destinationAirport, distanceInMiles } = this.frm.value;
      await axios.put("http://localhost:8080/api/routes", {
        id: this.route.id,
        sourceAirportId: sourceAirport,
        destinationAirportId: destinationAirport,
        distanceInMiles: distanceInMiles
      })
    }
  }

  async getAirportList() {
    const airportList = await axios.get("http://localhost:8080/api/airports/getall");
    this.airportList = airportList.data
  }

}

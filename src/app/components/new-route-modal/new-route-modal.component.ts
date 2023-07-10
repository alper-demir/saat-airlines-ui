import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-new-route-modal',
  templateUrl: './new-route-modal.component.html'
})
export class NewRouteModalComponent implements OnInit {
  airportList: any[] = [];
  frm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.frm = formBuilder.group({
      sourceAirport: [""],
      destinationAirport: [""],
      distanceInMiles: [""],
    })
    this.frm.valueChanges.subscribe({
      next: data => {
        console.log(data);

      }
    })
  }

  async ngOnInit(): Promise<void> {
    const airportList = await axios.get("http://localhost:8080/api/airports/getall");
    console.log(airportList.data);
    this.airportList = airportList.data
  }


  async onSubmit() {
    const confirm = window.confirm("Are you sure add new route?");
    if (confirm) {
      const { sourceAirport, destinationAirport, distanceInMiles } = this.frm.value
      await axios.post("http://localhost:8080/api/routes/add", {
        sourceAirportId: sourceAirport,
        destinationAirportId: destinationAirport,
        distanceInMiles
      })
    }
  }
}

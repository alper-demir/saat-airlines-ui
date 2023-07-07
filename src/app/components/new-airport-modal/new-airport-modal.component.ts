import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-new-airport-modal',
  templateUrl: './new-airport-modal.component.html'
})
export class NewAirportModalComponent {
  frm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.frm = formBuilder.group({
      airportName: [""],
      airportCode: [""],
      airportCity: [""],
      airportCountry: [""],
    })

    this.frm.valueChanges.subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }

  async onSubmit() {
    console.log(this.frm.value);
    console.log(this.frm.valid);

    const { airportName, airportCode, airportCity, airportCountry } = this.frm.value;
    const response = await axios.post("http://localhost:8080/api/airports/add", {
      name: airportName,
      code: airportCode,
      city: airportCity,
      country: airportCountry
    })
    console.log(response);
  }
}
